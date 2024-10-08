import createConnection from "../mysql";
import { STATUS } from "../status";

const tableName = "guides";

export const getGuide = async (req: any, res: any) => {
	const db = await createConnection();
	try {
		const id = req.params.id;
		const sql = `SELECT * FROM ${tableName} WHERE parent_id = ?`;
		const [rows]: any = await db.query(sql, [id]);
		return res.json(rows[0]);
	} catch (error) {
		return res.status(STATUS.SERVER_ERROR).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};
export const getGuides = async (req: any, res: any) => {
	const db = await createConnection();
	const query = `SELECT * FROM ${tableName}`;

	try {
		// Lấy tất cả các mục cha (không có parent_id)
		let [rows]: any = await db.query(query);

		// Trả về kết quả dạng JSON mà không có vòng lặp
		return res.json(rows);
	} catch (error) {
		console.error("Error fetching items:", error);
		return res.status(STATUS.SERVER_ERROR).json({ error: "Internal Server Error" });
	} finally {
		db.end(); // Đảm bảo đóng kết nối sau khi hoàn thành truy vấn
	}
};

export const insertGuide = async (req: any, res: any) => {
	const db = await createConnection();
	try {
		const { title, content: subtitle, parent_id, image } = req.body;
		if (parent_id) {
			const parent = await db.query(`SELECT * FROM navbar_items WHERE id = ?`, [parent_id]);
			if (parent.length <= 0) {
				return res.status(STATUS.BAD_REQUEST).json({ message: "Parent not found" });
			}
		}
		// Kiểm tra path xem tồn tại chưa
		// Thêm item mới
		const [result]: any = await db.query(`INSERT INTO ${tableName} (title, subtitle, parent_id, imageSrc) VALUES (?, ?, ?,?)`, [title, subtitle, parent_id, image]);
		if (result.affectedRows && result.affectedRows <= 0) {
			return res.status(STATUS.BAD_REQUEST).json({ message: "Add failed" });
		}
		var status = STATUS.OK,
			message = "Add successfully",
			dataInserted: any = result;
		return res.status(status).json({ message, data: dataInserted });
	} catch (error) {
		console.error(error);
		return res.status(STATUS.SERVER_ERROR).json({ error, message: "Internal server error", request: req.body });
	} finally {
		db.end();
	}
};

export const updateGuide = async (req: any, res: any) => {
	const db = await createConnection();
	try {
		const { title, content: subtitle, image } = req.body;
		const id = req.params.id;
		console.log(id);
		const [result]: any = await db.query(`UPDATE ${tableName} SET title = ?, subtitle = ?, imageSrc = ? WHERE id = ?`, [title, subtitle, image, id]);
		return res.status(200).json("Update project successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};

export const deleteGuide = async (req: any, res: any) => {
	const db = await createConnection();
	try {
		const id = req.params.id;
		// xóa con
		await db.query(`DELETE FROM ${tableName} WHERE id=?`, [id]); // delete content
		return res.status(200).json("Delete  successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};

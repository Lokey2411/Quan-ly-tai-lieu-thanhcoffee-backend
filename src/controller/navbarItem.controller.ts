import createConnection from "../mysql";

const tableName = "navbar_items";

export const getAllItems = async (req: any, res: any) => {
	const db = await createConnection();

	// Hàm đệ quy để lấy các phần tử con
	const fetchChildren = async (parentId: number) => {
		const [children]: any = await db.query(`SELECT * FROM ${tableName} WHERE parent_id = ?`, [parentId]);
		for (const child of children) {
			// Gọi đệ quy để lấy tiếp children của phần tử hiện tại
			child.children = await fetchChildren(child.id);
			// Không thêm 'parent' để tránh vòng lặp
		}
		return children;
	};

	try {
		// Lấy tất cả các mục cha (không có parent_id)
		let [rows]: any = await db.query(`SELECT * FROM ${tableName} WHERE parent_id IS NULL`);

		// Lấy children cho từng mục cha ban đầu
		for (const row of rows) {
			row.children = await fetchChildren(row.id);
		}

		// Trả về kết quả dạng JSON mà không có vòng lặp
		return res.json(rows);
	} catch (error) {
		console.error("Error fetching items:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end(); // Đảm bảo đóng kết nối sau khi hoàn thành truy vấn
	}
};

export const addItem = async (req: any, res: any) => {
	const db = await createConnection();
	console.log("insert project: ", req.body);
	try {
		const { displayText, path, parent_id } = req.body;
		if (parent_id) {
			const parent = await db.query(`SELECT * FROM navbar_items WHERE id = ?`, [parent_id]);
			if (parent.length <= 0) {
				return res.status(400).json({ message: "Parent project not found" });
			}
		}
		// Thêm item mới
		const [result] = await db.query(`INSERT INTO ${tableName} (displayText ,path, parent_id) VALUES (?, ?, ?)`, [displayText, path, parent_id]);

		return res.status(200).json("Add project successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error, message: "Internal server error", request: req.body });
	} finally {
		db.end();
	}
};

export const updateItem = async (req: any, res: any) => {
	const db = await createConnection();
	try {
		const { displayText, path, parent_id } = req.body;
		const id = req.params.id;
		const [result]: any = await db.query(`UPDATE ${tableName} SET displayText = ?, path = ?, parent_id = ? WHERE id = ?`, [displayText, path, parent_id, Number(id)]);
		return res.status(200).json("Update project successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};

export const deleteItem = async (req: any, res: any) => {
	const db = await createConnection();
	try {
		const id = req.params.id;
		// xóa con
		await db.query(`DELETE FROM ${tableName} WHERE parent_id = ?`, [id]); //delete child item
		await db.query("DELETE FROM projects WHERE parent_id = ?", [id]); // delete project
		await db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]); // delete navbar item
		return res.status(200).json("Delete project successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};

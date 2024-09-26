import { Request, Response } from "express";
import createConnection from "../mysql";

const tableName = "contents";

export const getAllContent = async (req: any, res: any) => {
	const db = await createConnection();
	const getChildren = async (parentId: number) => {
		let [children]: any = await db.query(`SELECT * FROM ${tableName} WHERE parent_id = ? AND parent_table = "contents"`, [parentId]);
		for (const child of children) {
			const childChildren = await getChildren(child.id);
			if (childChildren && childChildren.length > 0) {
				child.children = childChildren;
			} else {
				const images = await getImages(child.id);
				if (images && images.length > 0) {
					child.images = images;
				}
			}
		}
		return children;
	};
	const getImages = async (parentId: number) => {
		let [images]: any = await db.query(`SELECT * FROM images WHERE parent_id = ? AND parent_table = "contents"`, [parentId]);
		return images.map((item: any) => item.url);
	};
	try {
		// Chờ kết quả từ truy vấn
		let [rows]: any = await db.query(`SELECT * FROM ${tableName} WHERE parent_table != "contents"`);
		if (rows && rows.length > 0) {
			// find children
			for (let i = 0; i < rows.length; i++) {
				const children: any = await getChildren(rows[i].id);
				if (children && children.length > 0) {
					rows[i].children = children;
				}
			}
		}
		// Trả về kết quả dạng JSON
		return res.json(rows);
	} catch (error) {
		console.error("Error fetching projects:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end(); // Đảm bảo đóng kết nối sau khi hoàn thành truy vấn
	}
};

export const addContent = async (req: any, res: any) => {
	const db = await createConnection();
	try {
		const { title, parent_table, parent_id, content, images } = req.body;

		const parent = await db.query(`SELECT * FROM ${parent_table} WHERE id = ?`, [parent_id]);
		if (parent.length <= 0) {
			return res.status(400).json({ message: "Parent not found" });
		}

		// Thêm project mới
		const [result] = await db.query(`INSERT INTO ${tableName} ( title, parent_table, parent_id, content ) VALUES (?, ?, ?, ?)`, [title, parent_table, parent_id, content]);
		const [rows]: any = await db.query(`SELECT id from contents WHERE id = (SELECT max(id) from contents);`);
		if (rows && rows.length > 0 && images && images.length > 0) {
			// insert image
			const contentId = rows[0].id;
			for (const image of images) {
				await db.query(`INSERT INTO images (parent_id, parent_table, url) VALUES (?,?,?)`, [contentId, tableName, image]);
			}
		}

		return res.status(200).json("Add project successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error, message: "Internal server error", request: req.body });
	} finally {
		db.end();
	}
};

export const updateContent = async (req: Request, res: Response) => {
	const db = await createConnection();
	try {
		const { title, parent_table, parent_id, content } = req.body;
		const id = req.params.id;
		const [result]: any = await db.query(`UPDATE ${tableName} SET  title = ?, parent_table = ?, parent_id = ?, content = ?  WHERE id = ?`, [title, parent_table, parent_id, content, Number(id)]);
		const [currentItems]: any = await db.query(`SELECT id from contents WHERE id = ${Number(id)};`);
		const images = req.body.images;
		if (images && images.length > 0) {
			// remove old images
			await db.query(`DELETE FROM images WHERE parent_id = ? AND parent_table = ?`, [currentItems[0].id, tableName]);
			// insert new images
			for (const image of images) {
				console.log("image", image);
				await db.query(`INSERT INTO images (parent_id, parent_table, url) VALUES (?,?,?)`, [currentItems[0].id, tableName, image]);
			}
		}
		return res.status(200).json("Update project successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};

export const deleteContent = async (req: any, res: any) => {
	const db = await createConnection();
	try {
		const id = req.params.id;

		const [result] = await db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);

		return res.status(200).json("Delete successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};

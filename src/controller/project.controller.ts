/**
 * @file project.controller.ts
 * @author Hà Hải VIệt
 * @description Controller for project with table name `projects`
 */

import createConnection from "../mysql";

const tableName = "projects";

/**
 * Lấy tất cả các project
 * Trả về JSON message "Internal Server Error" nếu có lỗi
 * Trả về JSON message "projects" và chứa m  ng project
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<void>}
 */
export const getAllProject = async (req: any, res: any): Promise<void> => {
	const db = await createConnection();
	try {
		// Chờ kết quả từ truy vấn
		const [rows] = await db.query(`SELECT * FROM ${tableName}`);
		// Trả về kết quả dạng JSON
		return res.json(rows);
	} catch (error) {
		console.error("Error fetching projects:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end(); // Đảm bảo đóng kết nối sau khi hoàn thành truy vấn
	}
};

/**
 * Thêm mới một project
 * - Kiểm tra xem parent có tồn tại hay không
 * - Kiểm tra xem project đã tồn tại chưa
 * - Trả về JSON message "Add project successfully" nếu thêm thành công, "Add project failed" nếu thêm thất bại
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<void>}
 */
export const addProject = async (req: any, res: any): Promise<void> => {
	const db = await createConnection();
	console.log("insert project: ", req.body);
	try {
		const { name, image, description, map, parent_id } = req.body;

		const parent = await db.query(`SELECT * FROM navbar_items WHERE id = ?`, [parent_id]);
		if (parent.length <= 0) {
			return res.status(400).json({ message: "Parent project not found" });
		}

		// Kiểm tra xem project đã tồn tại chưa
		const [existingProject]: any = await db.query(`SELECT * FROM ${tableName} WHERE name = ? and parent_id = ?`, [name, parent_id]);

		if (existingProject.length > 0) {
			return res.status(400).json({ message: "Project already exists" });
		}

		// Thêm project mới
		const [result] = await db.query("INSERT INTO projects (name, image, description, map, parent_id) VALUES (?, ?, ?, ?, ?)", [name ?? "", image ?? "", description ?? "", map ?? "", parent_id]);

		return res.status(200).json("Add project successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error, message: "Internal server error", request: req.body });
	} finally {
		db.end();
	}
};

/**
 * Update một project
 * - Trả về JSON message "Update project successfully" nếu thêm thành công, "Update project failed" nếu thêm thất bại
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<void>}
 */
export const updateProject = async (req: any, res: any): Promise<void> => {
	const db = await createConnection();
	try {
		const { name, image, description, map, parent_id } = req.body;
		const id = req.params.id;
		const [result]: any = await db.query("UPDATE projects SET name = ?, image = ?, description = ?, map = ?, parent_id = ? WHERE id = ?", [name, image, description, map, parent_id, Number(id)]);
		return res.status(200).json("Update project successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};

/**
 * Xóa một project
 * - Trả về JSON message "Delete project successfully" nếu xóa thành công
 * - Trả về JSON message "Internal Server Error" nếu có lỗi
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<void>}
 */
export const deleteProject = async (req: any, res: any): Promise<void> => {
	const db = await createConnection();
	try {
		const id = req.params.id;

		const [result] = await db.query("DELETE FROM projects WHERE id = ?", [id]);

		return res.status(200).json("Delete project successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};

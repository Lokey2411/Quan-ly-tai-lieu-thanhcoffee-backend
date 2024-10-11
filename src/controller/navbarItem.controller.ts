/**
 * Controller for navbar items with table name `navbar_items`
 * @author Hà Hải VIệt
 * @packageDocumentation
 * @module controller/navbarItem.controller
 * @description Controller for navbar items
 */

import createConnection from "../mysql";
import { STATUS } from "../status";
import { NavBarItem } from "../types/NavBarItem";

const tableName = "navbar_items";

/**
 * Recursively inserts a menu item and its children into the navbar_items table
 * @param {any} db - The database connection
 * @param {NavBarItem} item - The current menu item to be inserted
 * @param {number | null} [parentId=null] - The parent ID of the current menu item
 * @returns {Promise<void>}
 */
async function insertMenuItem(db: any, item: NavBarItem, parentId: number | null = null): Promise<void> {
	try {
		// Insert the current child item (without id)
		const [result] = await db.query(`INSERT INTO ${tableName} (displayText, path, parent_id) VALUES (?, ?, ?)`, [item.displayText, item.path, parentId]);

		// Get the inserted item's auto-increment ID
		const insertedItemId = result.insertId;

		// Insert children if they exist
		if (item.children && item.children.length > 0) {
			for (let child of item.children) {
				await insertMenuItem(db, child, insertedItemId); // Recursive insert for children
			}
		}
	} catch (error) {
		console.error("Error inserting menu item:", error);
	}
}

/**
 * Inserts the children of the menu item with id 2. The children are recursively inserted.
 * This is a one-time use function and should be removed after use.
 * @returns {Promise<void>}
 */
async function insertChildrenOnly(): Promise<void> {
	const db = await createConnection();
	try {
		const menuData: NavBarItem = {
			id: 2,
			displayText: "Dự án",
			path: "/du-an",
			parent: null,
			parentId: null,
			children: [
				{
					id: 8,
					displayText: "Tổng quan",
					parent: {
						id: 1,
						displayText: "Về chúng tôi",
						path: "/du-an",
						parentId: null,
					},
					path: "/",
					parentId: 1,
					children: [
						{
							id: 9,
							displayText: "Tổng quan 9",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/tong-quan",
							parentId: 9,
							children: [],
						},
						{
							id: 12,
							displayText: "Tổng quan 12",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/tong-quan",
							parentId: 9,
							children: [],
						},
					],
				},
				{
					id: 11,
					displayText: "Tải xuống",
					path: "#",
					children: [
						{
							id: 9,
							displayText: "Tải xuống 9",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/tai-xuong",
							parentId: 9,
							children: [],
						},
						{
							id: 12,
							displayText: "Tải xuống 12",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/tai-xuong",
							parentId: 9,
							children: [],
						},
					],
					parent: { id: 1, displayText: "Về chúng tôi", path: "/ve-chung-toi", parentId: null },
					parentId: 1,
				},
				{
					id: 12,
					displayText: "Layout và hạng mục nội thất",
					path: "#",
					children: [
						{
							id: 9,
							displayText: "Layout 9",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/layout",
							parentId: 9,
							children: [],
						},
						{
							id: 12,
							displayText: "Layout 12",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/layout",
							parentId: 9,
							children: [],
						},
					],
					parent: { id: 1, displayText: "Về chúng tôi", path: "/ve-chung-toi", parentId: null },
					parentId: 1,
				},
				{
					id: 10,
					displayText: "Nhiệm vụ của chúng tôi",
					path: "#",
					children: [
						{
							id: 9,
							displayText: "Nhiệm vụ 9",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/nhiem-vu",
							parentId: 9,
							children: [],
						},
						{
							id: 12,
							displayText: "Nhiệm vụ 12",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/nhiem-vu",
							parentId: 9,
							children: [],
						},
					],
					parent: { id: 1, displayText: "Về chúng tôi", path: "/ve-chung-toi", parentId: null },
					parentId: 1,
				},
				{
					id: 10,
					displayText: "Chứng chỉ, chứng nhận, kiểm nghiệm",
					path: "#",
					children: [
						{
							id: 9,
							displayText: "Chứng chỉ 9",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/chung-chi",
							parentId: 9,
							children: [],
						},
						{
							id: 12,
							displayText: "Chứng chỉ 12",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/chung-chi",
							parentId: 9,
							children: [],
						},
					],
					parent: { id: 1, displayText: "Về chúng tôi", path: "/ve-chung-toi", parentId: null },
					parentId: 1,
				},
				{
					id: 10,
					displayText: "Hướng dẫn",
					path: "#",
					children: [
						{
							id: 9,
							displayText: "Hướng dẫn 9",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/huong-dan",
							parentId: 9,
							children: [],
						},
						{
							id: 12,
							displayText: "Hướng dẫn 12",
							parent: {
								id: 8,
								displayText: "Về chúng tôi",
								path: "/du-an",
								parentId: 1,
							},
							path: "/huong-dan",
							parentId: 9,
							children: [],
						},
					],
					parent: { id: 1, displayText: "Về chúng tôi", path: "/ve-chung-toi", parentId: null },
					parentId: 1,
				},
			],
		};

		// Loop through children and insert them
		const [result]: any = await db.query(`SELECT * FROM ${tableName} WHERE id = (SELECT MAX(ID) FROM ${tableName})`);
		for (let child of menuData.children) {
			await insertMenuItem(db, { ...child, parentId: result[0].id }, result[0].id); // Auto-generated parentId will be handled
		}
	} catch (error) {
		console.error("Error inserting children:", error);
	} finally {
		db.end();
	}
}

/**
 * Lấy các phần tử con của phần tử có id là parentId
 * Hàm này gọi đệ quy để lấy các phần tử con của các phần tử con
 * @param {object} db - Kết nối đến cơ sở dữ liệu
 * @param {number} parentId - Id của phần tử cha
 * @return {Promise<any[]>} - Danh sách các phần tử con
 */
const fetchChildren = async (db: any, parentId: number): Promise<any[]> => {
	const [children]: any = await db.query(`SELECT * FROM ${tableName} WHERE parent_id = ?`, [parentId]);
	for (const child of children) {
		// Gọi đệ quy để lấy tiếp children của phần tử hiện tại
		child.children = await fetchChildren(db, child.id);
		// Không thêm 'parent' để tránh vòng lặp
	}
	return children;
};
/**
 * Lấy tất cả các mục cha (không có parent_id) và các phần tử con
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<void>}
 */
export const getAllItems = async (req: any, res: any): Promise<void> => {
	const db = await createConnection();
	const query = {
		parent: `SELECT * FROM ${tableName} WHERE parent_id IS NULL`,
		all: `SELECT * FROM ${tableName}`,
	};
	// Hàm đệ quy để lấy các phần tử con

	try {
		// Lấy tất cả các mục cha (không có parent_id)
		let [rows]: any = await db.query(query[(req.query.mode as "parent" | "all") || "parent"]);

		// Lấy children cho từng mục cha ban đầu
		for (const row of rows) {
			row.children = await fetchChildren(db, row.id);
		}

		// Trả về kết quả dạng JSON mà không có vòng lặp
		return res.json(rows);
	} catch (error) {
		console.error("Error fetching items:", error);
		return res.status(STATUS.SERVER_ERROR).json({ error: "Internal Server Error" });
	} finally {
		db.end(); // Đảm bảo đóng kết nối sau khi hoàn thành truy vấn
	}
};

/**
 * Thêm mới một item
 * - Nếu có `parent_id` thì phải kiểm tra xem `parent_id` có tồn tại trong `navbar_items` hay không
 * - Trả về JSON message "Add project successfully" nếu thêm thành công, "Add project failed" nếu thêm thất bại
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<void>}
 */
export const addItem = async (req: any, res: any): Promise<void> => {
	const db = await createConnection();
	try {
		const { displayText, path, parent_id } = req.body;
		var existingQuery = "SELECT * FROM navbar_items WHERE path = ? AND parent_id IS NULL";
		let data = [path];
		if (parent_id) {
			const parent = await db.query(`SELECT * FROM navbar_items WHERE id = ?`, [parent_id]);
			if (parent.length <= 0) {
				console.log("Parent project not found");
				return res.status(STATUS.BAD_REQUEST).json({ message: "Parent project not found" });
			}
			existingQuery = "SELECT * FROM navbar_items WHERE path = ? AND parent_id = ?";
			data = [...data, parent_id];
		}
		console.log(existingQuery, data);
		const [existingItem]: any = await db.query(existingQuery, data);
		if (existingItem.length > 0) {
			console.log("Item already exists");
			return res.status(STATUS.BAD_REQUEST).json({ message: "Item already exists", data: existingItem, query: existingQuery, bindingParams: data });
		}
		// Kiểm tra path xem tồn tại chưa
		// Thêm item mới
		const [result]: any = await db.query(`INSERT INTO ${tableName} (displayText ,path, parent_id) VALUES (?, ?, ?)`, [displayText, path, parent_id]);
		if (result.affectedRows && result.affectedRows <= 0) {
			console.log("Add project failed");
			return res.status(STATUS.BAD_REQUEST).json({ message: "Add project failed" });
		}
		var status = STATUS.OK,
			message = "Add project successfully",
			[dataInserted]: any = await db.query(`SELECT * FROM ${tableName} WHERE id = (SELECT MAX(ID) FROM ${tableName})`);
		if (!parent_id)
			insertChildrenOnly()
				.then(() => {
					console.log("Add children successfully");
					status = STATUS.OK;
					message = "Add project successfully";
				})
				.catch(() => {
					status = STATUS.BAD_REQUEST;
					message = "Add project failed";
				});
		return res.status(status).json({ message, data: dataInserted[0] });
	} catch (error) {
		console.error(error);
		return res.status(STATUS.SERVER_ERROR).json({ error, message: "Internal server error", request: req.body });
	} finally {
		db.end();
	}
};

/**
 * Cập nhật một item trong navbar_items
 * - Trả về JSON message "Update project successfully" nếu thành công
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<void>}
 */
export const updateItem = async (req: any, res: any): Promise<void> => {
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

/**
 * Xóa một item trong navbar_items
 * - Trả về JSON message "Delete project successfully" nếu thành công
 * - Trả về JSON message "Internal Server Error" nếu có lỗi
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<void>}
 */
export const deleteItem = async (req: any, res: any): Promise<void> => {
	const db = await createConnection();
	try {
		const id = Number(req.params.id);
		// xóa con
		await db.query(`DELETE FROM ${tableName} WHERE parent_id = ?`, [id]); //delete child item
		await db.query("DELETE FROM projects WHERE parent_id = ?", [id]); // delete project
		await db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]); // delete navbar item
		await db.query("DELETE FROM contents WHERE parent_id = ? and parent_table = ?", [id, "navbar_items"]); // delete content
		// return all items
		const [rows]: any = await db.query(`SELECT * FROM ${tableName} WHERE parent_id IS NULL AND id != ${id}`);
		for (const row of rows) {
			row.children = await fetchChildren(db, row.id);
		}
		return res.status(STATUS.OK).json({ message: "Delete project successfully", data: rows, id });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		db.end();
	}
};

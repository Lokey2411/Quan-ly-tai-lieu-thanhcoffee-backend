import createConnection from "../mysql";
import { STATUS } from "../status";

export const deleteImage = async (req: any, res: any) => {
	const db = await createConnection();
	/**
	 * Xoá hình  ảnh trong table images có  id = req.params.id
	 * Trả  về  JSON message "Delete image successfully" n u xo  th nh c ng,
	 * @param {Request} req - Request object
	 * @param {Response} res - Response object
	 * @returns {Promise<void>}
	 */
	try {
		const id = req.params.id;
		const [oldImage]: any = await db.query("SELECT * FROM images WHERE id = ?", [id]);
		if (!oldImage || oldImage.length == 0) {
			return res.status(STATUS.NOT_FOUND).json({ message: "Image not found" });
		}
		const { parent_table, parent_id } = oldImage[0];
		const sql = "DELETE FROM images WHERE id = ?";
		await db.query(sql, [id]);
		const [parent]: any = await db.query(`SELECT * FROM ${parent_table} WHERE id = ?`, [parent_id]);
		return res.status(STATUS.OK).json({ message: "Delete image successfully", parent: parent[0] });
	} catch (error) {
		return res.status(STATUS.SERVER_ERROR).json({
			error,
			message: "Internal server error",
		});
	} finally {
		db.end();
	}
};

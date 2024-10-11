import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Connection } from "mysql2";
dotenv.config();
// Tạo kết nối
const createConnection = async () => {
	return await mysql.createConnection({
		host: process.env.MYSQL_HOST || "localhost",
		user: process.env.MYSQL_USER || "root",
		password: process.env.MYSQL_PASSWORD || "",
		database: process.env.MYSQL_DATABASE || "test_db",
	});
};

export default createConnection;

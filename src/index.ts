import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer, { DiskStorageOptions } from "multer";
import { MulterError } from "multer";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/index.route";
dotenv.config();
const app = express();

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
	// Allow credentials
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:8000", // Allow port 8000 to post
	})
);
app.use(cookieParser());

// Multer configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../../fe/public/uploads")); // Đảm bảo đường dẫn đúng
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname); // Thêm dấu "-" cho rõ ràng
	},
});

const upload = multer({ storage });

// File upload route
app.post("/api/upload", upload.single("file"), (req: Request, res: Response) => {
	const file = req.file;
	if (!file) {
		return res.status(400).send("Chưa đính file nào.");
	}
	return res.status(200).json({ filename: file.filename });
});

// Error handling middleware for Multer
app.use((err: MulterError, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof MulterError) {
		return res.status(500).json({ error: err.message });
	}
	next(err);
});

// routes
routes.forEach((route) => {
	app.use("/" + route.path, route.router);
});

// Start server
app.listen(process.env.PORT, () => {
	console.log("Server running on http://localhost:8080");
});

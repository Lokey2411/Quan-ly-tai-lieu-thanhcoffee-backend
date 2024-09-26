import Express from "express";
import { addProject, deleteProject, getAllProject, updateProject } from "../controller/project.controller";

const router = Express.Router();
router.post("/", addProject);
router.get("/", getAllProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;

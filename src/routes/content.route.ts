import Express from "express";
import { addContent, deleteContent, getAllContent, updateContent } from "../controller/content.controller";
const route = Express.Router();

route.get("/", getAllContent);
route.post("/", addContent);
route.put("/:id", updateContent);
route.delete("/:id", deleteContent);

export default route;

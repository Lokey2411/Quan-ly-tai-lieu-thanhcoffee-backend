import Express from "express";
import { addContent, deleteContent, getAllContent, updateContent, updateContents } from "../controller/content.controller";
const route = Express.Router();

route.get("/", getAllContent);
route.post("/", addContent);
route.put("/:id", updateContents);
route.patch("/:id", updateContent);
route.delete("/:id", deleteContent);

export default route;

import Express from "express";
import { deleteGuide, getGuide, getGuides, insertGuide, updateGuide } from "../controller/guide.controller";
const route = Express.Router();

route.get("/", getGuides);
route.get("/:id", getGuide);
route.post("/", insertGuide);
route.put("/:id", updateGuide);
route.delete("/:id", deleteGuide);

export default route;

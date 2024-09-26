import express from "express";
import { addItem, deleteItem, getAllItems, updateItem } from "../controller/navbarItem.controller";
const route = express.Router();

route.get("/", getAllItems);
route.post("/", addItem);
route.put("/:id", updateItem);
route.delete("/:id", deleteItem);

export default route;

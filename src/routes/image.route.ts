import Express from "express";
import { deleteImage } from "../controller/images.controller";

const route = Express.Router();

route.delete("/:id", deleteImage);

export default route;

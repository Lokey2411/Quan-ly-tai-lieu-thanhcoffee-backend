/**
 * @file image.route.ts
 * @author Hà Hải VIệt
 * @description Routes for image
 */

import Express from "express";
import { deleteImage } from "../controller/images.controller";

const route = Express.Router();

route.delete("/:id", deleteImage);

export default route;

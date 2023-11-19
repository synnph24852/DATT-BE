import express from "express";
import { deleteImage, uploadImage } from "~/controllers/uploader.controller";
import { uploadMulter } from "~/middleware/uploader";
const routerUpload = express.Router();

routerUpload.post("/upload", uploadMulter.array("images", 10), uploadImage);
routerUpload.delete("/:publicId", deleteImage);

export default routerUpload;

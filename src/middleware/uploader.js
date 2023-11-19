import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "~/configs/cloudinary";

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     allowedFormats: ["jpg", "png"],
//     params: {
//         folder: "shop-book",
//     },
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const uploadMulter = multer({ storage: storage });

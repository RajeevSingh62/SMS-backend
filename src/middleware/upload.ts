import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/claudnary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "user-avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 300, height: 300, crop: "fill" }],
  }),
});

const upload = multer({ storage });

export default upload;

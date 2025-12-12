require('dotenv').config();
import multer from "multer"
const { CloudinaryStorage } = require('multer-storage-cloudinary');
import cloudinary from "../utils/claudnary";
  //  console.log('Cloudinary config:', process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);
const storage = new CloudinaryStorage({
  
  cloudinary,
  params: {
    folder: 'cms-posts',
    allowed_formats: ['jpg', 'jpeg', 'png','avif'],
  },
});

const upload = multer({ storage });

module.exports = upload;
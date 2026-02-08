import { Router } from "express";

import { protect } from "../../middleware/auth.middleware";
import { login, register } from "./auth.controller";
import upload from "../../middleware/upload";
const router = Router();


console.log("Register route accessed")
router.post(
  "/register",
  upload.single("avatar"), 
  register
);


router.post("/login",login);



export default router;

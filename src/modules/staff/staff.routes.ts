import { Router } from "express";
import {createStaff, deleteStaff, getAllStaff, getStaff, updateStaff} from "./staff.controller";
import upload from "../../middleware/upload";

const router = Router();

router.post("/",  upload.single("avatar"), createStaff);
router.get("/", getAllStaff);
router.get("/:id",getStaff);
router.put("/:id", upload.single("avatar"), updateStaff);
router.delete("/:id", deleteStaff);

export default router;

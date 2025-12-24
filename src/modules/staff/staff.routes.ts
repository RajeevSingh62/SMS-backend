import { Router } from "express";
import {createStaff, deleteStaff, getAllStaff, getStaff, updateStaff} from "./staff.controller";

const router = Router();

router.post("/",createStaff);
router.get("/", getAllStaff);
router.get("/:id",getStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;

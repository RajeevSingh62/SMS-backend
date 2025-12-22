import { Router } from "express";
import {createStaff, getAllStaff} from "./staff.controller";

const router = Router();

router.post("/",createStaff);
router.get("/", getAllStaff);
// router.get("/:id", staffController.getStaff);
// router.put("/:id", staffController.updateStaff);
// router.delete("/:id", staffController.deleteStaff);

export default router;

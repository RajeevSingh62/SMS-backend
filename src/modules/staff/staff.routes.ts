import { Router } from "express";
import {createStaff} from "./staff.controller";

const router = Router();
console.log("✅ Staff routes loaded");
router.post("/",createStaff);
// router.get("/", staffController.getAllStaff);
// router.get("/:id", staffController.getStaff);
// router.put("/:id", staffController.updateStaff);
// router.delete("/:id", staffController.deleteStaff);

export default router;

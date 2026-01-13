// attendance.routes.ts
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import {
  markAttendance,
  getAttendanceByClass,
} from "./attendance.controller";

const router = Router();

router.post("/", protect, markAttendance);
router.get("/", protect, getAttendanceByClass);

export default router;

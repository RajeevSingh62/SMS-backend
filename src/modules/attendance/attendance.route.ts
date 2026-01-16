// attendance.routes.ts
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import {
  markAttendance,
  getAttendanceByClass,
  getAllStudents,
  getDailyAttendance,
} from "./attendance.controller";

const router = Router();

router.post("/",protect,markAttendance);
router.get("/", getAttendanceByClass);
router.get("/loadstudent",getAllStudents);
router.get("/getDaily",getDailyAttendance);


export default router;

// attendance.routes.ts
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import {
  markAttendance,
  getAttendanceByClass,
  getAllStudents,
  getDailyAttendance,
  getMyAttendance,
} from "./attendance.controller";

const router = Router();

router.post("/",protect,markAttendance);
router.get("/", getAttendanceByClass);
router.get("/loadstudent",getAllStudents);
router.get("/getDaily",getDailyAttendance);
router.get("/me/:id",getMyAttendance);


export default router;

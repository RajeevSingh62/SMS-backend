import { Router } from "express";
import attendanceController from "./attendance.controller";

const router = Router();

// Student attendance routes
router.post("/student", attendanceController.markStudent);
router.get("/student/:studentId", attendanceController.getStudentAttendance);

// Staff attendance routes
router.post("/staff", attendanceController.markStaff);
router.get("/staff/:staffId", attendanceController.getStaffAttendance);

export default router;

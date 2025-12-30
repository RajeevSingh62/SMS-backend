import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import teacherRoutes from "../modules/teacher/teacher.routes";
import studentRoutes from "../modules/student/student.route";
import staffRoutes from "../modules/staff/staff.routes";
import studentDocRoutes from "../modules/studentDoc/studemtdoc.route";
import parentRoutes from "../modules/parent/parent.route";
import attendanceRoutes from "../modules/attendance/attendance.route";
import sectionRoutes from "../modules/section/section.routes";
import classRoutes from "../modules/classes/classes.routes"
const router = Router();

router.use("/auth", authRoutes);
router.use("/teachers", teacherRoutes);
router.use("/students", studentRoutes);
router.use("/staff", staffRoutes);
console.log("index routes staff")
router.use("/studentDoc",studentDocRoutes);
router.use("/parent",parentRoutes);
router.use("/attendance",attendanceRoutes);
router.use("/attendance",attendanceRoutes);
router.use("/section",sectionRoutes);
router.use("/class",classRoutes);

export default router;
 

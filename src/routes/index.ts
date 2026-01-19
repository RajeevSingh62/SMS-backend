import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import teacherRoutes from "../modules/teacher/teacher.routes";
import studentRoutes from "../modules/student/student.route";
import staffRoutes from "../modules/staff/staff.routes";
import studentDocRoutes from "../modules/studentDoc/studemtdoc.route";
import parentRoutes from "../modules/parent/parent.route";
import sectionRoutes from "../modules/section/section.routes";
import classRoutes from "../modules/classes/classes.routes";
import feeRoutes from "../modules/fee/fee.routes";
import admindashboardRoute from "../modules/dashboard/admin-dashboard.routes";
import eventRoute from "../modules/event/event.route"
import attendanceRoute from "../modules/attendance/attendance.route";
import paymentRoute from "../modules/payment/payment.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/teachers", teacherRoutes);
router.use("/students", studentRoutes);
router.use("/staff", staffRoutes);
console.log("index routes staff")
router.use("/studentDoc",studentDocRoutes);
router.use("/parent",parentRoutes);
router.use("/section",sectionRoutes);
router.use("/class",classRoutes);
router.use("/fee",feeRoutes);
router.use("/admindashboard",admindashboardRoute);
router.use("/event",eventRoute);
router.use("/attendance",attendanceRoute);
router.use("/payment",paymentRoute);


export default router;
 

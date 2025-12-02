import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import teacherRoutes from "../modules/teacher/teacher.routes";
import studentRoutes from "../modules/student/student.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/teachers",teacherRoutes);
router.use("/students", studentRoutes);
export default router;

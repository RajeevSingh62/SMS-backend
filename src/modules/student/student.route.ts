import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
} from "./student.controller";

const router = Router();

router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.delete("/:id", deleteStudent);

export default router;

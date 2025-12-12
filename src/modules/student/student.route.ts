import { Router } from "express";
import {

  admissionStudent,
  deactivateStudent,
  getAllStudents,
  getStudentById,

} from "./student.controller";

const router = Router();

router.post("/", admissionStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.delete("/:id", deactivateStudent);

export default router;

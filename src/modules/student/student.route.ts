import { Router } from "express";
import {

  admissionStudent,
  deactivateStudent,
  getAllStudents,
  getStudentById,
  updateStudent,

} from "./student.controller";
import upload from "../../middleware/upload";

const router = Router();

router.post("/",upload.single("avatar"), admissionStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id",upload.single("avatar"),updateStudent);
router.delete("/:id", deactivateStudent);

export default router;

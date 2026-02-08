import { Router } from "express";
import {

  admissionStudent,
  deactivateStudent,
  getAllStudents,
  getMyStudentProfile,
  getStudentById,
  updateStudent,

} from "./student.controller";
import upload from "../../middleware/upload";
import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", admissionStudent);
router.get("/", protect, getAllStudents);

router.get("/me", protect, getMyStudentProfile); 

router.get("/:id", protect, getStudentById);
router.put("/:id", protect, upload.single("avatar"), updateStudent);
router.delete("/:id", protect, deactivateStudent);

export default router;

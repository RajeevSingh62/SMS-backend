import {Router} from "express";
import { createTeacher,getAllTeachers,getTeacherById } from "./teacher.controller";

const router=Router();
router.post("/",createTeacher);
router.get("/",getAllTeachers);
router.get("/:id",getTeacherById);

export default router;
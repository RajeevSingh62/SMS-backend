import { Router } from "express";
import { getDocsByStudent, deleteDoc } from "./studentdoc.controller";
import { protect } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

const router = Router();

router.get("/student/:studentId", protect, roleMiddleware(["admin","teacher","staff"]), getDocsByStudent);
router.delete("/:id", protect, roleMiddleware(["admin","staff"]), deleteDoc);

export default router;

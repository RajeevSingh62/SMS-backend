import { Router } from "express";
const router = Router();

// All module routes here
import authRoutes from "../modules/auth/auth.route";


router.use("/auth", authRoutes);


export default router;

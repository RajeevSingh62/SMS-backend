import { Router } from "express";
import { aiChatController } from "./ai.controller";
import { protect } from "../../middleware/auth.middleware";


const router = Router();

router.post("/chat", protect, aiChatController);

export default router;

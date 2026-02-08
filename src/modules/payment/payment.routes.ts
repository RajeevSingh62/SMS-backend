import { Router } from "express";


import upload from "../../middleware/upload";
import { createPayUOrder, payUFailure, payUSuccess } from "./payment.controller";
import { protect } from "../../middleware/auth.middleware";
const router = Router();


router.post("/payu/create", protect, createPayUOrder);
router.post("/payu/success", payUSuccess);
router.post("/payu/failure", payUFailure);




export default router;
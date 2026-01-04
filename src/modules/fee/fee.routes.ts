import { Router } from "express";


import { addExamFee, addMiscFee, createFeeTemplate, createStudentMonthlyFee, getStudentFees, payFee } from "./fee.controller";

const router = Router();

// router.post("/StudentMonthlyFee",createStudentMonthlyFee);
router.get("/getStudentFee/:studentId",getStudentFees);

router.post("/add-exam-fee", addExamFee);
router.post("/add-misc-fee",addMiscFee);
router.post("/pay",  payFee);


export default router;

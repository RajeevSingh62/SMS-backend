import { Router } from "express";


import { addExamFee, addMiscFee, createFeeTemplate, createStudentMonthlyFee, getAllMonthlyFees, getStudentFees, payFee } from "./fee.controller";

const router = Router();


router.get("/getAllMonthlyfee",getAllMonthlyFees);
router.get("/getStudentFee/:studentId",getStudentFees);

router.post("/add-exam-fee", addExamFee);
router.post("/add-misc-fee",addMiscFee);
router.post("/pay",  payFee);


export default router;

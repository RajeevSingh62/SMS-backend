import { Router } from "express";


import { adminDashboard ,studentOnboardChart,getFeeChartData} from "./admin-dashboard.controller";

const router = Router();

router.post("/getcards", adminDashboard);
router.post("/studentChart", studentOnboardChart);
router.post("/feeChart", getFeeChartData);

export default router;

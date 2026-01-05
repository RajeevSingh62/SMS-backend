import cron from "node-cron";
import { generateMonthlyFees } from "../fee/monthly-fee-generator-serv";


export const startFeeCron = () => {
  // Run on 1st day of every month at 12:01 AM
  cron.schedule("1 0 1 * *", async () => {
    console.log("🕐 Monthly Fee Cron Started");
    await generateMonthlyFees();
  });
};

import cron from "node-cron";


export const startPingPongCron = () => {
  cron.schedule("*/12 * * * *", async () => {
    try {
      console.log("🏓 Ping cron fired");

      await fetch("https://sms-backend-uolo.onrender.com/api/v1/event/"); 

      console.log("✅ Server pinged successfully");
    } catch (err:any) {
      console.error("❌ Ping failed:", err.message);
    }
  });
};

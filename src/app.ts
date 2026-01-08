import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/notFound.middleware";

import routes from "./routes/index";
import { startFeeCron } from "./modules/cron/fee-cron";

export const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://myschool.dedyn.io",
    "https://coruscating-puppy-640fd3.netlify.app"
    ],
    credentials: true,
  })
);

startFeeCron();
app.use(helmet());
app.use(morgan("dev"));

// API Routes
console.log("setting app.ts routes")
app.use("/api/v1", routes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

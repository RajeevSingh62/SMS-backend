import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/notFound.middleware";

import routes from "./routes/index";

export const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));

// API Routes
console.log("setting app.ts routes")
app.use("/api/v1", routes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

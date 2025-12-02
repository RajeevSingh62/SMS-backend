import { Request, Response, NextFunction } from "express";

/**
 * 🔥 Global Error Handler  
 * --------------------------------------------------------
 * Is middleware ka kaam app ke andar hone wale saare errors ko
 * centralize karke handle karna hai.
 *
 * Why Needed? (Interview Concepts)
 * - Express default error messages client ko sensitive info de sakte hain.
 * - Ye custom error handler secure responses send karta hai.
 * - Production apps ALWAYS have a centralized error handler.
 *
 * Flow:
 * 1. Kisi bhi controller / service mein exception throw hota hai.
 * 2. Express automatically iss middleware ko call karta hai.
 * 3. Yaha hum error ki shape, status code, aur message define karte hain.
 */

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("🔥 Global Error Handler:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

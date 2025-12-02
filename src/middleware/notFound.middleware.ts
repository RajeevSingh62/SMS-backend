import { Request, Response, NextFunction } from "express";

/**
 * ❌ Not Found Middleware
 * --------------------------------------------------------
 * Ye middleware tab run hota hai jab koi bhi existing route
 * match nahi hota. Iska kaam simple 404 error return karna hai.
 *
 * Interview Use:
 * - Express ek waterfall pattern follow karta hai.
 * - Agar koi route match nahi hota, ye middleware last mein call hota hai.
 * - Ye global 404 handler hota hai jo SPA/API dono mein use hota hai.
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.originalUrl}`,
  });
};

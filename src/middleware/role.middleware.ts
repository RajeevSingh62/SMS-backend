// src/middleware/role.middleware.ts
import { Request, Response, NextFunction } from "express";

/**
 * roleMiddleware(allowedRoles)
 * - allowedRoles: array of roles or single role
 *
 * Usage:
 * router.post("/create", protect, roleMiddleware("admin"), createHandler)
 */

export const roleMiddleware = (allowed: string | string[]) => {
  const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];

  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole) return res.status(401).json({ success: false, message: "Not authorized" });

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ success: false, message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};

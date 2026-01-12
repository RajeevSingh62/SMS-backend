// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import User from "../modules/auth/auth.model";

/**
 * protect middleware:
 * - Verifies JWT token
 * - Attaches user basic info to req.user
 *
 * Packages:
 * - jsonwebtoken: sign/verify tokens
 *
 * Usage in routes: app.use("/api/admin", protect, adminRoutes)
 */

// extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // 1️⃣ Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Cookie fallback
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string };

    const user = await User.findById(decoded.id).select("role status");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "User inactive" });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "./auth.model";
import { ENV } from "../../config/env";

/**
 * Helper: create JWT token
 */
export const createToken = (userId: string):string => {
  return jwt.sign(
    { id: userId }, 
    ENV.JWT_SECRET, 
    {
    expiresIn: ENV.JWT_EXPIRES_IN ,
  });
};

// ────────────────────────────────────────────────────────────────
// Register → Now 100% safe for Express + async/await
// ────────────────────────────────────────────────────────────────
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }
    const avatar = req.file?.path;

    const user = await User.create({
      name,
      email,
      password,
      avatar,
      role: role || "student",
    });

    const token = createToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar:user.avatar,
        token,
      },
    });
  } catch (err) {
    // This is the key: we forward the error instead of sending response
    next(err);
  }
};

// ────────────────────────────────────────────────────────────────
// Login → Same fix applied
// ────────────────────────────────────────────────────────────────
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = createToken(user._id.toString());

    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    next(err); // Let global error handler deal with it
  }
};
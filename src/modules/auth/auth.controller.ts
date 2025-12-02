// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "./auth.model";
import { ENV } from "../../config/env";

/**
 * Helper: create JWT token
 */
const createToken = (userId: string) => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN || "7d" });
};

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // basic validation
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    // NOTE: do not allow public to create admin in production. Here we accept role but recommend validation later.
    const user = await User.create({
      name,
      email,
      password,
      role: role || "student",
    });

    const token = createToken(user._id.toString());

    return res.status(201).json({
      success: true,
      message: "User registered",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

    // select password explicitly because model sets select: false
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // update lastLogin (optional)
    user.lastLogin = new Date();
    await user.save();

    const token = createToken(user._id.toString());

    return res.json({
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
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

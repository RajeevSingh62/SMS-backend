import { Router } from "express";

import { protect } from "../../middleware/auth.middleware";
import { login, register } from "./auth.controller";
import upload from "../../middleware/upload";
const router = Router();

/*
  @route   POST /api/auth/register
  @desc    Register new user
  @access  Public
*/
console.log("Register route accessed")
router.post(
  "/register",
  upload.single("avatar"), 
  register
);

/*
  @route   POST /api/auth/login
  @desc    Login user & get token
  @access  Public
*/
router.post("/login", login);

/*
  @route   GET /api/auth/me
  @desc    Get logged-in user profile
  @access  Private
*/
// router.get("/me", protect, getProfile);

export default router;

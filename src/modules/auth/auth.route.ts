import { Router } from "express";
import { register, login } from "./auth.controller";
import { protect } from "../../middleware/auth.middleware";

const router = Router();

/*
  @route   POST /api/auth/register
  @desc    Register new user
  @access  Public
*/
router.post("/register", register);

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

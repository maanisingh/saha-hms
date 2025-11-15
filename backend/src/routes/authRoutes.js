import express from "express";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🧠 Public Routes
// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/register
router.post("/register", registerUser);

// 🔒 Protected Routes (require authentication)
// GET /api/auth/profile - Get current user profile
router.get("/profile", verifyToken, getProfile);

// PUT /api/auth/profile - Update current user profile
router.put("/profile", verifyToken, updateProfile);

// GET /api/auth/me - Simple endpoint to verify token and get basic user info
router.get("/me", verifyToken, (req, res) => {
  res.json({
    message: "Authenticated",
    user: req.user,
  });
});

export default router;

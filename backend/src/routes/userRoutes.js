import express from "express";
import prisma from "../config/prismaClient.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        publicId: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        displayName: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        // Don't send password
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get user profile (current logged-in user)
router.get("/profile", async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        publicId: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        displayName: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: {
        id: true,
        publicId: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        displayName: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

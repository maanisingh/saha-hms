import express from "express";
import {
  createLabRequest,
  getAllLabRequests,
  getLabRequestById,
  updateLabRequest,
  deleteLabRequest,
  createOrUpdateLabResult,
  getAllLabTemplates,
  createLabTemplate,
} from "../controllers/labRequestController.js";
import { verifyToken as authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Lab Request Routes
router.post("/", authenticate, createLabRequest);
router.get("/", authenticate, getAllLabRequests);
router.get("/:id", authenticate, getLabRequestById);
router.put("/:id", authenticate, updateLabRequest);
router.patch("/:id", authenticate, updateLabRequest);
router.delete("/:id", authenticate, deleteLabRequest);

// Lab Result Routes
router.post("/results", authenticate, createOrUpdateLabResult);

// Lab Template Routes
router.get("/templates/all", authenticate, getAllLabTemplates);
router.post("/templates", authenticate, createLabTemplate);

export default router;

import express from "express";
import {
  createRadiologyRequest,
  getAllRadiologyRequests,
  getRadiologyRequestById,
  updateRadiologyRequest,
  deleteRadiologyRequest,
  getAllRadiologyTemplates,
  createRadiologyTemplate,
} from "../controllers/radiologyRequestController.js";
import { verifyToken as authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Radiology Request Routes
router.post("/", authenticate, createRadiologyRequest);
router.get("/", authenticate, getAllRadiologyRequests);
router.get("/:id", authenticate, getRadiologyRequestById);
router.put("/:id", authenticate, updateRadiologyRequest);
router.patch("/:id", authenticate, updateRadiologyRequest);
router.delete("/:id", authenticate, deleteRadiologyRequest);

// Radiology Template Routes
router.get("/templates/all", authenticate, getAllRadiologyTemplates);
router.post("/templates", authenticate, createRadiologyTemplate);

export default router;

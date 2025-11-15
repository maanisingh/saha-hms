import express from "express";
import {
  createRadiologyOrder,
  getAllRadiologyOrders,
  getRadiologyOrderById,
  updateRadiologyOrder,
  deleteRadiologyOrder,
} from "../controllers/radiologyController.js";

const router = express.Router();

// Radiology orders routes
router.post("/orders", createRadiologyOrder);
router.get("/orders", getAllRadiologyOrders);
router.get("/orders/:id", getRadiologyOrderById);
router.put("/orders/:id", updateRadiologyOrder);
router.delete("/orders/:id", deleteRadiologyOrder);

// Legacy routes (keep for backward compatibility)
router.post("/", createRadiologyOrder);
router.get("/", getAllRadiologyOrders);
router.get("/:id", getRadiologyOrderById);
router.put("/:id", updateRadiologyOrder);
router.delete("/:id", deleteRadiologyOrder);

export default router;

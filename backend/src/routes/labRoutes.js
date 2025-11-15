import express from "express";
import {
  createLabOrder,
  getAllLabOrders,
  getLabOrderById,
  updateLabOrder,
  deleteLabOrder,
} from "../controllers/labController.js";

const router = express.Router();

// Lab orders routes
router.post("/orders", createLabOrder);
router.get("/orders", getAllLabOrders);
router.get("/orders/:id", getLabOrderById);
router.put("/orders/:id", updateLabOrder);
router.delete("/orders/:id", deleteLabOrder);

// Lab tests route (alias to orders for compatibility)
router.get("/tests", getAllLabOrders);

// Legacy routes (keep for backward compatibility)
router.post("/", createLabOrder);
router.get("/", getAllLabOrders);
router.get("/:id", getLabOrderById);
router.put("/:id", updateLabOrder);
router.delete("/:id", deleteLabOrder);

export default router;

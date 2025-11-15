import express from "express";
import {
  updateUserLocation,
  processBeaconSignal,
  getAllActiveLocations,
  getStaffInZone,
  findNearbyStaff,
  getBuildingSummary,
  deactivateLocation,
} from "../controllers/locationtrackerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Authentication required for all routes
router.use(verifyToken);

// ✅ POST - Process beacon signal (real-time tracking)
router.post("/signal", processBeaconSignal);

// ✅ POST - Add or Update User Location (legacy support)
router.post("/", updateUserLocation);

// ✅ GET - All active user locations (Admin dashboard)
router.get("/", getAllActiveLocations);

// ✅ GET - Building/Floor summary
router.get("/summary", getBuildingSummary);

// ✅ GET - Staff in a specific zone
router.get("/zone/:zoneName", getStaffInZone);

// ✅ GET - Find nearby staff (for current user)
router.get("/nearby", findNearbyStaff);

// ✅ GET - Find nearby staff for specific user
router.get("/nearby/:userId", findNearbyStaff);

// ✅ PUT - Deactivate user location
router.put("/:userId/deactivate", deactivateLocation);

export default router;

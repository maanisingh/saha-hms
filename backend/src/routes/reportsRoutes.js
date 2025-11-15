import express from "express";
import {
  getDashboardStats,
  getRevenueReport,
  getDepartmentReport,
  getDoctorPerformanceReport,
  getLabReport,
  getRadiologyReport,
  getPharmacyReport,
  getAppointmentReport,
  getFinancialSummary,
} from "../controllers/reportsController.js";
import { verifyToken as authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Dashboard & General Reports
router.get("/dashboard", authenticate, getDashboardStats);
router.get("/revenue", authenticate, getRevenueReport);
router.get("/departments", authenticate, getDepartmentReport);
router.get("/doctors", authenticate, getDoctorPerformanceReport);
router.get("/lab", authenticate, getLabReport);
router.get("/radiology", authenticate, getRadiologyReport);
router.get("/pharmacy", authenticate, getPharmacyReport);
router.get("/appointments", authenticate, getAppointmentReport);
router.get("/financial-summary", authenticate, getFinancialSummary);

export default router;

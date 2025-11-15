import express from "express";
import {
  registerPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { checkAccess, filterByAccess } from "../middlewares/rbacMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// 🧩 Define routes with RBAC
// Create patient - Only ADMIN, DOCTOR, NURSE can register patients
router.post(
  "/",
  checkAccess({ roles: ["ADMIN", "DOCTOR", "NURSE", "HR"] }),
  registerPatient
);

// Get all patients - Different roles see different data
// ADMIN/HR see all, DOCTOR sees their own patients, PATIENT sees only themselves
router.get(
  "/",
  filterByAccess,
  getAllPatients
);

// Get patient by ID - With resource-level access control
router.get(
  "/:id",
  checkAccess({
    roles: ["ADMIN", "DOCTOR", "NURSE", "HR", "PATIENT"],
    requireOwnResource: true,
  }),
  getPatientById
);

// Update patient - Only specific roles can update
router.put(
  "/:id",
  checkAccess({
    roles: ["ADMIN", "DOCTOR", "NURSE", "HR"],
  }),
  updatePatient
);

router.patch(
  "/:id",
  checkAccess({
    roles: ["ADMIN", "DOCTOR", "NURSE", "HR"],
  }),
  updatePatient
);

// Delete patient - Only ADMIN and HR can delete
router.delete(
  "/:id",
  checkAccess({ roles: ["ADMIN", "HR"] }),
  deletePatient
);

export default router;






// src/routes/attendance.routes.js
import express from "express";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../controllers/staffattendaceControlller.js";

const router = express.Router();

router.post("/", createAttendance);       // ✅ Mark attendance
router.get("/", getAllAttendance);        // ✅ Get all attendance
router.get("/:id", getAttendanceById);    // ✅ Get attendance by ID
router.put("/:id", updateAttendance);     // ✅ Update attendance
router.delete("/:id", deleteAttendance);  // ✅ Delete attendance

export default router;

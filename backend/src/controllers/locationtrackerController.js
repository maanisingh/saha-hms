import { PrismaClient } from "@prisma/client";
import beaconTrackingService from "../services/beaconTrackingService.js";

const prisma = new PrismaClient();

// ✅ Process beacon signal (enhanced for real-time tracking)
export const processBeaconSignal = async (req, res) => {
  try {
    const { userId, beaconCode, rssi, timestamp } = req.body;

    if (!userId || !beaconCode) {
      return res.status(400).json({
        message: "userId and beaconCode are required",
      });
    }

    const location = await beaconTrackingService.processBeaconSignal({
      userId,
      beaconCode,
      rssi: rssi || -60,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    res.status(200).json({
      message: "Beacon signal processed successfully",
      location,
    });
  } catch (error) {
    console.error("Error processing beacon signal:", error);
    res.status(500).json({ message: "Error processing beacon signal" });
  }
};

// ✅ Add or Update User Location (legacy support)
export const updateUserLocation = async (req, res) => {
  try {
    const { userId, beaconId } = req.body;

    if (!userId || !beaconId) {
      return res.status(400).json({ message: "userId and beaconId are required" });
    }

    const tracking = await beaconTrackingService.updateUserLocation(
      userId,
      beaconId,
      0,
      new Date()
    );

    res.status(200).json({
      message: "User location updated successfully",
      tracking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user location", error });
  }
};

// ✅ Get all active users' latest locations (for Admin dashboard)
export const getAllActiveLocations = async (req, res) => {
  try {
    const { building, floor, role } = req.query;

    const filters = {};
    if (building) filters.building = building;
    if (floor) filters.floor = floor;
    if (role) filters.role = role;

    const locations = await beaconTrackingService.getAllActiveLocations(filters);

    res.status(200).json({
      message: "All active user locations fetched successfully",
      locations,
      total: locations.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching locations", error });
  }
};

// ✅ Get staff in a specific zone
export const getStaffInZone = async (req, res) => {
  try {
    const { zoneName } = req.params;
    const { building, floor } = req.query;

    const staff = await beaconTrackingService.getStaffInZone(
      zoneName,
      building,
      floor
    );

    res.status(200).json({
      message: "Staff in zone fetched successfully",
      staff,
      total: staff.length,
    });
  } catch (error) {
    console.error("Error fetching staff in zone:", error);
    res.status(500).json({ message: "Error fetching staff in zone" });
  }
};

// ✅ Find nearby staff members
export const findNearbyStaff = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    const nearbyStaff = await beaconTrackingService.findNearbyStaff(userId);

    res.status(200).json({
      message: "Nearby staff fetched successfully",
      nearbyStaff,
      total: nearbyStaff.length,
    });
  } catch (error) {
    console.error("Error finding nearby staff:", error);
    res.status(500).json({ message: "Error finding nearby staff" });
  }
};

// ✅ Get building/floor summary
export const getBuildingSummary = async (req, res) => {
  try {
    const summary = await beaconTrackingService.getBuildingSummary();

    res.status(200).json({
      message: "Building summary fetched successfully",
      summary,
    });
  } catch (error) {
    console.error("Error getting building summary:", error);
    res.status(500).json({ message: "Error getting building summary" });
  }
};

// ✅ Deactivate a user location (optional)
export const deactivateLocation = async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.locationTracking.update({
      where: { userId: Number(userId) },
      data: { isActive: false },
    });

    res.status(200).json({ message: "User location deactivated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deactivating location", error });
  }
};

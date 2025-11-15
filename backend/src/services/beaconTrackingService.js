/**
 * Beacon Tracking Service
 * Integrates with OpenBeacon-style BLE beacons for real-time staff location tracking
 *
 * This service provides:
 * - Real-time location updates from beacon signals
 * - Building/floor/zone mapping
 * - Historical location tracking
 * - Proximity detection
 * - Staff availability status
 */

import { PrismaClient } from "@prisma/client";
import { EventEmitter } from "events";

const prisma = new PrismaClient();

class BeaconTrackingService extends EventEmitter {
  constructor() {
    super();
    this.activeConnections = new Map(); // Store WebSocket connections
    this.locationCache = new Map(); // Cache recent locations
    this.proximityThreshold = 5; // meters
  }

  /**
   * Process incoming beacon signal
   * @param {Object} signalData - {userId, beaconCode, rssi, timestamp}
   */
  async processBeaconSignal(signalData) {
    try {
      const { userId, beaconCode, rssi, timestamp } = signalData;

      // Find beacon by code
      const beacon = await prisma.beacon.findUnique({
        where: { beaconCode },
      });

      if (!beacon || !beacon.isActive) {
        console.warn(`Beacon ${beaconCode} not found or inactive`);
        return null;
      }

      // Calculate distance from RSSI (simplified)
      const distance = this.calculateDistance(rssi);

      // Update or create location tracking
      const location = await this.updateUserLocation(
        userId,
        beacon.id,
        distance,
        timestamp
      );

      // Emit location update event
      this.emit("locationUpdate", {
        userId,
        location,
        beacon,
        distance,
      });

      // Cache the location
      this.cacheLocation(userId, location);

      return location;
    } catch (error) {
      console.error("Error processing beacon signal:", error);
      throw error;
    }
  }

  /**
   * Update user location in database
   */
  async updateUserLocation(userId, beaconId, distance, timestamp = new Date()) {
    try {
      const existing = await prisma.locationTracking.findUnique({
        where: { userId: parseInt(userId) },
      });

      let tracking;

      if (existing) {
        tracking = await prisma.locationTracking.update({
          where: { userId: parseInt(userId) },
          data: {
            beaconId: parseInt(beaconId),
            lastSeen: timestamp,
            isActive: true,
          },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                phone: true,
              },
            },
            beacon: true,
          },
        });
      } else {
        tracking = await prisma.locationTracking.create({
          data: {
            userId: parseInt(userId),
            beaconId: parseInt(beaconId),
            lastSeen: timestamp,
            isActive: true,
          },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
                phone: true,
              },
            },
            beacon: true,
          },
        });
      }

      return tracking;
    } catch (error) {
      console.error("Error updating user location:", error);
      throw error;
    }
  }

  /**
   * Get all active staff locations
   */
  async getAllActiveLocations(filters = {}) {
    try {
      const whereClause = { isActive: true };

      // Add filters
      if (filters.building) {
        whereClause.beacon = {
          building: filters.building,
        };
      }

      if (filters.floor) {
        whereClause.beacon = {
          ...whereClause.beacon,
          floor: filters.floor,
        };
      }

      if (filters.role) {
        whereClause.user = {
          role: filters.role,
        };
      }

      const locations = await prisma.locationTracking.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              publicId: true,
              firstName: true,
              lastName: true,
              role: true,
              phone: true,
            },
          },
          beacon: true,
        },
        orderBy: {
          lastSeen: "desc",
        },
      });

      return locations;
    } catch (error) {
      console.error("Error fetching active locations:", error);
      throw error;
    }
  }

  /**
   * Get staff members in a specific zone/building/floor
   */
  async getStaffInZone(zoneName, building = null, floor = null) {
    try {
      const whereClause = {
        beacon: {
          zoneName,
          isActive: true,
        },
        isActive: true,
      };

      if (building) {
        whereClause.beacon.building = building;
      }

      if (floor) {
        whereClause.beacon.floor = floor;
      }

      const locations = await prisma.locationTracking.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true,
              phone: true,
            },
          },
          beacon: true,
        },
      });

      return locations;
    } catch (error) {
      console.error("Error fetching staff in zone:", error);
      throw error;
    }
  }

  /**
   * Get location history for a user
   */
  async getLocationHistory(userId, startDate, endDate) {
    // For now, we only track current location
    // TODO: Implement location history table for audit trail
    try {
      const currentLocation = await prisma.locationTracking.findUnique({
        where: { userId: parseInt(userId) },
        include: {
          user: true,
          beacon: true,
        },
      });

      return currentLocation ? [currentLocation] : [];
    } catch (error) {
      console.error("Error fetching location history:", error);
      throw error;
    }
  }

  /**
   * Find nearby staff members
   */
  async findNearbyStaff(userId, maxDistance = 50) {
    try {
      // Get current user location
      const userLocation = await prisma.locationTracking.findUnique({
        where: { userId: parseInt(userId) },
        include: { beacon: true },
      });

      if (!userLocation) {
        return [];
      }

      // Find all staff in the same zone
      const nearbyStaff = await this.getStaffInZone(
        userLocation.beacon.zoneName,
        userLocation.beacon.building,
        userLocation.beacon.floor
      );

      // Filter out the requesting user
      return nearbyStaff.filter((staff) => staff.userId !== parseInt(userId));
    } catch (error) {
      console.error("Error finding nearby staff:", error);
      throw error;
    }
  }

  /**
   * Mark user as offline/inactive
   */
  async markUserInactive(userId) {
    try {
      await prisma.locationTracking.updateMany({
        where: { userId: parseInt(userId) },
        data: { isActive: false },
      });
    } catch (error) {
      console.error("Error marking user inactive:", error);
      throw error;
    }
  }

  /**
   * Calculate distance from RSSI signal strength
   * Using simplified path loss model: d = 10^((TxPower - RSSI) / (10 * n))
   */
  calculateDistance(rssi, txPower = -59, n = 2) {
    if (rssi === 0) return -1;

    const ratio = (txPower - rssi) / (10 * n);
    return Math.pow(10, ratio);
  }

  /**
   * Cache location data
   */
  cacheLocation(userId, location) {
    this.locationCache.set(userId, {
      location,
      timestamp: Date.now(),
    });
  }

  /**
   * Get cached location
   */
  getCachedLocation(userId) {
    const cached = this.locationCache.get(userId);
    if (cached && Date.now() - cached.timestamp < 60000) {
      // 1 minute cache
      return cached.location;
    }
    return null;
  }

  /**
   * Get building/floor summary
   */
  async getBuildingSummary() {
    try {
      const locations = await prisma.locationTracking.findMany({
        where: { isActive: true },
        include: {
          beacon: true,
          user: {
            select: {
              role: true,
            },
          },
        },
      });

      const summary = {};

      locations.forEach((loc) => {
        const building = loc.beacon.building || "Unknown";
        const floor = loc.beacon.floor || "Unknown";
        const key = `${building}-${floor}`;

        if (!summary[key]) {
          summary[key] = {
            building,
            floor,
            totalStaff: 0,
            byRole: {},
          };
        }

        summary[key].totalStaff++;
        const role = loc.user.role;
        summary[key].byRole[role] = (summary[key].byRole[role] || 0) + 1;
      });

      return Object.values(summary);
    } catch (error) {
      console.error("Error getting building summary:", error);
      throw error;
    }
  }
}

// Export singleton instance
export default new BeaconTrackingService();

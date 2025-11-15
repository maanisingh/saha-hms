import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Enhanced RBAC Middleware
 * Supports role-based and department-based access control
 *
 * Usage:
 * - checkAccess({ roles: ['ADMIN', 'DOCTOR'] })
 * - checkAccess({ roles: ['DOCTOR'], requireOwnDepartment: true })
 * - checkAccess({ roles: ['DOCTOR'], requireOwnResource: true })
 */

export const checkAccess = (options = {}) => {
  const {
    roles = [],
    requireOwnDepartment = false,
    requireOwnResource = false,
    resourceIdParam = 'id', // Parameter name in req.params for resource ID
  } = options;

  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized: No user info found",
        });
      }

      const userRole = req.user.role;
      const userId = req.user.id;
      const userDepartmentId = req.user.departmentId;

      // Check if user's role is allowed
      if (roles.length > 0 && !roles.includes(userRole)) {
        return res.status(403).json({
          message: "Forbidden: Insufficient role permissions",
        });
      }

      // If department-level access is required
      if (requireOwnDepartment && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
        if (!userDepartmentId) {
          return res.status(403).json({
            message: "Forbidden: User has no department assignment",
          });
        }

        // Check if the resource belongs to the user's department
        const resourceId = req.params[resourceIdParam] || req.body[resourceIdParam];

        if (resourceId) {
          const hasAccess = await checkDepartmentAccess(
            userRole,
            userDepartmentId,
            resourceId,
            req.path
          );

          if (!hasAccess) {
            return res.status(403).json({
              message: "Forbidden: Resource not in your department",
            });
          }
        }
      }

      // If resource ownership is required (e.g., doctor can only see own patients)
      if (requireOwnResource && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
        const resourceId = req.params[resourceIdParam] || req.body[resourceIdParam];

        if (resourceId) {
          const hasAccess = await checkResourceOwnership(
            userId,
            userRole,
            resourceId,
            req.path
          );

          if (!hasAccess) {
            return res.status(403).json({
              message: "Forbidden: You can only access your own resources",
            });
          }
        }
      }

      next();
    } catch (error) {
      console.error("🚫 RBAC check error:", error);
      res.status(500).json({
        message: "Server error during permission verification",
      });
    }
  };
};

/**
 * Check if a resource belongs to the user's department
 */
async function checkDepartmentAccess(userRole, userDepartmentId, resourceId, path) {
  try {
    // Determine resource type from path
    if (path.includes('/patients')) {
      // For patients, check through appointments or admissions
      const appointment = await prisma.appointment.findFirst({
        where: {
          patientId: parseInt(resourceId),
          departmentId: userDepartmentId,
        },
      });
      return !!appointment;
    }

    if (path.includes('/appointments')) {
      const appointment = await prisma.appointment.findUnique({
        where: { id: parseInt(resourceId) },
      });
      return appointment?.departmentId === userDepartmentId;
    }

    if (path.includes('/doctors')) {
      const doctor = await prisma.doctor.findUnique({
        where: { id: parseInt(resourceId) },
      });
      return doctor?.departmentId === userDepartmentId;
    }

    if (path.includes('/nurses')) {
      const nurse = await prisma.nurse.findUnique({
        where: { id: parseInt(resourceId) },
      });
      return nurse?.departmentId === userDepartmentId;
    }

    // Default: allow access if no specific check
    return true;
  } catch (error) {
    console.error("Error checking department access:", error);
    return false;
  }
}

/**
 * Check if a resource belongs to the user (e.g., doctor's own patients)
 */
async function checkResourceOwnership(userId, userRole, resourceId, path) {
  try {
    if (userRole === 'DOCTOR') {
      const doctor = await prisma.doctor.findUnique({
        where: { userId },
      });

      if (!doctor) return false;

      if (path.includes('/patients')) {
        // Check if doctor has appointments with this patient
        const appointment = await prisma.appointment.findFirst({
          where: {
            patientId: parseInt(resourceId),
            doctorId: doctor.id,
          },
        });
        return !!appointment;
      }

      if (path.includes('/appointments')) {
        const appointment = await prisma.appointment.findUnique({
          where: { id: parseInt(resourceId) },
        });
        return appointment?.doctorId === doctor.id;
      }
    }

    if (userRole === 'PATIENT') {
      const patient = await prisma.patient.findUnique({
        where: { userId },
      });

      if (!patient) return false;

      // Patients can only access their own resources
      if (path.includes('/patients')) {
        return patient.id === parseInt(resourceId);
      }

      if (path.includes('/appointments')) {
        const appointment = await prisma.appointment.findUnique({
          where: { id: parseInt(resourceId) },
        });
        return appointment?.patientId === patient.id;
      }

      if (path.includes('/prescriptions')) {
        const prescription = await prisma.prescription.findUnique({
          where: { id: parseInt(resourceId) },
        });
        return prescription?.patientId === patient.id;
      }
    }

    if (userRole === 'NURSE') {
      const nurse = await prisma.nurse.findUnique({
        where: { userId },
      });

      if (!nurse) return false;

      // Nurses can access patients in their ward/department
      return true; // Implement specific ward-based logic if needed
    }

    return true;
  } catch (error) {
    console.error("Error checking resource ownership:", error);
    return false;
  }
}

/**
 * Middleware to filter query results based on user permissions
 * This modifies the query to only return resources the user has access to
 */
export const filterByAccess = async (req, res, next) => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?.id;
    const departmentId = req.user?.departmentId;

    // Admins see everything
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
      return next();
    }

    // Add filters to req.query based on role
    if (userRole === 'DOCTOR') {
      const doctor = await prisma.doctor.findUnique({
        where: { userId },
      });

      if (doctor) {
        req.accessFilter = {
          doctorId: doctor.id,
        };
      }
    }

    if (userRole === 'PATIENT') {
      const patient = await prisma.patient.findUnique({
        where: { userId },
      });

      if (patient) {
        req.accessFilter = {
          patientId: patient.id,
        };
      }
    }

    if (userRole === 'NURSE' && departmentId) {
      req.accessFilter = {
        departmentId: departmentId,
      };
    }

    next();
  } catch (error) {
    console.error("Error in filterByAccess middleware:", error);
    next();
  }
};

import prisma from "../config/prismaClient.js";

/**
 * 🩻 Create Radiology Request with proper relational data
 */
export const createRadiologyRequest = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      appointmentId,
      templateId,
      referralCodeId,
      status,
      price,
      paymentStatus,
      findings,
    } = req.body;

    // Generate unique request number
    const count = await prisma.radiologyRequest.count();
    const requestNumber = `RAD${String(count + 1).padStart(6, "0")}`;

    const radiologyRequest = await prisma.radiologyRequest.create({
      data: {
        requestNumber,
        patientId: Number(patientId),
        doctorId: doctorId ? Number(doctorId) : null,
        appointmentId: appointmentId ? Number(appointmentId) : null,
        templateId: templateId ? Number(templateId) : null,
        referralCodeId: referralCodeId ? Number(referralCodeId) : null,
        status: status || "REQUESTED",
        price: price ? Number(price) : 0,
        paymentStatus: paymentStatus || "PENDING",
        findings,
      },
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                gender: true,
                dateOfBirth: true,
              },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            department: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
        appointment: true,
        template: true,
      },
    });

    res.status(201).json({
      message: "Radiology request created successfully",
      data: radiologyRequest,
    });
  } catch (error) {
    console.error("Error creating radiology request:", error);
    res.status(500).json({
      message: "Failed to create radiology request",
      error: error.message,
    });
  }
};

/**
 * 📋 Get All Radiology Requests with full relational data
 */
export const getAllRadiologyRequests = async (req, res) => {
  try {
    const { status, paymentStatus } = req.query;
    const where = { isActive: true };

    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    const radiologyRequests = await prisma.radiologyRequest.findMany({
      where,
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                gender: true,
                dateOfBirth: true,
              },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            department: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
        appointment: true,
        template: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(radiologyRequests);
  } catch (error) {
    console.error("Error fetching radiology requests:", error);
    res.status(500).json({
      message: "Failed to fetch radiology requests",
      error: error.message,
    });
  }
};

/**
 * 🔍 Get Radiology Request by ID
 */
export const getRadiologyRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const radiologyRequest = await prisma.radiologyRequest.findUnique({
      where: { id: Number(id) },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
        appointment: true,
        template: true,
      },
    });

    if (!radiologyRequest) {
      return res.status(404).json({ message: "Radiology request not found" });
    }

    res.json(radiologyRequest);
  } catch (error) {
    console.error("Error fetching radiology request:", error);
    res.status(500).json({
      message: "Failed to fetch radiology request",
      error: error.message,
    });
  }
};

/**
 * ✏️ Update Radiology Request
 */
export const updateRadiologyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      reportUrl,
      findings,
      paymentStatus,
      price,
      completedAt,
    } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (reportUrl) updateData.reportUrl = reportUrl;
    if (findings) updateData.findings = findings;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (price !== undefined) updateData.price = Number(price);
    if (completedAt) updateData.completedAt = new Date(completedAt);
    if (status === "COMPLETED" && !completedAt) {
      updateData.completedAt = new Date();
    }

    const radiologyRequest = await prisma.radiologyRequest.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        patient: {
          include: {
            user: true,
          },
        },
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
        template: true,
      },
    });

    res.json({
      message: "Radiology request updated successfully",
      data: radiologyRequest,
    });
  } catch (error) {
    console.error("Error updating radiology request:", error);
    res.status(500).json({
      message: "Failed to update radiology request",
      error: error.message,
    });
  }
};

/**
 * 🗑️ Delete Radiology Request (soft delete)
 */
export const deleteRadiologyRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const radiologyRequest = await prisma.radiologyRequest.update({
      where: { id: Number(id) },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });

    res.json({ message: "Radiology request deleted successfully" });
  } catch (error) {
    console.error("Error deleting radiology request:", error);
    res.status(500).json({
      message: "Failed to delete radiology request",
      error: error.message,
    });
  }
};

/**
 * 📋 Get All Radiology Templates
 */
export const getAllRadiologyTemplates = async (req, res) => {
  try {
    const templates = await prisma.radiologyTemplate.findMany({
      include: {
        department: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    res.json(templates);
  } catch (error) {
    console.error("Error fetching radiology templates:", error);
    res.status(500).json({
      message: "Failed to fetch radiology templates",
      error: error.message,
    });
  }
};

/**
 * ➕ Create Radiology Template
 */
export const createRadiologyTemplate = async (req, res) => {
  try {
    const { code, name, departmentId, price } = req.body;

    const template = await prisma.radiologyTemplate.create({
      data: {
        code,
        name,
        departmentId: departmentId ? Number(departmentId) : null,
        price: price ? Number(price) : 0,
      },
      include: {
        department: true,
      },
    });

    res.status(201).json({
      message: "Radiology template created successfully",
      data: template,
    });
  } catch (error) {
    console.error("Error creating radiology template:", error);
    res.status(500).json({
      message: "Failed to create radiology template",
      error: error.message,
    });
  }
};

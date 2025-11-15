import prisma from "../config/prismaClient.js";

/**
 * 🧪 Create Lab Request with proper relational data
 */
export const createLabRequest = async (req, res) => {
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
      resultSummary,
    } = req.body;

    // Generate unique request number
    const count = await prisma.labRequest.count();
    const requestNumber = `LAB${String(count + 1).padStart(6, "0")}`;

    const labRequest = await prisma.labRequest.create({
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
        resultSummary,
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
        result: true,
      },
    });

    res.status(201).json({
      message: "Lab request created successfully",
      data: labRequest,
    });
  } catch (error) {
    console.error("Error creating lab request:", error);
    res.status(500).json({
      message: "Failed to create lab request",
      error: error.message,
    });
  }
};

/**
 * 📋 Get All Lab Requests with full relational data
 */
export const getAllLabRequests = async (req, res) => {
  try {
    const { status, paymentStatus } = req.query;
    const where = { isActive: true };

    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    const labRequests = await prisma.labRequest.findMany({
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
        result: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(labRequests);
  } catch (error) {
    console.error("Error fetching lab requests:", error);
    res.status(500).json({
      message: "Failed to fetch lab requests",
      error: error.message,
    });
  }
};

/**
 * 🔍 Get Lab Request by ID
 */
export const getLabRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const labRequest = await prisma.labRequest.findUnique({
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
        result: true,
      },
    });

    if (!labRequest) {
      return res.status(404).json({ message: "Lab request not found" });
    }

    res.json(labRequest);
  } catch (error) {
    console.error("Error fetching lab request:", error);
    res.status(500).json({
      message: "Failed to fetch lab request",
      error: error.message,
    });
  }
};

/**
 * ✏️ Update Lab Request
 */
export const updateLabRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      resultFileUrl,
      resultSummary,
      paymentStatus,
      price,
      completedAt,
    } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (resultFileUrl) updateData.resultFileUrl = resultFileUrl;
    if (resultSummary) updateData.resultSummary = resultSummary;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (price !== undefined) updateData.price = Number(price);
    if (completedAt) updateData.completedAt = new Date(completedAt);
    if (status === "COMPLETED" && !completedAt) {
      updateData.completedAt = new Date();
    }

    const labRequest = await prisma.labRequest.update({
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
        result: true,
      },
    });

    res.json({
      message: "Lab request updated successfully",
      data: labRequest,
    });
  } catch (error) {
    console.error("Error updating lab request:", error);
    res.status(500).json({
      message: "Failed to update lab request",
      error: error.message,
    });
  }
};

/**
 * 🗑️ Delete Lab Request (soft delete)
 */
export const deleteLabRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const labRequest = await prisma.labRequest.update({
      where: { id: Number(id) },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });

    res.json({ message: "Lab request deleted successfully" });
  } catch (error) {
    console.error("Error deleting lab request:", error);
    res.status(500).json({
      message: "Failed to delete lab request",
      error: error.message,
    });
  }
};

/**
 * 📊 Create or Update Lab Result
 */
export const createOrUpdateLabResult = async (req, res) => {
  try {
    const { labRequestId, resultSummary, resultFileUrl, status, resultantId } =
      req.body;

    // Check if result already exists
    const existingResult = await prisma.labResult.findUnique({
      where: { labRequestId: Number(labRequestId) },
    });

    let result;
    if (existingResult) {
      // Update existing result
      result = await prisma.labResult.update({
        where: { labRequestId: Number(labRequestId) },
        data: {
          resultSummary,
          resultFileUrl,
          status: status || "NOT_REPORTED",
          resultantId: resultantId ? Number(resultantId) : null,
          resultedAt: new Date(),
        },
        include: {
          labRequest: {
            include: {
              patient: {
                include: { user: true },
              },
            },
          },
          resultant: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
    } else {
      // Create new result
      result = await prisma.labResult.create({
        data: {
          labRequestId: Number(labRequestId),
          resultSummary,
          resultFileUrl,
          status: status || "NOT_REPORTED",
          resultantId: resultantId ? Number(resultantId) : null,
        },
        include: {
          labRequest: {
            include: {
              patient: {
                include: { user: true },
              },
            },
          },
          resultant: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      // Update lab request status
      await prisma.labRequest.update({
        where: { id: Number(labRequestId) },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });
    }

    res.status(existingResult ? 200 : 201).json({
      message: existingResult
        ? "Lab result updated successfully"
        : "Lab result created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating/updating lab result:", error);
    res.status(500).json({
      message: "Failed to create/update lab result",
      error: error.message,
    });
  }
};

/**
 * 📋 Get All Lab Templates
 */
export const getAllLabTemplates = async (req, res) => {
  try {
    const templates = await prisma.labTestTemplate.findMany({
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
    console.error("Error fetching lab templates:", error);
    res.status(500).json({
      message: "Failed to fetch lab templates",
      error: error.message,
    });
  }
};

/**
 * ➕ Create Lab Template
 */
export const createLabTemplate = async (req, res) => {
  try {
    const { code, name, departmentId, price } = req.body;

    const template = await prisma.labTestTemplate.create({
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
      message: "Lab template created successfully",
      data: template,
    });
  } catch (error) {
    console.error("Error creating lab template:", error);
    res.status(500).json({
      message: "Failed to create lab template",
      error: error.message,
    });
  }
};

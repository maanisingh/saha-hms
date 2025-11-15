import prisma from "../config/prismaClient.js";

/**
 * 📊 Get Dashboard Statistics
 */
export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      todayAppointments,
      pendingLabRequests,
      pendingRadiologyRequests,
      totalInvoices,
      paidInvoices,
      pendingInvoices,
      totalRevenue,
    ] = await Promise.all([
      prisma.patient.count({ where: { deletedAt: null } }),
      prisma.doctor.count({ where: { deletedAt: null } }),
      prisma.appointment.count({ where: { isDeleted: false } }),
      prisma.appointment.count({
        where: {
          isDeleted: false,
          scheduledAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      }),
      prisma.labRequest.count({ where: { status: "REQUESTED" } }),
      prisma.radiologyRequest.count({ where: { status: "REQUESTED" } }),
      prisma.invoice.count({ where: { isActive: true } }),
      prisma.invoice.count({
        where: { isActive: true, paymentStatus: "PAID" },
      }),
      prisma.invoice.count({
        where: { isActive: true, paymentStatus: "PENDING" },
      }),
      prisma.invoice.aggregate({
        where: { isActive: true, paymentStatus: "PAID" },
        _sum: { paidAmount: true },
      }),
    ]);

    res.json({
      patients: {
        total: totalPatients,
      },
      doctors: {
        total: totalDoctors,
      },
      appointments: {
        total: totalAppointments,
        today: todayAppointments,
      },
      labRequests: {
        pending: pendingLabRequests,
      },
      radiologyRequests: {
        pending: pendingRadiologyRequests,
      },
      invoices: {
        total: totalInvoices,
        paid: paidInvoices,
        pending: pendingInvoices,
      },
      revenue: {
        total: totalRevenue._sum.paidAmount || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};

/**
 * 📈 Get Revenue Report
 */
export const getRevenueReport = async (req, res) => {
  try {
    const { startDate, endDate, groupBy = "day" } = req.query;

    const where = {
      isActive: true,
      paymentStatus: "PAID",
    };

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const invoices = await prisma.invoice.findMany({
      where,
      select: {
        id: true,
        invoiceNumber: true,
        invoiceType: true,
        totalAmount: true,
        paidAmount: true,
        createdAt: true,
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const totalRevenue = invoices.reduce(
      (sum, inv) => sum + Number(inv.paidAmount || 0),
      0
    );

    // Group by invoice type
    const revenueByType = invoices.reduce((acc, inv) => {
      const type = inv.invoiceType;
      if (!acc[type]) {
        acc[type] = { count: 0, total: 0 };
      }
      acc[type].count += 1;
      acc[type].total += Number(inv.paidAmount || 0);
      return acc;
    }, {});

    res.json({
      totalRevenue,
      totalInvoices: invoices.length,
      revenueByType,
      invoices: invoices.slice(0, 50), // Latest 50 invoices
    });
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    res.status(500).json({
      message: "Failed to fetch revenue report",
      error: error.message,
    });
  }
};

/**
 * 🏥 Get Department-wise Report
 */
export const getDepartmentReport = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            doctors: true,
            nurses: true,
            appointments: true,
          },
        },
        doctors: {
          select: {
            id: true,
            doctorCode: true,
            speciality: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    // Get revenue for each department
    const departmentReports = await Promise.all(
      departments.map(async (dept) => {
        const revenue = await prisma.invoice.aggregate({
          where: {
            isActive: true,
            paymentStatus: "PAID",
            appointment: {
              departmentId: dept.id,
            },
          },
          _sum: {
            paidAmount: true,
          },
        });

        return {
          id: dept.id,
          name: dept.name,
          code: dept.code,
          type: dept.type,
          doctorsCount: dept._count.doctors,
          nursesCount: dept._count.nurses,
          appointmentsCount: dept._count.appointments,
          revenue: revenue._sum.paidAmount || 0,
          doctors: dept.doctors,
        };
      })
    );

    res.json({
      departments: departmentReports,
      totalDepartments: departments.length,
    });
  } catch (error) {
    console.error("Error fetching department report:", error);
    res.status(500).json({
      message: "Failed to fetch department report",
      error: error.message,
    });
  }
};

/**
 * 👨‍⚕️ Get Doctor Performance Report
 */
export const getDoctorPerformanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where = startDate && endDate
      ? {
          createdAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }
      : {};

    const doctors = await prisma.doctor.findMany({
      where: { deletedAt: null },
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
            name: true,
            code: true,
          },
        },
        _count: {
          select: {
            appointments: true,
            prescriptions: true,
            labRequests: true,
            radiologyRequests: true,
          },
        },
      },
    });

    const doctorReports = await Promise.all(
      doctors.map(async (doctor) => {
        const revenue = await prisma.invoice.aggregate({
          where: {
            isActive: true,
            paymentStatus: "PAID",
            appointment: {
              doctorId: doctor.id,
            },
            ...where,
          },
          _sum: {
            paidAmount: true,
          },
        });

        return {
          id: doctor.id,
          doctorCode: doctor.doctorCode,
          name: `${doctor.user.firstName} ${doctor.user.lastName}`,
          email: doctor.user.email,
          speciality: doctor.speciality,
          department: doctor.department?.name,
          appointmentsCount: doctor._count.appointments,
          prescriptionsCount: doctor._count.prescriptions,
          labRequestsCount: doctor._count.labRequests,
          radiologyRequestsCount: doctor._count.radiologyRequests,
          revenue: revenue._sum.paidAmount || 0,
        };
      })
    );

    res.json({
      doctors: doctorReports.sort((a, b) => b.revenue - a.revenue),
      totalDoctors: doctors.length,
    });
  } catch (error) {
    console.error("Error fetching doctor performance report:", error);
    res.status(500).json({
      message: "Failed to fetch doctor performance report",
      error: error.message,
    });
  }
};

/**
 * 🧪 Get Lab Report
 */
export const getLabReport = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    const where = { isActive: true };

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (status) {
      where.status = status;
    }

    const labRequests = await prisma.labRequest.findMany({
      where,
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
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
              },
            },
          },
        },
        template: true,
        result: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const statusCounts = labRequests.reduce((acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1;
      return acc;
    }, {});

    const totalRevenue = labRequests.reduce(
      (sum, req) => sum + Number(req.price || 0),
      0
    );

    res.json({
      totalRequests: labRequests.length,
      statusCounts,
      totalRevenue,
      requests: labRequests.slice(0, 100),
    });
  } catch (error) {
    console.error("Error fetching lab report:", error);
    res.status(500).json({
      message: "Failed to fetch lab report",
      error: error.message,
    });
  }
};

/**
 * 🩻 Get Radiology Report
 */
export const getRadiologyReport = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    const where = { isActive: true };

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (status) {
      where.status = status;
    }

    const radiologyRequests = await prisma.radiologyRequest.findMany({
      where,
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
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
              },
            },
          },
        },
        template: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const statusCounts = radiologyRequests.reduce((acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1;
      return acc;
    }, {});

    const totalRevenue = radiologyRequests.reduce(
      (sum, req) => sum + Number(req.price || 0),
      0
    );

    res.json({
      totalRequests: radiologyRequests.length,
      statusCounts,
      totalRevenue,
      requests: radiologyRequests.slice(0, 100),
    });
  } catch (error) {
    console.error("Error fetching radiology report:", error);
    res.status(500).json({
      message: "Failed to fetch radiology report",
      error: error.message,
    });
  }
};

/**
 * 💊 Get Pharmacy Report
 */
export const getPharmacyReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where = { isActive: true };

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const sales = await prisma.pharmacySale.findMany({
      where,
      include: {
        prescription: true,
        items: {
          include: {
            medicine: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + Number(sale.totalAmount || 0),
      0
    );

    const paymentStatusCounts = sales.reduce((acc, sale) => {
      acc[sale.paymentStatus] = (acc[sale.paymentStatus] || 0) + 1;
      return acc;
    }, {});

    // Get medicines stock status
    const medicines = await prisma.medicine.findMany({
      select: {
        id: true,
        brandName: true,
        genericName: true,
        stock: true,
        status: true,
        reorderLevel: true,
      },
    });

    const lowStockMedicines = medicines.filter(
      (m) => m.stock <= m.reorderLevel
    );

    res.json({
      totalSales: sales.length,
      totalRevenue,
      paymentStatusCounts,
      lowStockMedicines,
      recentSales: sales.slice(0, 50),
    });
  } catch (error) {
    console.error("Error fetching pharmacy report:", error);
    res.status(500).json({
      message: "Failed to fetch pharmacy report",
      error: error.message,
    });
  }
};

/**
 * 📅 Get Appointment Report
 */
export const getAppointmentReport = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    const where = { isDeleted: false };

    if (startDate && endDate) {
      where.scheduledAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (status) {
      where.status = status;
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
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
              },
            },
            department: true,
          },
        },
        department: true,
      },
      orderBy: { scheduledAt: "desc" },
    });

    const statusCounts = appointments.reduce((acc, apt) => {
      acc[apt.status] = (acc[apt.status] || 0) + 1;
      return acc;
    }, {});

    const departmentCounts = appointments.reduce((acc, apt) => {
      const deptName = apt.department?.name || "No Department";
      acc[deptName] = (acc[deptName] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalAppointments: appointments.length,
      statusCounts,
      departmentCounts,
      appointments: appointments.slice(0, 100),
    });
  } catch (error) {
    console.error("Error fetching appointment report:", error);
    res.status(500).json({
      message: "Failed to fetch appointment report",
      error: error.message,
    });
  }
};

/**
 * 💰 Get Financial Summary Report
 */
export const getFinancialSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where = startDate && endDate
      ? {
          createdAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }
      : {};

    const [
      invoiceSummary,
      expenses,
      labRevenue,
      radiologyRevenue,
      pharmacyRevenue,
    ] = await Promise.all([
      prisma.invoice.aggregate({
        where: {
          isActive: true,
          paymentStatus: "PAID",
          ...where,
        },
        _sum: {
          totalAmount: true,
          paidAmount: true,
        },
        _count: true,
      }),
      prisma.expense.aggregate({
        where,
        _sum: {
          amount: true,
        },
        _count: true,
      }),
      prisma.labRequest.aggregate({
        where: {
          isActive: true,
          ...where,
        },
        _sum: {
          price: true,
        },
      }),
      prisma.radiologyRequest.aggregate({
        where: {
          isActive: true,
          ...where,
        },
        _sum: {
          price: true,
        },
      }),
      prisma.pharmacySale.aggregate({
        where: {
          isActive: true,
          ...where,
        },
        _sum: {
          totalAmount: true,
        },
      }),
    ]);

    const totalRevenue = Number(invoiceSummary._sum.paidAmount || 0);
    const totalExpenses = Number(expenses._sum.amount || 0);
    const netProfit = totalRevenue - totalExpenses;

    res.json({
      revenue: {
        total: totalRevenue,
        lab: Number(labRevenue._sum.price || 0),
        radiology: Number(radiologyRevenue._sum.price || 0),
        pharmacy: Number(pharmacyRevenue._sum.totalAmount || 0),
        invoiceCount: invoiceSummary._count,
      },
      expenses: {
        total: totalExpenses,
        count: expenses._count,
      },
      profit: {
        net: netProfit,
        margin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching financial summary:", error);
    res.status(500).json({
      message: "Failed to fetch financial summary",
      error: error.message,
    });
  }
};

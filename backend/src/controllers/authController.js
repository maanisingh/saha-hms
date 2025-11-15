import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Register new user
export const registerUser = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
      gender,
      dateOfBirth,
      address,
      departmentId,
      specialization,
      qualification,
    } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        firstName,
        lastName,
        phone,
        gender: gender || "UNKNOWN",
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        address,
      },
    });

    // Create role-specific records based on user role
    if (role === "DOCTOR" && departmentId) {
      await prisma.doctor.create({
        data: {
          userId: user.id,
          doctorCode: `DOC${String(user.id).padStart(5, "0")}`,
          departmentId: parseInt(departmentId),
          speciality: specialization || null,
          qualifications: qualification || null,
        },
      });
    } else if (role === "NURSE" && departmentId) {
      await prisma.nurse.create({
        data: {
          userId: user.id,
          departmentId: parseInt(departmentId),
        },
      });
    } else if (role === "PHARMACIST" && departmentId) {
      await prisma.pharmacist.create({
        data: {
          userId: user.id,
          departmentId: parseInt(departmentId),
        },
      });
    } else if (role === "PATIENT") {
      await prisma.patient.create({
        data: {
          userId: user.id,
          fatherName: req.body.fatherName || "N/A",
          bloodGroup: req.body.bloodGroup || "O_POSITIVE",
        },
      });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("🔥 Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        doctor: {
          include: {
            department: true,
          },
        },
        nurse: {
          include: {
            department: true,
          },
        },
        pharmacist: {
          include: {
            department: true,
          },
        },
        employee: {
          include: {
            department: true,
          },
        },
        patient: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user.id,
        publicId: user.publicId,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        phone: user.phone,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        doctor: user.doctor,
        nurse: user.nurse,
        pharmacist: user.pharmacist,
        employee: user.employee,
        patient: user.patient,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      displayName,
      phone,
      address,
      gender,
      dateOfBirth,
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        displayName,
        phone,
        address,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      },
      include: {
        doctor: {
          include: {
            department: true,
          },
        },
        nurse: {
          include: {
            department: true,
          },
        },
        pharmacist: {
          include: {
            department: true,
          },
        },
        employee: {
          include: {
            department: true,
          },
        },
        patient: true,
      },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🟢 Login attempt:", { email, password });

    // 1️⃣ Check if user exists with related data
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        doctor: {
          include: {
            department: true,
          },
        },
        nurse: {
          include: {
            department: true,
          },
        },
        pharmacist: {
          include: {
            department: true,
          },
        },
        employee: {
          include: {
            department: true,
          },
        },
        patient: true,
      },
    });

    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(401).json({ message: "Invalid credentials! (User not found)" });
    }

    console.log("✅ User found:", user.email);

    // 2️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🧩 Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch for email:", email);
      return res.status(401).json({ message: "Invalid credentials! (Password mismatch)" });
    }

    // 3️⃣ Determine department and entity ID based on role
    let departmentId = null;
    let entityId = null;

    if (user.doctor) {
      departmentId = user.doctor.departmentId;
      entityId = user.doctor.id;
    } else if (user.nurse) {
      departmentId = user.nurse.departmentId;
      entityId = user.nurse.id;
    } else if (user.pharmacist) {
      departmentId = user.pharmacist.departmentId;
      entityId = user.pharmacist.id;
    } else if (user.employee) {
      departmentId = user.employee.departmentId;
      entityId = user.employee.id;
    } else if (user.patient) {
      entityId = user.patient.id;
    }

    // 4️⃣ Generate token with enhanced payload
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        departmentId: departmentId,
        entityId: entityId,
      },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "7d" }
    );

    console.log("✅ JWT token generated for:", user.email);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        publicId: user.publicId,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        phone: user.phone,
        departmentId: departmentId,
        entityId: entityId,
        doctor: user.doctor ? {
          id: user.doctor.id,
          doctorCode: user.doctor.doctorCode,
          speciality: user.doctor.speciality,
          department: user.doctor.department,
        } : null,
        nurse: user.nurse ? {
          id: user.nurse.id,
          ward: user.nurse.ward,
          department: user.nurse.department,
        } : null,
        pharmacist: user.pharmacist ? {
          id: user.pharmacist.id,
          licenseNo: user.pharmacist.licenseNo,
          department: user.pharmacist.department,
        } : null,
        employee: user.employee ? {
          id: user.employee.id,
          employeeCode: user.employee.employeeCode,
          department: user.employee.department,
        } : null,
        patient: user.patient ? {
          id: user.patient.id,
          mrn: user.patient.mrn,
        } : null,
      },
    });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting comprehensive database seed...");

  // Create Departments first
  console.log("🏢 Creating departments...");
  const departments = [];

  const deptData = [
    { name: "Cardiology", code: "CARD", type: "CLINICAL", description: "Heart and cardiovascular care" },
    { name: "Emergency", code: "ER", type: "CLINICAL", description: "Emergency and trauma care" },
    { name: "Pediatrics", code: "PED", type: "CLINICAL", description: "Children's healthcare" },
    { name: "Radiology", code: "RAD", type: "CLINICAL", description: "Medical imaging" },
    { name: "Laboratory", code: "LAB", type: "CLINICAL", description: "Medical lab services" },
    { name: "Pharmacy", code: "PHAR", type: "SUPPORT", description: "Pharmaceutical services" },
    { name: "Nursing", code: "NURS", type: "CLINICAL", description: "Nursing services" },
    { name: "Administration", code: "ADMIN", type: "ADMIN", description: "Hospital administration" },
  ];

  for (const d of deptData) {
    const dept = await prisma.department.upsert({
      where: { code: d.code },
      update: {},
      create: d,
    });
    departments.push(dept);
  }

  console.log(`✅ Created ${departments.length} departments`);

  // Create Admin
  console.log("👤 Creating admin...");
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@hospital.com" }
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: "admin@hospital.com",
        password: await bcrypt.hash("admin123", 10),
        role: "ADMIN",
        firstName: "Admin",
        lastName: "User",
        displayName: "Hospital Admin",
        phone: "+19990001111",
        gender: "MALE",
      },
    });
  } else {
    await prisma.user.update({
      where: { email: "admin@hospital.com" },
      data: { password: await bcrypt.hash("admin123", 10) }
    });
  }

  // Create Doctors
  console.log("👨‍⚕️ Creating doctors...");
  const doctorData = [
    { email: "dr.smith@hospital.com", firstName: "John", lastName: "Smith", speciality: "Cardiology", deptIdx: 0 },
    { email: "dr.johnson@hospital.com", firstName: "Sarah", lastName: "Johnson", speciality: "Emergency Medicine", deptIdx: 1 },
    { email: "dr.williams@hospital.com", firstName: "Michael", lastName: "Williams", speciality: "Pediatrics", deptIdx: 2 },
  ];

  for (let idx = 0; idx < doctorData.length; idx++) {
    const doc = doctorData[idx];
    let user = await prisma.user.findUnique({ where: { email: doc.email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: doc.email,
          password: await bcrypt.hash("doctor123", 10),
          role: "DOCTOR",
          firstName: doc.firstName,
          lastName: doc.lastName,
          displayName: `Dr. ${doc.firstName} ${doc.lastName}`,
          phone: `+1999000${String(2000 + idx).padStart(4, '0')}`,
          gender: idx % 2 === 0 ? "MALE" : "FEMALE",
        },
      });
    }

    const existingDoctor = await prisma.doctor.findUnique({ where: { userId: user.id } });
    if (!existingDoctor) {
      await prisma.doctor.create({
        data: {
          userId: user.id,
          doctorCode: `DOC${String(user.id).padStart(5, "0")}`,
          departmentId: departments[doc.deptIdx].id,
          speciality: doc.speciality,
          qualifications: "MD, Board Certified",
        },
      });
    }
  }

  console.log("✅ Created 3 doctors");

  // Create Patients
  console.log("🤒 Creating patients...");
  const patientData = [
    { email: "patient1@email.com", firstName: "Alice", lastName: "Anderson", bloodGroup: "A_POSITIVE" },
    { email: "patient2@email.com", firstName: "Bob", lastName: "Baker", bloodGroup: "O_POSITIVE" },
    { email: "patient3@email.com", firstName: "Carol", lastName: "Carter", bloodGroup: "B_POSITIVE" },
  ];

  for (let idx = 0; idx < patientData.length; idx++) {
    const p = patientData[idx];
    let user = await prisma.user.findUnique({ where: { email: p.email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: p.email,
          password: await bcrypt.hash("patient123", 10),
          role: "PATIENT",
          firstName: p.firstName,
          lastName: p.lastName,
          phone: `+1999000${String(3000 + idx).padStart(4, '0')}`,
          gender: idx % 2 === 0 ? "FEMALE" : "MALE",
          dateOfBirth: new Date(1980 + idx * 5, idx * 3, 15),
          address: `${123 + idx * 100} Main Street`,
        },
      });
    }

    const existingPatient = await prisma.patient.findUnique({ where: { userId: user.id } });
    if (!existingPatient) {
      await prisma.patient.create({
        data: {
          userId: user.id,
          mrn: `MRN${String(user.id).padStart(6, "0")}`,
          fatherName: "Father Name",
          bloodGroup: p.bloodGroup,
          height: 165 + idx * 5,
          weight: 60 + idx * 10,
          emergencyName: "Emergency Contact",
          emergencyPhone: `+1888000${String(idx).padStart(4, '0')}`,
        },
      });
    }
  }

  console.log("✅ Created 3 patients");

  // Create Beacons
  console.log("📡 Creating beacons...");
  const beaconData = [
    { code: "BEACON_ER_01", zone: "Emergency Room", building: "Main Building", floor: "Ground Floor" },
    { code: "BEACON_CARD_01", zone: "Cardiology Ward", building: "Main Building", floor: "2nd Floor" },
    { code: "BEACON_PED_01", zone: "Pediatrics Ward", building: "Main Building", floor: "3rd Floor" },
    { code: "BEACON_RAD_01", zone: "Radiology", building: "Main Building", floor: "1st Floor" },
    { code: "BEACON_LAB_01", zone: "Laboratory", building: "Main Building", floor: "1st Floor" },
  ];

  for (const b of beaconData) {
    await prisma.beacon.upsert({
      where: { beaconCode: b.code },
      update: {},
      create: {
        beaconCode: b.code,
        zoneName: b.zone,
        building: b.building,
        floor: b.floor,
        isActive: true,
      },
    });
  }

  console.log("✅ Created 5 beacons");

  console.log("\n✨ Seed completed!");
  console.log("================================================");
  console.log("📝 Login Credentials:");
  console.log("Admin:    admin@hospital.com / admin123");
  console.log("Doctor:   dr.smith@hospital.com / doctor123");
  console.log("Patient:  patient1@email.com / patient123");
  console.log("================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

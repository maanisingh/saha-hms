import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createAppointments() {
  console.log("📅 Creating appointments...");

  const doctors = await prisma.doctor.findMany({ include: { user: true } });
  const patients = await prisma.patient.findMany({ include: { user: true } });

  if (doctors.length === 0 || patients.length === 0) {
    console.log("No doctors or patients found!");
    return;
  }

  // Create 10 appointments
  for (let i = 0; i < 10; i++) {
    const doctor = doctors[i % doctors.length];
    const patient = patients[i % patients.length];
    const daysOffset = Math.floor(Math.random() * 30) - 15;
    const scheduledAt = new Date();
    scheduledAt.setDate(scheduledAt.getDate() + daysOffset);
    scheduledAt.setHours(8 + (i % 8), 0, 0, 0);

    const aptNum = `APT${String(Date.now() + i).slice(-6)}`;

    await prisma.appointment.create({
      data: {
        appointmentNumber: aptNum,
        patientId: patient.id,
        doctorId: doctor.id,
        departmentId: doctor.departmentId,
        scheduledAt,
        durationMins: 30,
        status: daysOffset < 0 ? "COMPLETED" : daysOffset === 0 ? "CONFIRMED" : "SCHEDULED",
        reason: ["General Checkup", "Follow-up", "Consultation"][i % 3],
      },
    });
  }

  console.log("✅ Created 10 appointments");
  await prisma.$disconnect();
}

createAppointments();

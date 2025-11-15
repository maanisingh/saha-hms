import prisma from './src/config/prismaClient.js';

async function createAppointmentsOnly() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║       📅 CREATING DEPARTMENT-LINKED APPOINTMENTS           ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    // Get departments
    const cardiology = await prisma.department.findUnique({ where: { code: 'CARDIO' } });
    const neurology = await prisma.department.findUnique({ where: { code: 'NEURO' } });
    const pediatrics = await prisma.department.findUnique({ where: { code: 'PEDIA' } });

    // Get doctors
    const drSarah = await prisma.user.findUnique({ where: { email: 'drsarah.johnson@hospital.com' } });
    const drMichael = await prisma.user.findUnique({ where: { email: 'drmichael.chen@hospital.com' } });
    const drEmily = await prisma.user.findUnique({ where: { email: 'dremily.rodriguez@hospital.com' } });

    const drSarahDoctor = await prisma.doctor.findUnique({ where: { userId: drSarah.id } });
    const drMichaelDoctor = await prisma.doctor.findUnique({ where: { userId: drMichael.id } });
    const drEmilyDoctor = await prisma.doctor.findUnique({ where: { userId: drEmily.id } });

    // Get patients by email patterns
    const cardioPatients = await prisma.patient.findMany({
      where: { user: { email: { contains: '@cardio.test' } } },
      include: { user: true }
    });

    const neuroPatients = await prisma.patient.findMany({
      where: { user: { email: { contains: '@neuro.test' } } },
      include: { user: true }
    });

    const pediaPatients = await prisma.patient.findMany({
      where: { user: { email: { contains: '@pedia.test' } } },
      include: { user: true }
    });

    console.log(`Found ${cardioPatients.length} cardiology patients`);
    console.log(`Found ${neuroPatients.length} neurology patients`);
    console.log(`Found ${pediaPatients.length} pediatrics patients\n`);

    // Create Cardiology Appointments
    console.log('Creating Cardiology Appointments...');
    for (const patient of cardioPatients) {
      const scheduledAt = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: drSarahDoctor.id,
          departmentId: cardiology.id,
          scheduledAt: scheduledAt,
          reason: `Cardiology consultation for ${patient.user.firstName}`,
          status: 'SCHEDULED',
          notes: `Cardiology checkup - ${patient.medicalHistory}`,
        },
      });
      console.log(`   ✅ ${patient.user.firstName} ${patient.user.lastName} → Dr. Sarah (Cardiology)`);
    }

    // Create Neurology Appointments
    console.log('\nCreating Neurology Appointments...');
    for (const patient of neuroPatients) {
      const scheduledAt = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: drMichaelDoctor.id,
          departmentId: neurology.id,
          scheduledAt: scheduledAt,
          reason: `Neurology consultation for ${patient.user.firstName}`,
          status: 'SCHEDULED',
          notes: `Neurology assessment - ${patient.medicalHistory}`,
        },
      });
      console.log(`   ✅ ${patient.user.firstName} ${patient.user.lastName} → Dr. Michael (Neurology)`);
    }

    // Create Pediatrics Appointments
    console.log('\nCreating Pediatrics Appointments...');
    for (const patient of pediaPatients) {
      const scheduledAt = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: drEmilyDoctor.id,
          departmentId: pediatrics.id,
          scheduledAt: scheduledAt,
          reason: `Pediatric consultation for ${patient.user.firstName}`,
          status: 'SCHEDULED',
          notes: `Pediatric checkup - ${patient.medicalHistory}`,
        },
      });
      console.log(`   ✅ ${patient.user.firstName} ${patient.user.lastName} → Dr. Emily (Pediatrics)`);
    }

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║              ✅ APPOINTMENTS CREATED SUCCESSFULLY          ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    const total = cardioPatients.length + neuroPatients.length + pediaPatients.length;
    console.log(`Total Appointments Created: ${total}\n`);

    console.log('🎯 Now test department isolation:\n');
    console.log('   1. Login as Dr. Sarah → See ONLY Cardiology patients (3)');
    console.log('   2. Login as Dr. Michael → See ONLY Neurology patients (3)');
    console.log('   3. Login as Dr. Emily → See ONLY Pediatrics patients (3)');
    console.log('   4. Login as Admin → See ALL patients\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAppointmentsOnly();

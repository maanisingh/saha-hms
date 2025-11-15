import prisma from './src/config/prismaClient.js';
import bcrypt from 'bcryptjs';

async function populateDepartmentData() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   🏥 POPULATING DEPARTMENT-SPECIFIC TEST DATA             ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    // ═══════════════════════════════════════════════════════════════
    // STEP 1: Create Departments
    // ═══════════════════════════════════════════════════════════════
    console.log('📋 STEP 1: Creating Departments...\n');

    const departments = [
      { name: 'Cardiology', code: 'CARDIO', description: 'Heart and cardiovascular care' },
      { name: 'Neurology', code: 'NEURO', description: 'Nervous system and brain care' },
      { name: 'Pediatrics', code: 'PEDIA', description: 'Children healthcare' },
      { name: 'Emergency', code: 'ER', description: 'Emergency and trauma care' },
      { name: 'ICU', code: 'ICU', description: 'Intensive Care Unit' },
    ];

    const createdDepartments = {};
    for (const dept of departments) {
      const department = await prisma.department.upsert({
        where: { code: dept.code },
        update: dept,
        create: { ...dept, isActive: true },
      });
      createdDepartments[dept.code] = department;
      console.log(`   ✅ ${department.name} (ID: ${department.id})`);
    }

    console.log('\n');

    // ═══════════════════════════════════════════════════════════════
    // STEP 2: Link Doctors to Departments
    // ═══════════════════════════════════════════════════════════════
    console.log('👨‍⚕️ STEP 2: Linking Doctors to Departments...\n');

    // Find existing doctor users
    const drSarah = await prisma.user.findUnique({ where: { email: 'drsarah.johnson@hospital.com' } });
    const drMichael = await prisma.user.findUnique({ where: { email: 'drmichael.chen@hospital.com' } });
    const drEmily = await prisma.user.findUnique({ where: { email: 'dremily.rodriguez@hospital.com' } });

    if (drSarah) {
      // Check if doctor record exists
      const existingDoctor = await prisma.doctor.findUnique({ where: { userId: drSarah.id } });

      if (existingDoctor) {
        // Update existing doctor
        await prisma.doctor.update({
          where: { id: existingDoctor.id },
          data: {
            departmentId: createdDepartments.CARDIO.id,
            speciality: 'Cardiologist',
            qualifications: 'MD, FACC',
            isActive: true,
          },
        });
        console.log(`   ✅ Dr. Sarah Johnson → Cardiology (Updated existing record)`);
      } else {
        // Create new doctor record
        await prisma.doctor.create({
          data: {
            userId: drSarah.id,
            doctorCode: 'DOC-CARDIO-001',
            departmentId: createdDepartments.CARDIO.id,
            speciality: 'Cardiologist',
            qualifications: 'MD, FACC',
            isActive: true,
          },
        });
        console.log(`   ✅ Dr. Sarah Johnson → Cardiology (Created new record)`);
      }
    }

    if (drMichael) {
      const existingDoctor = await prisma.doctor.findUnique({ where: { userId: drMichael.id } });

      if (existingDoctor) {
        await prisma.doctor.update({
          where: { id: existingDoctor.id },
          data: {
            departmentId: createdDepartments.NEURO.id,
            speciality: 'Neurologist',
            qualifications: 'MD, PhD',
            isActive: true,
          },
        });
        console.log(`   ✅ Dr. Michael Chen → Neurology (Updated existing record)`);
      } else {
        await prisma.doctor.create({
          data: {
            userId: drMichael.id,
            doctorCode: 'DOC-NEURO-001',
            departmentId: createdDepartments.NEURO.id,
            speciality: 'Neurologist',
            qualifications: 'MD, PhD',
            isActive: true,
          },
        });
        console.log(`   ✅ Dr. Michael Chen → Neurology (Created new record)`);
      }
    }

    if (drEmily) {
      const existingDoctor = await prisma.doctor.findUnique({ where: { userId: drEmily.id } });

      if (existingDoctor) {
        await prisma.doctor.update({
          where: { id: existingDoctor.id },
          data: {
            departmentId: createdDepartments.PEDIA.id,
            speciality: 'Pediatrician',
            qualifications: 'MD, FAAP',
            isActive: true,
          },
        });
        console.log(`   ✅ Dr. Emily Rodriguez → Pediatrics (Updated existing record)`);
      } else {
        await prisma.doctor.create({
          data: {
            userId: drEmily.id,
            doctorCode: 'DOC-PEDIA-001',
            departmentId: createdDepartments.PEDIA.id,
            speciality: 'Pediatrician',
            qualifications: 'MD, FAAP',
            isActive: true,
          },
        });
        console.log(`   ✅ Dr. Emily Rodriguez → Pediatrics (Created new record)`);
      }
    }

    console.log('\n');

    // ═══════════════════════════════════════════════════════════════
    // STEP 3: Link Nurses to Departments
    // ═══════════════════════════════════════════════════════════════
    console.log('👩‍⚕️ STEP 3: Linking Nurses to Departments...\n');

    const nurseEmma = await prisma.user.findUnique({ where: { email: 'nurseemma.wilson@hospital.com' } });
    const nurseJames = await prisma.user.findUnique({ where: { email: 'nursejames.davis@hospital.com' } });

    if (nurseEmma) {
      const existingNurse = await prisma.nurse.findUnique({ where: { userId: nurseEmma.id } });

      if (existingNurse) {
        await prisma.nurse.update({
          where: { id: existingNurse.id },
          data: {
            departmentId: createdDepartments.ICU.id,
            ward: 'ICU Ward A',
          },
        });
        console.log(`   ✅ Nurse Emma Wilson → ICU (Updated existing record)`);
      } else {
        await prisma.nurse.create({
          data: {
            userId: nurseEmma.id,
            departmentId: createdDepartments.ICU.id,
            ward: 'ICU Ward A',
          },
        });
        console.log(`   ✅ Nurse Emma Wilson → ICU (Created new record)`);
      }
    }

    if (nurseJames) {
      const existingNurse = await prisma.nurse.findUnique({ where: { userId: nurseJames.id } });

      if (existingNurse) {
        await prisma.nurse.update({
          where: { id: existingNurse.id },
          data: {
            departmentId: createdDepartments.ER.id,
            ward: 'Emergency Room',
          },
        });
        console.log(`   ✅ Nurse James Davis → Emergency (Updated existing record)`);
      } else {
        await prisma.nurse.create({
          data: {
            userId: nurseJames.id,
            departmentId: createdDepartments.ER.id,
            ward: 'Emergency Room',
          },
        });
        console.log(`   ✅ Nurse James Davis → Emergency (Created new record)`);
      }
    }

    console.log('\n');

    // ═══════════════════════════════════════════════════════════════
    // STEP 4: Create Department-Specific Patients
    // ═══════════════════════════════════════════════════════════════
    console.log('🧑‍🤝‍🧑 STEP 4: Creating Department-Specific Patients...\n');

    const hashedPassword = await bcrypt.hash('Patient@123', 10);

    // Cardiology Patients
    const cardioPatients = [
      { firstName: 'John', lastName: 'Heart', email: 'john.heart@cardio.test', condition: 'Arrhythmia' },
      { firstName: 'Mary', lastName: 'Cardiac', email: 'mary.cardiac@cardio.test', condition: 'Hypertension' },
      { firstName: 'Robert', lastName: 'Pulse', email: 'robert.pulse@cardio.test', condition: 'Angina' },
    ];

    // Neurology Patients
    const neuroPatients = [
      { firstName: 'Lisa', lastName: 'Brain', email: 'lisa.brain@neuro.test', condition: 'Migraine' },
      { firstName: 'James', lastName: 'Neural', email: 'james.neural@neuro.test', condition: 'Epilepsy' },
      { firstName: 'Anna', lastName: 'Nerve', email: 'anna.nerve@neuro.test', condition: 'MS' },
    ];

    // Pediatrics Patients
    const pediaPatients = [
      { firstName: 'Tommy', lastName: 'Young', email: 'tommy.young@pedia.test', condition: 'Asthma' },
      { firstName: 'Emma', lastName: 'Child', email: 'emma.child@pedia.test', condition: 'Allergies' },
      { firstName: 'Oliver', lastName: 'Kid', email: 'oliver.kid@pedia.test', condition: 'Flu' },
    ];

    const createdPatients = {
      cardio: [],
      neuro: [],
      pedia: [],
    };

    // Create Cardiology Patients
    for (const p of cardioPatients) {
      const patient = await prisma.patient.create({
        data: {
          fatherName: `${p.firstName}'s Father`,
          nationalId: `CARDIO-${Math.random().toString(36).substring(7).toUpperCase()}`,
          bloodGroup: 'O_POSITIVE',
          allergies: 'None',
          medicalHistory: `History of ${p.condition}`,
          currentTreatment: `Treatment for ${p.condition}`,
          status: 'OPD',
          user: {
            create: {
              email: p.email,
              password: hashedPassword,
              role: 'PATIENT',
              firstName: p.firstName,
              lastName: p.lastName,
              phone: `+1555${Math.floor(Math.random() * 10000000)}`,
              gender: 'MALE',
            },
          },
        },
        include: { user: true },
      });
      createdPatients.cardio.push(patient);
      console.log(`   ✅ Cardiology Patient: ${p.firstName} ${p.lastName} (${p.condition})`);
    }

    // Create Neurology Patients
    for (const p of neuroPatients) {
      const patient = await prisma.patient.create({
        data: {
          fatherName: `${p.firstName}'s Father`,
          nationalId: `NEURO-${Math.random().toString(36).substring(7).toUpperCase()}`,
          bloodGroup: 'A_POSITIVE',
          allergies: 'None',
          medicalHistory: `History of ${p.condition}`,
          currentTreatment: `Treatment for ${p.condition}`,
          status: 'OPD',
          user: {
            create: {
              email: p.email,
              password: hashedPassword,
              role: 'PATIENT',
              firstName: p.firstName,
              lastName: p.lastName,
              phone: `+1555${Math.floor(Math.random() * 10000000)}`,
              gender: 'FEMALE',
            },
          },
        },
        include: { user: true },
      });
      createdPatients.neuro.push(patient);
      console.log(`   ✅ Neurology Patient: ${p.firstName} ${p.lastName} (${p.condition})`);
    }

    // Create Pediatrics Patients
    for (const p of pediaPatients) {
      const patient = await prisma.patient.create({
        data: {
          fatherName: `${p.firstName}'s Father`,
          nationalId: `PEDIA-${Math.random().toString(36).substring(7).toUpperCase()}`,
          bloodGroup: 'B_POSITIVE',
          allergies: p.condition === 'Allergies' ? 'Peanuts, Dairy' : 'None',
          medicalHistory: `Child patient with ${p.condition}`,
          currentTreatment: `Pediatric treatment for ${p.condition}`,
          status: 'OPD',
          user: {
            create: {
              email: p.email,
              password: hashedPassword,
              role: 'PATIENT',
              firstName: p.firstName,
              lastName: p.lastName,
              phone: `+1555${Math.floor(Math.random() * 10000000)}`,
              gender: 'MALE',
              dateOfBirth: new Date('2015-01-01'), // Child
            },
          },
        },
        include: { user: true },
      });
      createdPatients.pedia.push(patient);
      console.log(`   ✅ Pediatrics Patient: ${p.firstName} ${p.lastName} (${p.condition})`);
    }

    console.log('\n');

    // ═══════════════════════════════════════════════════════════════
    // STEP 5: Create Appointments (Link Patients to Departments)
    // ═══════════════════════════════════════════════════════════════
    console.log('📅 STEP 5: Creating Appointments (Department Links)...\n');

    const drSarahDoctor = await prisma.doctor.findUnique({ where: { userId: drSarah.id } });
    const drMichaelDoctor = await prisma.doctor.findUnique({ where: { userId: drMichael.id } });
    const drEmilyDoctor = await prisma.doctor.findUnique({ where: { userId: drEmily.id } });

    // Cardiology Appointments
    for (const patient of createdPatients.cardio) {
      const appointmentDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: drSarahDoctor.id,
          departmentId: createdDepartments.CARDIO.id,
          appointmentDate: appointmentDate,
          scheduledAt: appointmentDate,
          reason: `Cardiology consultation for ${patient.user.firstName}`,
          status: 'SCHEDULED',
          notes: 'Regular checkup',
        },
      });
      console.log(`   ✅ Cardiology Appointment: ${patient.user.firstName} ${patient.user.lastName} → Dr. Sarah`);
    }

    // Neurology Appointments
    for (const patient of createdPatients.neuro) {
      const appointmentDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: drMichaelDoctor.id,
          departmentId: createdDepartments.NEURO.id,
          appointmentDate: appointmentDate,
          scheduledAt: appointmentDate,
          reason: `Neurology consultation for ${patient.user.firstName}`,
          status: 'SCHEDULED',
          notes: 'Neurological assessment',
        },
      });
      console.log(`   ✅ Neurology Appointment: ${patient.user.firstName} ${patient.user.lastName} → Dr. Michael`);
    }

    // Pediatrics Appointments
    for (const patient of createdPatients.pedia) {
      const appointmentDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: drEmilyDoctor.id,
          departmentId: createdDepartments.PEDIA.id,
          appointmentDate: appointmentDate,
          scheduledAt: appointmentDate,
          reason: `Pediatric consultation for ${patient.user.firstName}`,
          status: 'SCHEDULED',
          notes: 'Child wellness checkup',
        },
      });
      console.log(`   ✅ Pediatrics Appointment: ${patient.user.firstName} ${patient.user.lastName} → Dr. Emily`);
    }

    console.log('\n');

    // ═══════════════════════════════════════════════════════════════
    // SUMMARY
    // ═══════════════════════════════════════════════════════════════
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                  ✅ DATA POPULATION COMPLETE               ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📊 Summary:\n');
    console.log(`   • Departments Created: ${Object.keys(createdDepartments).length}`);
    console.log(`   • Doctors Linked: 3 (Sarah→Cardio, Michael→Neuro, Emily→Pedia)`);
    console.log(`   • Nurses Linked: 2 (Emma→ICU, James→ER)`);
    console.log(`   • Cardiology Patients: ${createdPatients.cardio.length}`);
    console.log(`   • Neurology Patients: ${createdPatients.neuro.length}`);
    console.log(`   • Pediatrics Patients: ${createdPatients.pedia.length}`);
    console.log(`   • Total Appointments: 9`);
    console.log('\n');

    console.log('🎯 Testing Instructions:\n');
    console.log('   1. Login as Dr. Sarah Johnson → See ONLY Cardiology patients (3)');
    console.log('   2. Login as Dr. Michael Chen → See ONLY Neurology patients (3)');
    console.log('   3. Login as Dr. Emily Rodriguez → See ONLY Pediatrics patients (3)');
    console.log('   4. Login as Admin → See ALL patients (9+)\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

populateDepartmentData();

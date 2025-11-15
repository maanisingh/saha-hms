import prisma from './src/config/prismaClient.js';

async function populateAllDashboardData() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║     🏥 POPULATING ALL DASHBOARD DATA - COMPREHENSIVE      ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    // Get all existing data
    const patients = await prisma.patient.findMany({ include: { user: true } });
    const doctors = await prisma.doctor.findMany({ include: { user: true, department: true } });
    const nurses = await prisma.nurse.findMany({ include: { user: true, department: true } });
    const departments = await prisma.department.findMany();
    const appointments = await prisma.appointment.findMany();

    console.log(`📊 Found: ${patients.length} patients, ${doctors.length} doctors, ${nurses.length} nurses\n`);

    // ========================================
    // 1. CREATE MEDICINES FIRST
    // ========================================
    console.log('💊 Creating Medicines...');

    const medicines = [
      { brandName: 'Paracetamol 500mg', genericName: 'Paracetamol', strength: '500mg', stock: 500, reorderLevel: 100, manufacturer: 'PharmaCo', status: 'IN_STOCK' },
      { brandName: 'Amoxicillin 250mg', genericName: 'Amoxicillin', strength: '250mg', stock: 300, reorderLevel: 50, manufacturer: 'AntiBio Inc', status: 'IN_STOCK' },
      { brandName: 'Ibuprofen 400mg', genericName: 'Ibuprofen', strength: '400mg', stock: 450, reorderLevel: 80, manufacturer: 'PainRelief Ltd', status: 'IN_STOCK' },
      { brandName: 'Aspirin 75mg', genericName: 'Aspirin', strength: '75mg', stock: 600, reorderLevel: 120, manufacturer: 'CardioMed', status: 'IN_STOCK' },
      { brandName: 'Lisinopril 10mg', genericName: 'Lisinopril', strength: '10mg', stock: 200, reorderLevel: 40, manufacturer: 'BPControl', status: 'IN_STOCK' },
      { brandName: 'Metformin 500mg', genericName: 'Metformin', strength: '500mg', stock: 350, reorderLevel: 70, manufacturer: 'DiabetesCare', status: 'IN_STOCK' },
      { brandName: 'Omeprazole 20mg', genericName: 'Omeprazole', strength: '20mg', stock: 280, reorderLevel: 60, manufacturer: 'GastroHealth', status: 'IN_STOCK' },
      { brandName: 'Atorvastatin 20mg', genericName: 'Atorvastatin', strength: '20mg', stock: 150, reorderLevel: 30, manufacturer: 'CholesterolCare', status: 'LOW_STOCK' },
      { brandName: 'Amlodipine 5mg', genericName: 'Amlodipine', strength: '5mg', stock: 400, reorderLevel: 80, manufacturer: 'HeartCare', status: 'IN_STOCK' },
      { brandName: 'Cough Syrup', genericName: 'Dextromethorphan', strength: '100ml', stock: 120, reorderLevel: 25, manufacturer: 'ColdRelief', status: 'IN_STOCK' },
    ];

    const createdMedicines = [];
    for (const med of medicines) {
      const existing = await prisma.medicine.findFirst({ where: { brandName: med.brandName } });
      if (!existing) {
        const created = await prisma.medicine.create({ data: med });
        createdMedicines.push(created);
        console.log(`   ✅ ${med.brandName}`);
      } else {
        createdMedicines.push(existing);
      }
    }

    // ========================================
    // 2. CREATE MEDICAL RECORDS
    // ========================================
    console.log('\n📋 Creating Medical Records...');

    const medicalRecordTemplates = [
      { title: 'Initial Consultation', description: 'Patient presented with chest pain. ECG performed. Diagnosis: Angina. Prescribed medication and advised rest.' },
      { title: 'Follow-up Visit', description: 'Patient shows improvement. Blood pressure normalized. Continue current medication.' },
      { title: 'Routine Checkup', description: 'Annual health screening. All vitals normal. Patient advised to maintain healthy lifestyle.' },
      { title: 'Emergency Visit', description: 'Acute headache and dizziness. MRI scan ordered. Diagnosis: Migraine. Prescribed pain medication.' },
      { title: 'Lab Results Review', description: 'Blood test results reviewed. Cholesterol slightly elevated. Dietary changes recommended.' },
    ];

    let recordCount = 0;
    for (const patient of patients.slice(0, 10)) {
      const template = medicalRecordTemplates[recordCount % medicalRecordTemplates.length];
      await prisma.medicalRecord.create({
        data: {
          patientId: patient.id,
          title: template.title,
          description: template.description,
          attachments: null
        }
      });
      recordCount++;
      console.log(`   ✅ ${template.title} for ${patient.user?.firstName || 'Patient'} ${patient.user?.lastName || ''}`);
    }

    // ========================================
    // 3. CREATE PRESCRIPTIONS WITH ITEMS
    // ========================================
    console.log('\n💊 Creating Prescriptions...');

    for (let i = 0; i < Math.min(appointments.length, 15); i++) {
      const appt = appointments[i];

      // Create prescription
      const prescription = await prisma.prescription.create({
        data: {
          prescriptionNumber: `RX-${String(100000 + i).padStart(6, '0')}`,
          patientId: appt.patientId,
          doctorId: appt.doctorId,
          notes: 'Follow dosage instructions carefully. Complete the full course.',
          isActive: true
        }
      });

      // Add 2-3 medicines to each prescription
      const numMeds = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < numMeds; j++) {
        const medicine = createdMedicines[Math.floor(Math.random() * createdMedicines.length)];
        await prisma.prescriptionItem.create({
          data: {
            prescriptionId: prescription.id,
            medicineId: medicine.id,
            dosage: ['1 tablet', '2 tablets', '1 teaspoon'][Math.floor(Math.random() * 3)],
            quantity: Math.floor(Math.random() * 20) + 10,
            durationDays: [3, 5, 7, 10, 14][Math.floor(Math.random() * 5)],
            instructions: ['After meal', 'Before meal', 'Twice daily', 'Three times daily'][Math.floor(Math.random() * 4)]
          }
        });
      }

      console.log(`   ✅ Prescription ${prescription.prescriptionNumber} with ${numMeds} medicines`);
    }

    // ========================================
    // 4. CREATE LAB TEST TEMPLATES
    // ========================================
    console.log('\n🧪 Creating Lab Test Templates...');

    const labTemplates = [
      { code: 'CBC', name: 'Complete Blood Count', price: 500.00 },
      { code: 'LFT', name: 'Liver Function Test', price: 800.00 },
      { code: 'RFT', name: 'Renal Function Test', price: 750.00 },
      { code: 'LIPID', name: 'Lipid Profile', price: 600.00 },
      { code: 'TSH', name: 'Thyroid Stimulating Hormone', price: 450.00 },
      { code: 'HBA1C', name: 'Glycated Hemoglobin', price: 550.00 },
      { code: 'URINE', name: 'Urine Analysis', price: 300.00 },
      { code: 'ECG', name: 'Electrocardiogram', price: 400.00 },
    ];

    const createdLabTemplates = [];
    for (const template of labTemplates) {
      const existing = await prisma.labTestTemplate.findFirst({ where: { code: template.code } });
      if (!existing) {
        const created = await prisma.labTestTemplate.create({
          data: {
            ...template,
            departmentId: departments[0]?.id
          }
        });
        createdLabTemplates.push(created);
        console.log(`   ✅ ${template.name}`);
      } else {
        createdLabTemplates.push(existing);
      }
    }

    // ========================================
    // 5. CREATE LAB REQUESTS WITH RESULTS
    // ========================================
    console.log('\n🔬 Creating Lab Requests with Results...');

    const testStatuses = ['REQUESTED', 'IN_PROCESS', 'COMPLETED', 'COMPLETED'];
    const resultStatuses = ['NORMAL', 'NORMAL', 'ABNORMAL', 'CRITICAL'];

    for (let i = 0; i < Math.min(patients.length, 10); i++) {
      const patient = patients[i];
      const template = createdLabTemplates[i % createdLabTemplates.length];
      const status = testStatuses[Math.floor(Math.random() * testStatuses.length)];

      const labRequest = await prisma.labRequest.create({
        data: {
          requestNumber: `LAB-${String(1000 + i).padStart(6, '0')}`,
          patientId: patient.id,
          doctorId: doctors[i % doctors.length]?.id,
          templateId: template.id,
          status: status,
          price: template.price,
          paymentStatus: status === 'COMPLETED' ? 'PAID' : 'PENDING',
          requestedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          completedAt: status === 'COMPLETED' ? new Date() : null
        }
      });

      // Create result if completed
      if (status === 'COMPLETED') {
        const resultStatus = resultStatuses[Math.floor(Math.random() * resultStatuses.length)];
        await prisma.labResult.create({
          data: {
            labRequestId: labRequest.id,
            testName: template.name,
            resultSummary: `Test ${template.name} shows ${resultStatus.toLowerCase()} values. ${resultStatus === 'NORMAL' ? 'All parameters within reference range.' : 'Some parameters out of range. Follow-up recommended.'}`,
            status: resultStatus,
            resultedAt: new Date()
          }
        });
      }

      console.log(`   ✅ ${template.name} for ${patient.user?.firstName || 'Patient'} - Status: ${status}`);
    }

    // ========================================
    // 6. CREATE VITALS
    // ========================================
    console.log('\n💓 Creating Patient Vitals...');

    for (let i = 0; i < Math.min(patients.length, 12); i++) {
      const patient = patients[i];

      // Create 2-3 vital records for each patient
      for (let j = 0; j < 2; j++) {
        const temp = 97 + Math.random() * 2; // 97-99°F
        const pulse = 60 + Math.floor(Math.random() * 40); // 60-100 bpm
        const systolic = 110 + Math.floor(Math.random() * 30); // 110-140
        const diastolic = 70 + Math.floor(Math.random() * 20); // 70-90
        const spo2 = 95 + Math.random() * 4; // 95-99%

        await prisma.vital.create({
          data: {
            patientId: patient.id,
            recordedById: doctors[i % doctors.length]?.id,
            temperature: parseFloat(temp.toFixed(1)),
            pulse: pulse,
            bloodPressureSystolic: systolic,
            bloodPressureDiastolic: diastolic,
            respiratoryRate: 12 + Math.floor(Math.random() * 8),
            spo2: parseFloat(spo2.toFixed(1)),
            weight: 50 + Math.floor(Math.random() * 50),
            height: 150 + Math.floor(Math.random() * 40),
            remarks: j === 0 ? 'Routine checkup' : 'Follow-up assessment',
            recordedAt: new Date(Date.now() - j * 24 * 60 * 60 * 1000)
          }
        });
      }
      console.log(`   ✅ Vitals recorded for ${patient.user?.firstName || 'Patient'} ${patient.user?.lastName || ''}`);
    }

    // ========================================
    // 7. CREATE INVOICES WITH PAYMENTS
    // ========================================
    console.log('\n💰 Creating Invoices and Payments...');

    // Invoice for appointments
    for (let i = 0; i < Math.min(appointments.length, 15); i++) {
      const appt = appointments[i];
      const consultationFee = 500 + Math.floor(Math.random() * 1000);
      const paymentStatus = ['PAID', 'PAID', 'PENDING', 'PARTIAL'][Math.floor(Math.random() * 4)];

      const invoice = await prisma.invoice.create({
        data: {
          invoiceNumber: `INV-${String(10000 + i).padStart(6, '0')}`,
          invoiceType: 'CONSULTATION',
          appointmentId: appt.id,
          patientId: appt.patientId,
          totalAmount: consultationFee,
          paidAmount: paymentStatus === 'PAID' ? consultationFee : (paymentStatus === 'PARTIAL' ? consultationFee / 2 : 0),
          paymentMode: 'CASH',
          paymentStatus: paymentStatus,
          issuedAt: appt.scheduledAt
        }
      });

      // Create invoice items
      await prisma.invoiceItem.create({
        data: {
          invoiceId: invoice.id,
          description: 'Doctor Consultation Fee',
          quantity: 1,
          unitPrice: consultationFee,
          total: consultationFee
        }
      });

      // Create payment if paid
      if (paymentStatus === 'PAID' || paymentStatus === 'PARTIAL') {
        await prisma.payment.create({
          data: {
            invoiceId: invoice.id,
            amount: paymentStatus === 'PAID' ? consultationFee : consultationFee / 2,
            paymentMode: ['CASH', 'CARD', 'UPI'][Math.floor(Math.random() * 3)],
            status: 'PAID',
            paidAt: new Date()
          }
        });
      }

      console.log(`   ✅ Invoice ${invoice.invoiceNumber} - ${paymentStatus} - ₹${consultationFee}`);
    }

    // ========================================
    // 8. CREATE RADIOLOGY TEMPLATES & REQUESTS
    // ========================================
    console.log('\n🔍 Creating Radiology Templates and Requests...');

    const radioTemplates = [
      { code: 'XRAY-CHEST', name: 'X-Ray Chest', price: 800.00 },
      { code: 'CT-BRAIN', name: 'CT Scan Brain', price: 3500.00 },
      { code: 'MRI-SPINE', name: 'MRI Spine', price: 6000.00 },
      { code: 'ULTRA-ABD', name: 'Ultrasound Abdomen', price: 1200.00 },
    ];

    const createdRadioTemplates = [];
    for (const template of radioTemplates) {
      const existing = await prisma.radiologyTemplate.findFirst({ where: { code: template.code } });
      if (!existing) {
        const created = await prisma.radiologyTemplate.create({
          data: {
            ...template,
            departmentId: departments[0]?.id
          }
        });
        createdRadioTemplates.push(created);
        console.log(`   ✅ ${template.name}`);
      } else {
        createdRadioTemplates.push(existing);
      }
    }

    // Create radiology requests
    for (let i = 0; i < 6; i++) {
      const patient = patients[i];
      const template = createdRadioTemplates[i % createdRadioTemplates.length];
      const status = ['REQUESTED', 'IN_PROCESS', 'COMPLETED'][Math.floor(Math.random() * 3)];

      await prisma.radiologyRequest.create({
        data: {
          requestNumber: `RAD-${String(2000 + i).padStart(6, '0')}`,
          patientId: patient.id,
          doctorId: doctors[i % doctors.length]?.id,
          templateId: template.id,
          status: status,
          price: template.price,
          paymentStatus: status === 'COMPLETED' ? 'PAID' : 'PENDING',
          requestedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000),
          completedAt: status === 'COMPLETED' ? new Date() : null,
          findings: status === 'COMPLETED' ? 'Examination shows normal findings. No abnormalities detected.' : null
        }
      });

      console.log(`   ✅ ${template.name} for ${patient.user?.firstName || 'Patient'} - ${status}`);
    }

    // ========================================
    // 9. CREATE NURSE NOTES & MEDICATION LOGS
    // ========================================
    console.log('\n👨‍⚕️ Creating Nurse Notes and Medication Logs...');

    if (nurses.length > 0) {
      const nurse = nurses[0];

      for (let i = 0; i < 8; i++) {
        const patient = patients[i];

        // Create nurse note
        await prisma.nurseNote.create({
          data: {
            nurseId: nurse.id,
            patientId: patient.id,
            note: `Patient vitals stable. Medication administered as prescribed. No adverse reactions observed. Patient resting comfortably.`
          }
        });

        // Create medication log
        await prisma.medicationLog.create({
          data: {
            nurseId: nurse.id,
            patientId: patient.id,
            medicineId: createdMedicines[i % createdMedicines.length].id,
            dosage: '1 tablet',
            notes: 'Medication administered after meal. Patient tolerated well.'
          }
        });

        console.log(`   ✅ Nurse notes & medication log for ${patient.user?.firstName || 'Patient'}`);
      }
    }

    // ========================================
    // 10. CREATE FOLLOW-UPS
    // ========================================
    console.log('\n📅 Creating Follow-ups...');

    for (let i = 0; i < 10; i++) {
      const patient = patients[i];
      const doctor = doctors[i % doctors.length];
      const appt = appointments[i];

      await prisma.followUp.create({
        data: {
          patientId: patient.id,
          doctorId: doctor?.id,
          appointmentId: appt?.id,
          followUpDate: new Date(Date.now() + (7 + Math.floor(Math.random() * 14)) * 24 * 60 * 60 * 1000),
          purpose: ['REVIEW', 'LAB_RESULT', 'FOLLOW_CHECKUP'][Math.floor(Math.random() * 3)],
          status: 'SCHEDULED',
          notes: 'Follow-up appointment scheduled for review of treatment progress.'
        }
      });

      console.log(`   ✅ Follow-up for ${patient.user?.firstName || 'Patient'} with Dr. ${doctor?.user?.firstName || 'Doctor'}`);
    }

    // ========================================
    // FINAL SUMMARY
    // ========================================
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║              ✅ ALL DASHBOARD DATA POPULATED               ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    const finalCounts = {
      medicines: await prisma.medicine.count(),
      medicalRecords: await prisma.medicalRecord.count(),
      prescriptions: await prisma.prescription.count(),
      prescriptionItems: await prisma.prescriptionItem.count(),
      labTemplates: await prisma.labTestTemplate.count(),
      labRequests: await prisma.labRequest.count(),
      labResults: await prisma.labResult.count(),
      vitals: await prisma.vital.count(),
      invoices: await prisma.invoice.count(),
      payments: await prisma.payment.count(),
      radioTemplates: await prisma.radiologyTemplate.count(),
      radioRequests: await prisma.radiologyRequest.count(),
      nurseNotes: await prisma.nurseNote.count(),
      medicationLogs: await prisma.medicationLog.count(),
      followUps: await prisma.followUp.count()
    };

    console.log('📊 FINAL DATABASE COUNTS:');
    console.log('─────────────────────────────────────────────────────────────');
    Object.entries(finalCounts).forEach(([key, value]) => {
      console.log(`   ${key.padEnd(25)}: ${value}`);
    });
    console.log('');

    console.log('🎯 Now all dashboards should have visible data:');
    console.log('   ✅ Patients Dashboard - Medical records, vitals');
    console.log('   ✅ Appointments Dashboard - Full schedule');
    console.log('   ✅ Prescriptions Dashboard - Medicines and dosages');
    console.log('   ✅ Lab Tests Dashboard - Requests and results');
    console.log('   ✅ Radiology Dashboard - Imaging requests');
    console.log('   ✅ Billing Dashboard - Invoices and payments');
    console.log('   ✅ Pharmacy Dashboard - Medicine inventory');
    console.log('   ✅ Nursing Dashboard - Notes and medication logs');
    console.log('   ✅ Follow-ups Dashboard - Scheduled follow-ups\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

populateAllDashboardData();

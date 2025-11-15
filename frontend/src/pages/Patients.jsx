
// import { useState } from "react";
// import { Users, Plus, Search, Edit2, Eye, Trash2 } from "../lib/icons";
// import { Button } from "../components/common/Button";
// import { DataTable } from "../components/common/DataTable";
// import { Modal } from "../components/common/Modal";
// import { PatientRegistrationForm } from "../components/forms/PatientRegistrationForm";


// const INITIAL_PATIENTS = [
//   {
//     id: 101,
//     upid: "UPID10001",
//     firstName: "Aarav",
//     lastName: "Sharma",
//     fatherName: "Rajesh Sharma",
//     dateOfBirth: "1995-05-15",
//     gender: "MALE",
//     phone: "9876543210",
//     email: "aarav.s@example.com",
//     address: "B-20, Green Park, Delhi",
//     bloodGroup: "O+",
//     height: 175,
//     weight: 78,
//     nationalId: "IN9505151234",
//     currentTreatment: "Hypertension medication",
//     medicalHistory: "Childhood asthma, no current issues.",
//     allergies: "Penicillin",
//     insuranceProvider: "LifeCover India",
//     insurancePolicyNumber: "LCI98765",
//     emergencyContactName: "Priya Sharma",
//     emergencyContactPhone: "9876543211",
//     status: "OPD",
//   },
//   {
//     id: 102,
//     upid: "UPID10002",
//     firstName: "Diya",
//     lastName: "Verma",
//     fatherName: "Sanjay Verma",
//     dateOfBirth: "1988-11-20",
//     gender: "FEMALE",
//     phone: "9123456789",
//     email: "diya.v@example.com",
//     address: "45, Silver Heights, Mumbai",
//     bloodGroup: "A-",
//     height: 162,
//     weight: 65,
//     nationalId: "IN8811205678",
//     currentTreatment: "Post-surgery follow-up",
//     medicalHistory: "Appendectomy (2020)",
//     allergies: "None",
//     insuranceProvider: "HealthPlus",
//     insurancePolicyNumber: "HP234567",
//     emergencyContactName: "Rohan Verma",
//     emergencyContactPhone: "9123456790",
//     status: "IPD",
//   },
// ];

// /* -------------------- HELPER -------------------- */
// const normalizePatientKeys = (patient) => ({
//   ...patient,
//   firstName: patient.firstName || patient.first_name,
//   lastName: patient.lastName || patient.last_name,
//   fatherName: patient.fatherName || patient.father_name,
//   dateOfBirth: patient.dateOfBirth || patient.date_of_birth,
//   bloodGroup: patient.bloodGroup || patient.blood_group,
//   nationalId: patient.nationalId || patient.national_id,
//   currentTreatment: patient.currentTreatment || patient.current_treatment,
//   medicalHistory: patient.medicalHistory || patient.medical_history,
//   insuranceProvider: patient.insuranceProvider || patient.insurance_provider,
//   insurancePolicyNumber: patient.insurancePolicyNumber || patient.insurance_policy_number,
//   emergencyContactName: patient.emergencyContactName || patient.emergency_contact_name,
//   emergencyContactPhone: patient.emergencyContactPhone || patient.emergency_contact_phone,
//   id: patient.id || Date.now(),
//   upid: patient.upid || "UPID" + Date.now(),
//   status: patient.status || "OPD",
// });

// export function Patients() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [patients, setPatients] = useState(INITIAL_PATIENTS);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [viewModalOpen, setViewModalOpen] = useState(false);

//   const calculateAge = (dob) => {
//     if (!dob) return "-";
//     const today = new Date();
//     const [year, month, day] = dob.split("-").map(Number);
//     let age = today.getFullYear() - year;
//     if (
//       today.getMonth() + 1 < month ||
//       (today.getMonth() + 1 === month && today.getDate() < day)
//     )
//       age--;
//     return age;
//   };

//   const handleRegisterSuccess = (newPatient) => {
//     const normalized = normalizePatientKeys(newPatient);
//     if (selectedPatient) {
//       setPatients((prev) =>
//         prev.map((p) => (p.id === selectedPatient.id ? { ...p, ...normalized } : p))
//       );
//     } else {
//       setPatients((prev) => [normalized, ...prev]);
//     }
//     setSelectedPatient(null);
//     setIsModalOpen(false);
//   };

//   const handleDeletePatient = (id) => {
//     if (window.confirm("Are you sure you want to delete this patient?")) {
//       setPatients((prev) => prev.filter((p) => p.id !== id));
//     }
//   };

//   const filteredPatients = patients.filter(
//     (p) =>
//       searchQuery === "" ||
//       p.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.fatherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.upid?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.phone?.includes(searchQuery)
//   );

//   return (
//     <div className="space-y-6 mb-10">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10">
//         <div>
//           <h1 className="text-3xl font-display font-bold text-gray-900">Patients</h1>
//           <p className="text-gray-600 mt-1">Manage patient records and information</p>
//         </div>
//         <Button
//           onClick={() => {
//             setSelectedPatient(null);
//             setIsModalOpen(true);
//           }}
//           icon={Plus}
//           className="w-full sm:w-auto"
//         >
//           Register New Patient
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {[
//           { label: "Total Patients", value: patients.length, color: "blue" },
//           { label: "OPD Patients", value: patients.filter((p) => p.status === "OPD").length, color: "green" },
//           { label: "IPD Patients", value: patients.filter((p) => p.status === "IPD").length, color: "orange" },
//         ].map((stat, i) => (
//           <div
//             key={i}
//             className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//               </div>
//               <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
//                 <Users className={`w-6 h-6 text-${stat.color}-600`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search + Table */}
//       <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100 overflow-x-auto">
//         <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//           <div className="relative w-full sm:w-1/2">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search patients by name, UPID, or phone..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {filteredPatients.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">
//             No patients found. Register a new one!
//           </p>
//         ) : (
//           <div className="overflow-x-auto">
//             <DataTable
//               data={filteredPatients}
//               columns={[
//                 { header: "UPID", accessor: "upid" },
//                 { header: "Name", accessor: (r) => `${r.firstName} ${r.lastName}` },
//                 { header: "Father's Name", accessor: "fatherName" },
//                 { header: "Age", accessor: (r) => calculateAge(r.dateOfBirth) },
//                 { header: "Gender", accessor: "gender" },
//                 { header: "Phone", accessor: "phone" },
//                 {
//                   header: "Status",
//                   accessor: (r) => (
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         r.status === "OPD"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-gray-100 text-gray-700"
//                       }`}
//                     >
//                       {r.status}
//                     </span>
//                   ),
//                 },
//                 {
//                   header: "Actions",
//                   accessor: (r) => (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => {
//                           setSelectedPatient(r);
//                           setViewModalOpen(true);
//                         }}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                         title="View"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedPatient(r);
//                           setIsModalOpen(true);
//                         }}
//                         className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//                         title="Edit"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeletePatient(r.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ),
//                 },
//               ]}
//             />
//           </div>
//         )}
//       </div>

//       {/* Register/Edit Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedPatient(null);
//         }}
//         title={selectedPatient ? "Edit Patient" : "Register New Patient"}
//       >
//         <PatientRegistrationForm
//           patient={selectedPatient ? normalizePatientKeys(selectedPatient) : null}
//           onSuccess={handleRegisterSuccess}
//         />
//       </Modal>

//       {/* View Modal */}
//       <Modal
//         isOpen={viewModalOpen}
//         onClose={() => {
//           setViewModalOpen(false);
//           setSelectedPatient(null);
//         }}
//         title="Patient Details"
//       >
//         {selectedPatient && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
//             <p><strong>UPID:</strong> {selectedPatient.upid}</p>
//             <p><strong>First Name:</strong> {selectedPatient.firstName}</p>
//             <p><strong>Last Name:</strong> {selectedPatient.lastName}</p>
//             <p><strong>Father's Name:</strong> {selectedPatient.fatherName || "—"}</p>
//             <p><strong>Date of Birth:</strong> {selectedPatient.dateOfBirth}</p>
//             <p><strong>Age:</strong> {calculateAge(selectedPatient.dateOfBirth)}</p>
//             <p><strong>Gender:</strong> {selectedPatient.gender}</p>
//             <p><strong>Phone:</strong> {selectedPatient.phone}</p>
//             <p><strong>Email:</strong> {selectedPatient.email || "—"}</p>
//             <p><strong>Address:</strong> {selectedPatient.address || "—"}</p>
//             <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup || "—"}</p>
//             <p><strong>Height:</strong> {selectedPatient.height || "—"} cm</p>
//             <p><strong>Weight:</strong> {selectedPatient.weight || "—"} kg</p>
//             <p><strong>Current Treatment:</strong> {selectedPatient.currentTreatment || "—"}</p>
//             <p><strong>Medical History:</strong> {selectedPatient.medicalHistory || "—"}</p>
//             <p><strong>Allergies:</strong> {selectedPatient.allergies || "—"}</p>
//             <p><strong>National ID:</strong> {selectedPatient.nationalId || "—"}</p>
//             <p><strong>Insurance Provider:</strong> {selectedPatient.insuranceProvider || "—"}</p>
//             <p><strong>Policy Number:</strong> {selectedPatient.insurancePolicyNumber || "—"}</p>
//             <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContactName || "—"}</p>
//             <p><strong>Emergency Phone:</strong> {selectedPatient.emergencyContactPhone || "—"}</p>
//             <p><strong>Status:</strong> {selectedPatient.status}</p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }



// import { useState } from "react";
// import { Users, Plus, Search, Edit2, Eye, Trash2 } from "../lib/icons";
// import { Button } from "../components/common/Button";
// import { DataTable } from "../components/common/DataTable";
// import { Modal } from "../components/common/Modal";
// import { PatientRegistrationForm } from "../components/forms/PatientRegistrationForm";

// // 💡 Initial Demo Data (camelCase keys)
// const INITIAL_PATIENTS = [
//   {
//     id: 101,
//     upid: "UPID10001",
//     firstName: "Aarav",
//     lastName: "Sharma",
//     fatherName: "Rajesh Sharma",
//     dateOfBirth: "1995-05-15",
//     gender: "MALE",
//     phone: "9876543210",
//     email: "aarav.s@example.com",
//     address: "B-20, Green Park, Delhi",
//     bloodGroup: "O+",
//     height: 175,
//     weight: 78,
//     nationalId: "IN9505151234",
//     currentTreatment: "Hypertension medication",
//     medicalHistory: "Childhood asthma, no current issues.",
//     allergies: "Penicillin",
//     insuranceProvider: "LifeCover India",
//     insurancePolicyNumber: "LCI98765",
//     emergencyContactName: "Priya Sharma",
//     emergencyContactPhone: "9876543211",
//     status: "OPD",
//   },
//   {
//     id: 102,
//     upid: "UPID10002",
//     firstName: "Diya",
//     lastName: "Verma",
//     fatherName: "Sanjay Verma",
//     dateOfBirth: "1988-11-20",
//     gender: "FEMALE",
//     phone: "9123456789",
//     email: "diya.v@example.com",
//     address: "45, Silver Heights, Mumbai",
//     bloodGroup: "A-",
//     height: 162,
//     weight: 65,
//     nationalId: "IN8811205678",
//     currentTreatment: "Post-surgery follow-up",
//     medicalHistory: "Appendectomy (2020)",
//     allergies: "None",
//     insuranceProvider: "HealthPlus",
//     insurancePolicyNumber: "HP234567",
//     emergencyContactName: "Rohan Verma",
//     emergencyContactPhone: "9123456790",
//     status: "IPD",
//   },
//   {
//     id: 103,
//     upid: "UPID10003",
//     firstName: "Kabir",
//     lastName: "Singh",
//     fatherName: "Vikram Singh",
//     dateOfBirth: "2010-02-01",
//     gender: "MALE",
//     phone: "8000112233",
//     email: "kabir.s@example.com",
//     address: "F-10, Gold Apartments, Bangalore",
//     bloodGroup: "B+",
//     height: 140,
//     weight: 35,
//     nationalId: "IN1002019012",
//     currentTreatment: "Annual check-up",
//     medicalHistory: "Standard childhood vaccinations.",
//     allergies: "Dust",
//     insuranceProvider: "CareMax",
//     insurancePolicyNumber: "CM789012",
//     emergencyContactName: "Neha Singh (Mother)",
//     emergencyContactPhone: "8000112234",
//     status: "OPD",
//   },
// ];

// // 💡 Normalize keys (snake_case → camelCase)
// const normalizePatientKeys = (patient) => {
//   if (!patient) return {};
//   return {
//     ...patient,
//     firstName: patient.firstName || patient.first_name,
//     lastName: patient.lastName || patient.last_name,
//     fatherName: patient.fatherName || patient.father_name,
//     dateOfBirth: patient.dateOfBirth || patient.date_of_birth,
//     bloodGroup: patient.bloodGroup || patient.blood_group,
//     nationalId: patient.nationalId || patient.national_id,
//     currentTreatment: patient.currentTreatment || patient.current_treatment,
//     medicalHistory: patient.medicalHistory || patient.medical_history,
//     insuranceProvider: patient.insuranceProvider || patient.insurance_provider,
//     insurancePolicyNumber: patient.insurancePolicyNumber || patient.insurance_policy_number,
//     emergencyContactName: patient.emergencyContactName || patient.emergency_contact_name,
//     emergencyContactPhone: patient.emergencyContactPhone || patient.emergency_contact_phone,
//     id: patient.id || Date.now(),
//     upid: patient.upid || ("UPID" + Date.now()),
//     status: patient.status || "OPD",
//   };
// };

// export function Patients() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [patients, setPatients] = useState(INITIAL_PATIENTS);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [viewModalOpen, setViewModalOpen] = useState(false);

//   // ✅ Calculate Age (timezone-safe)
//   const calculateAge = (dob) => {
//     if (!dob) return "-";
//     const today = new Date();
//     const [y, m, d] = dob.split("-").map(Number);
//     let age = today.getFullYear() - y;
//     const currentMonth = today.getMonth() + 1;
//     const currentDay = today.getDate();
//     if (currentMonth < m || (currentMonth === m && currentDay < d)) age--;
//     return age;
//   };

//   // ✅ On Patient Registration Success
//   const handleRegisterSuccess = (newPatient) => {
//     const normalized = normalizePatientKeys(newPatient);
//     if (selectedPatient) {
//       setPatients((prev) =>
//         prev.map((p) => (p.id === selectedPatient.id ? { ...p, ...normalized } : p))
//       );
//     } else {
//       setPatients((prev) => [normalized, ...prev]);
//     }
//     setSelectedPatient(null);
//     setIsModalOpen(false);
//   };

//   // 🗑️ Delete Patient
//   const handleDeletePatient = (id) => {
//     if (window.confirm("Are you sure you want to delete this patient?")) {
//       setPatients((prev) => prev.filter((p) => p.id !== id));
//     }
//   };

//   // ✅ Filter Search
//   const filteredPatients = patients.filter(
//     (p) =>
//       searchQuery === "" ||
//       p.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.fatherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.upid?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.phone?.includes(searchQuery)
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="mt-10">
//           <h1 className="text-3xl font-display font-bold text-gray-900">Patients</h1>
//           <p className="text-gray-600 mt-1">Manage patient records and information</p>
//         </div>
//         <Button
//           onClick={() => {
//             setSelectedPatient(null);
//             setIsModalOpen(true);
//           }}
//           icon={Plus}
//         >
//           Register New Patient
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[
//           { label: "Total Patients", value: patients.length, color: "blue" },
//           { label: "OPD Patients", value: patients.filter((p) => p.status === "OPD").length, color: "green" },
//           { label: "IPD Patients", value: patients.filter((p) => p.status === "IPD").length, color: "orange" },
//         ].map((stat, i) => (
//           <div
//             key={i}
//             className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//               </div>
//               <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
//                 <Users className={`w-6 h-6 text-${stat.color}-600`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search + Table */}
//       <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100">
//         <div className="flex items-center gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by name, UPID, or phone..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {filteredPatients.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">
//             No patients found. Register a new one!
//           </p>
//         ) : (
//           <DataTable
//             data={filteredPatients}
//             columns={[
//               { header: "UPID", accessor: "upid" },
//               { header: "Name", accessor: (r) => `${r.firstName} ${r.lastName}` },
//               { header: "Father's Name", accessor: "fatherName" },
//               { header: "Age", accessor: (r) => calculateAge(r.dateOfBirth) },
//               { header: "Gender", accessor: "gender" },
//               { header: "Phone", accessor: "phone" },
//               {
//                 header: "Status",
//                 accessor: (row) => {
//                   let color = "bg-gray-100 text-gray-700";
//                   if (row.status === "OPD") color = "bg-green-100 text-green-700";
//                   else if (row.status === "IPD") color = "bg-orange-100 text-orange-700";
//                   else if (row.status === "Emergency") color = "bg-red-100 text-red-700";
//                   else if (row.status === "Discharged") color = "bg-blue-100 text-blue-700";
//                   else if (row.status === "Cancelled") color = "bg-gray-200 text-gray-600";
//                   return (
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
//                       {row.status}
//                     </span>
//                   );
//                 },
//               },
//               {
//                 header: "Actions",
//                 accessor: (row) => (
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => {
//                         setSelectedPatient(row);
//                         setViewModalOpen(true);
//                       }}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                       title="View"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>

//                     <button
//                       onClick={() => {
//                         setSelectedPatient(row);
//                         setIsModalOpen(true);
//                       }}
//                       className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                       title="Edit"
//                     >
//                       <Edit2 className="w-4 h-4" />
//                     </button>

//                     <button
//                       onClick={() => handleDeletePatient(row.id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ),
//               },
//             ]}
//           />
//         )}
//       </div>

//       {/* Register/Edit Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedPatient(null);
//         }}
//         title={selectedPatient ? "Edit Patient" : "Register New Patient"}
//       >
//         <PatientRegistrationForm
//           patient={selectedPatient ? normalizePatientKeys(selectedPatient) : null}
//           onSuccess={handleRegisterSuccess}
//         />
//       </Modal>

//       {/* View Modal */}
//       <Modal
//         isOpen={viewModalOpen}
//         onClose={() => {
//           setViewModalOpen(false);
//           setSelectedPatient(null);
//         }}
//         title="Patient Details"
//       >
//         {selectedPatient && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
//             <p><strong>UPID:</strong> {selectedPatient.upid}</p>
//             <p><strong>First Name:</strong> {selectedPatient.firstName}</p>
//             <p><strong>Last Name:</strong> {selectedPatient.lastName}</p>
//             <p><strong>Father's Name:</strong> {selectedPatient.fatherName || "—"}</p>
//             <p><strong>DOB:</strong> {selectedPatient.dateOfBirth}</p>
//             <p><strong>Age:</strong> {calculateAge(selectedPatient.dateOfBirth)}</p>
//             <p><strong>Gender:</strong> {selectedPatient.gender}</p>
//             <p><strong>Phone:</strong> {selectedPatient.phone}</p>
//             <p><strong>Email:</strong> {selectedPatient.email || "—"}</p>
//             <p><strong>Address:</strong> {selectedPatient.address || "—"}</p>
//             <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup || "—"}</p>
//             <p><strong>Height:</strong> {selectedPatient.height || "—"} cm</p>
//             <p><strong>Weight:</strong> {selectedPatient.weight || "—"} kg</p>
//             <p><strong>Current Treatment:</strong> {selectedPatient.currentTreatment || "—"}</p>
//             <p><strong>Allergies:</strong> {selectedPatient.allergies || "—"}</p>
//             <p><strong>Medical History:</strong> {selectedPatient.medicalHistory || "—"}</p>
//             <p><strong>National ID:</strong> {selectedPatient.nationalId || "—"}</p>
//             <p><strong>Insurance Provider:</strong> {selectedPatient.insuranceProvider || "—"}</p>
//             <p><strong>Policy Number:</strong> {selectedPatient.insurancePolicyNumber || "—"}</p>
//             <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContactName || "—"}</p>
//             <p><strong>Emergency Phone:</strong> {selectedPatient.emergencyContactPhone || "—"}</p>
//             <p><strong>Status:</strong> {selectedPatient.status}</p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }




// import { useState } from "react";
// import { Users, Plus, Search, Edit2, Eye, Trash2 } from "../lib/icons";
// import { Button } from "../components/common/Button";
// import { DataTable } from "../components/common/DataTable";
// import { Modal } from "../components/common/Modal";
// import { PatientRegistrationForm } from "../components/forms/PatientRegistrationForm";

// // Demo Patient Data
// const INITIAL_PATIENTS = [
//   {
//     id: 101,
//     upid: "UPID10001",
//     firstName: "Aarav",
//     lastName: "Sharma",
//     fatherName: "Rajesh Sharma",
//     dateOfBirth: "1995-05-15",
//     gender: "MALE",
//     phone: "9876543210",
//     email: "aarav.s@example.com",
//     address: "B-20, Green Park, Delhi",
//     bloodGroup: "O+",
//     height: 175,
//     weight: 78,
//     nationalId: "IN9505151234",
//     currentTreatment: "Hypertension medication",
//     medicalHistory: "Childhood asthma, no current issues.",
//     allergies: "Penicillin",
//     insuranceProvider: "LifeCover India",
//     insurancePolicyNumber: "LCI98765",
//     emergencyContactName: "Priya Sharma",
//     emergencyContactPhone: "9876543211",
//     status: "OPD",
//   },
//   {
//     id: 102,
//     upid: "UPID10002",
//     firstName: "Diya",
//     lastName: "Verma",
//     fatherName: "Sanjay Verma",
//     dateOfBirth: "1988-11-20",
//     gender: "FEMALE",
//     phone: "9123456789",
//     email: "diya.v@example.com",
//     address: "45, Silver Heights, Mumbai",
//     bloodGroup: "A-",
//     height: 162,
//     weight: 65,
//     nationalId: "IN8811205678",
//     currentTreatment: "Post-surgery follow-up",
//     medicalHistory: "Appendectomy (2020)",
//     allergies: "None",
//     insuranceProvider: "HealthPlus",
//     insurancePolicyNumber: "HP234567",
//     emergencyContactName: "Rohan Verma",
//     emergencyContactPhone: "9123456790",
//     status: "IPD",
//   },
// ];

// const normalizePatientKeys = (p) => ({
//   ...p,
//   firstName: p.firstName || p.first_name,
//   lastName: p.lastName || p.last_name,
//   fatherName: p.fatherName || p.father_name,
//   dateOfBirth: p.dateOfBirth || p.date_of_birth,
//   bloodGroup: p.bloodGroup || p.blood_group,
//   nationalId: p.nationalId || p.national_id,
//   currentTreatment: p.currentTreatment || p.current_treatment,
//   medicalHistory: p.medicalHistory || p.medical_history,
//   insuranceProvider: p.insuranceProvider || p.insurance_provider,
//   insurancePolicyNumber: p.insurancePolicyNumber || p.insurance_policy_number,
//   emergencyContactName: p.emergencyContactName || p.emergency_contact_name,
//   emergencyContactPhone: p.emergencyContactPhone || p.emergency_contact_phone,
//   id: p.id || Date.now(),
//   upid: p.upid || ("UPID" + Date.now()),
//   status: p.status || "OPD",
// });

// export function Patients() {
//   const [patients, setPatients] = useState(INITIAL_PATIENTS);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [viewModalOpen, setViewModalOpen] = useState(false);

//   const calculateAge = (dob) => {
//     if (!dob) return "-";
//     const today = new Date();
//     const birth = new Date(dob);
//     let age = today.getFullYear() - birth.getFullYear();
//     const m = today.getMonth() - birth.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
//     return age;
//   };

//   const handleRegisterSuccess = (newPatient) => {
//     const normalized = normalizePatientKeys(newPatient);
//     if (selectedPatient) {
//       setPatients((prev) =>
//         prev.map((p) => (p.id === selectedPatient.id ? { ...p, ...normalized } : p))
//       );
//     } else {
//       setPatients((prev) => [normalized, ...prev]);
//     }
//     setSelectedPatient(null);
//     setIsModalOpen(false);
//   };

//   const handleDeletePatient = (id) => {
//     if (window.confirm("Are you sure you want to delete this patient?")) {
//       setPatients((prev) => prev.filter((p) => p.id !== id));
//     }
//   };

//   const filteredPatients = patients.filter(
//     (p) =>
//       p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.phone.includes(searchQuery) ||
//       p.upid.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between gap-3 mt-10">
//         <div>
//           <h1 className="text-3xl font-display font-bold text-gray-900">Patients</h1>
//           <p className="text-gray-600 mt-1">Manage patient records and information</p>
//         </div>
//         <Button
//           icon={Plus}
//           onClick={() => {
//             setSelectedPatient(null);
//             setIsModalOpen(true);
//           }}
//         >
//           Register New Patient
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {[
//           { label: "Total Patients", value: patients.length, color: "blue" },
//           { label: "OPD Patients", value: patients.filter((p) => p.status === "OPD").length, color: "green" },
//           { label: "IPD Patients", value: patients.filter((p) => p.status === "IPD").length, color: "orange" },
//         ].map((stat, i) => (
//           <div
//             key={i}
//             className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-5 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//               </div>
//               <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
//                 <Users className={`w-6 h-6 text-${stat.color}-600`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search + Table */}
//       <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100">
//         <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
//           <div className="w-full sm:w-1/2 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by name, UPID, or phone..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {filteredPatients.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">No patients found. Register a new one!</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <DataTable
//               data={filteredPatients}
//               columns={[
//                 { header: "UPID", accessor: "upid" },
//                 { header: "Name", accessor: (r) => `${r.firstName} ${r.lastName}` },
//                 { header: "Phone", accessor: "phone" },
//                 { header: "Age", accessor: (r) => calculateAge(r.dateOfBirth) },
//                 { header: "Gender", accessor: "gender" },
//                 {
//                   header: "Status",
//                   accessor: (r) => {
//                     let color = "bg-gray-100 text-gray-700";
//                     if (r.status === "OPD") color = "bg-green-100 text-green-700";
//                     else if (r.status === "IPD") color = "bg-orange-100 text-orange-700";
//                     return (
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
//                         {r.status}
//                       </span>
//                     );
//                   },
//                 },
//                 {
//                   header: "Actions",
//                   accessor: (r) => (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => {
//                           setSelectedPatient(r);
//                           setViewModalOpen(true);
//                         }}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedPatient(r);
//                           setIsModalOpen(true);
//                         }}
//                         className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeletePatient(r.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ),
//                 },
//               ]}
//             />
//           </div>
//         )}
//       </div>

//       {/* Register/Edit Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedPatient(null);
//         }}
//         title={selectedPatient ? "Edit Patient" : "Register New Patient"}
//       >
//         <PatientRegistrationForm
//           patient={selectedPatient ? normalizePatientKeys(selectedPatient) : null}
//           onSuccess={handleRegisterSuccess}
//         />
//       </Modal>

//       {/* View Modal */}
//       <Modal
//         isOpen={viewModalOpen}
//         onClose={() => {
//           setViewModalOpen(false);
//           setSelectedPatient(null);
//         }}
//         title="Patient Details"
//       >
//         {selectedPatient && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
//             <p><strong>UPID:</strong> {selectedPatient.upid}</p>
//             <p><strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}</p>
//             <p><strong>Father’s Name:</strong> {selectedPatient.fatherName}</p>
//             <p><strong>DOB:</strong> {selectedPatient.dateOfBirth}</p>
//             <p><strong>Age:</strong> {calculateAge(selectedPatient.dateOfBirth)}</p>
//             <p><strong>Gender:</strong> {selectedPatient.gender}</p>
//             <p><strong>Phone:</strong> {selectedPatient.phone}</p>
//             <p><strong>Email:</strong> {selectedPatient.email || "—"}</p>
//             <p><strong>Address:</strong> {selectedPatient.address || "—"}</p>
//             <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
//             <p><strong>Height:</strong> {selectedPatient.height} cm</p>
//             <p><strong>Weight:</strong> {selectedPatient.weight} kg</p>
//             <p><strong>Treatment:</strong> {selectedPatient.currentTreatment}</p>
//             <p><strong>Allergies:</strong> {selectedPatient.allergies}</p>
//             <p><strong>History:</strong> {selectedPatient.medicalHistory}</p>
//             <p><strong>National ID:</strong> {selectedPatient.nationalId}</p>
//             <p><strong>Insurance:</strong> {selectedPatient.insuranceProvider}</p>
//             <p><strong>Policy No:</strong> {selectedPatient.insurancePolicyNumber}</p>
//             <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContactName}</p>
//             <p><strong>Emergency Phone:</strong> {selectedPatient.emergencyContactPhone}</p>
//             <p><strong>Status:</strong> {selectedPatient.status}</p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }




// import { useState } from "react";
// import { Users, Plus, Search, Edit2, Eye, Trash2 } from "../lib/icons";
// import { Button } from "../components/common/Button";
// import { DataTable } from "../components/common/DataTable";
// import { Modal } from "../components/common/Modal";
// import { PatientRegistrationForm } from "../components/forms/PatientRegistrationForm";

// Demo Patient Data
// const INITIAL_PATIENTS = [
//   {
//     id: 101,
//     upid: "UPID10001",
//     firstName: "Aarav",
//     lastName: "Sharma",
//     fatherName: "Rajesh Sharma",
//     dateOfBirth: "1995-05-15",
//     gender: "MALE",
//     phone: "9876543210",
//     email: "aarav.s@example.com",
//     address: "B-20, Green Park, Delhi",
//     bloodGroup: "O+",
//     height: 175,
//     weight: 78,
//     nationalId: "IN9505151234",
//     currentTreatment: "Hypertension medication",
//     medicalHistory: "Childhood asthma, no current issues.",
//     allergies: "Penicillin",
//     insuranceProvider: "LifeCover India",
//     insurancePolicyNumber: "LCI98765",
//     emergencyContactName: "Priya Sharma",
//     emergencyContactPhone: "9876543211",
//     status: "OPD",
//   },
//   {
//     id: 102,
//     upid: "UPID10002",
//     firstName: "Diya",
//     lastName: "Verma",
//     fatherName: "Sanjay Verma",
//     dateOfBirth: "1988-11-20",
//     gender: "FEMALE",
//     phone: "9123456789",
//     email: "diya.v@example.com",
//     address: "45, Silver Heights, Mumbai",
//     bloodGroup: "A-",
//     height: 162,
//     weight: 65,
//     nationalId: "IN8811205678",
//     currentTreatment: "Post-surgery follow-up",
//     medicalHistory: "Appendectomy (2020)",
//     allergies: "None",
//     insuranceProvider: "HealthPlus",
//     insurancePolicyNumber: "HP234567",
//     emergencyContactName: "Rohan Verma",
//     emergencyContactPhone: "9123456790",
//     status: "IPD",
//   },
// ];

// const normalizePatientKeys = (p) => ({
//   ...p,
//   firstName: p.firstName || p.first_name,
//   lastName: p.lastName || p.last_name,
//   fatherName: p.fatherName || p.father_name,
//   dateOfBirth: p.dateOfBirth || p.date_of_birth,
//   bloodGroup: p.bloodGroup || p.blood_group,
//   nationalId: p.nationalId || p.national_id,
//   currentTreatment: p.currentTreatment || p.current_treatment,
//   medicalHistory: p.medicalHistory || p.medical_history,
//   insuranceProvider: p.insuranceProvider || p.insurance_provider,
//   insurancePolicyNumber: p.insurancePolicyNumber || p.insurance_policy_number,
//   emergencyContactName: p.emergencyContactName || p.emergency_contact_name,
//   emergencyContactPhone: p.emergencyContactPhone || p.emergency_contact_phone,
//   id: p.id || Date.now(),
//   upid: p.upid || ("UPID" + Date.now()),
//   status: p.status || "OPD",
// });

// export function Patients() {
//   const [patients, setPatients] = useState(INITIAL_PATIENTS);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [viewModalOpen, setViewModalOpen] = useState(false);

//   const calculateAge = (dob) => {
//     if (!dob) return "-";
//     const today = new Date();
//     const birth = new Date(dob);
//     let age = today.getFullYear() - birth.getFullYear();
//     const m = today.getMonth() - birth.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
//     return age;
//   };

//   const handleRegisterSuccess = (newPatient) => {
//     const normalized = normalizePatientKeys(newPatient);
//     if (selectedPatient) {
//       setPatients((prev) =>
//         prev.map((p) => (p.id === selectedPatient.id ? { ...p, ...normalized } : p))
//       );
//     } else {
//       setPatients((prev) => [normalized, ...prev]);
//     }
//     setSelectedPatient(null);
//     setIsModalOpen(false);
//   };

//   const handleDeletePatient = (id) => {
//     if (window.confirm("Are you sure you want to delete this patient?")) {
//       setPatients((prev) => prev.filter((p) => p.id !== id));
//     }
//   };

//   const filteredPatients = patients.filter(
//     (p) =>
//       p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.phone.includes(searchQuery) ||
//       p.upid.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between gap-3 mt-10">
//         <div>
//           <h1 className="text-3xl font-display font-bold text-gray-900">Patients</h1>
//           <p className="text-gray-600 mt-1">Manage patient records and information</p>
//         </div>
//         <Button
//           icon={Plus}
//           onClick={() => {
//             setSelectedPatient(null);
//             setIsModalOpen(true);
//           }}
//         >
//           Register New Patient
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {[
//           { label: "Total Patients", value: patients.length, color: "blue" },
//           { label: "OPD Patients", value: patients.filter((p) => p.status === "OPD").length, color: "green" },
//           { label: "IPD Patients", value: patients.filter((p) => p.status === "IPD").length, color: "orange" },
//         ].map((stat, i) => (
//           <div
//             key={i}
//             className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-5 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//               </div>
//               <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
//                 <Users className={`w-6 h-6 text-${stat.color}-600`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search + Table */}
//       <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100">
//         <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
//           <div className="w-full sm:w-1/2 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by name, UPID, or phone..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {filteredPatients.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">No patients found. Register a new one!</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <DataTable
//               data={filteredPatients}
//               columns={[
//                 { header: "UPID", accessor: "upid" },
//                 { header: "Name", accessor: (r) => `${r.firstName} ${r.lastName}` },
//                 { header: "Phone", accessor: "phone" },
//                 { header: "Age", accessor: (r) => calculateAge(r.dateOfBirth) },
//                 { header: "Gender", accessor: "gender" },
//                 {
//                   header: "Status",
//                   accessor: (r) => {
//                     let color = "bg-gray-100 text-gray-700";
//                     if (r.status === "OPD") color = "bg-green-100 text-green-700";
//                     else if (r.status === "IPD") color = "bg-orange-100 text-orange-700";
//                     return (
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
//                         {r.status}
//                       </span>
//                     );
//                   },
//                 },
//                 {
//                   header: "Actions",
//                   accessor: (r) => (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => {
//                           setSelectedPatient(r);
//                           setViewModalOpen(true);
//                         }}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedPatient(r);
//                           setIsModalOpen(true);
//                         }}
//                         className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeletePatient(r.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ),
//                 },
//               ]}
//             />
//           </div>
//         )}
//       </div>

//       {/* Register/Edit Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedPatient(null);
//         }}
//         title={selectedPatient ? "Edit Patient" : "Register New Patient"}
//       >
//         <PatientRegistrationForm
//           patient={selectedPatient ? normalizePatientKeys(selectedPatient) : null}
//           onSuccess={handleRegisterSuccess}
//         />
//       </Modal>

//       {/* View Modal */}
//       <Modal
//         isOpen={viewModalOpen}
//         onClose={() => {
//           setViewModalOpen(false);
//           setSelectedPatient(null);
//         }}
//         title="Patient Details"
//       >
//         {selectedPatient && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
//             <p><strong>UPID:</strong> {selectedPatient.upid}</p>
//             <p><strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}</p>
//             <p><strong>Father’s Name:</strong> {selectedPatient.fatherName}</p>
//             <p><strong>DOB:</strong> {selectedPatient.dateOfBirth}</p>
//             <p><strong>Age:</strong> {calculateAge(selectedPatient.dateOfBirth)}</p>
//             <p><strong>Gender:</strong> {selectedPatient.gender}</p>
//             <p><strong>Phone:</strong> {selectedPatient.phone}</p>
//             <p><strong>Email:</strong> {selectedPatient.email || "—"}</p>
//             <p><strong>Address:</strong> {selectedPatient.address || "—"}</p>
//             <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
//             <p><strong>Height:</strong> {selectedPatient.height} cm</p>
//             <p><strong>Weight:</strong> {selectedPatient.weight} kg</p>
//             <p><strong>Treatment:</strong> {selectedPatient.currentTreatment}</p>
//             <p><strong>Allergies:</strong> {selectedPatient.allergies}</p>
//             <p><strong>History:</strong> {selectedPatient.medicalHistory}</p>
//             <p><strong>National ID:</strong> {selectedPatient.nationalId}</p>
//             <p><strong>Insurance:</strong> {selectedPatient.insuranceProvider}</p>
//             <p><strong>Policy No:</strong> {selectedPatient.insurancePolicyNumber}</p>
//             <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContactName}</p>
//             <p><strong>Emergency Phone:</strong> {selectedPatient.emergencyContactPhone}</p>
//             <p><strong>Status:</strong> {selectedPatient.status}</p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }



// my component
import { useState, useEffect } from "react";
import axios from "axios";
import { Users, Plus, Search, Edit2, Eye, Trash2 } from "../lib/icons";
import { Button } from "../components/common/Button";
import { DataTable } from "../components/common/DataTable";
import { Modal } from "../components/common/Modal";
import { PatientRegistrationForm } from "../components/forms/PatientRegistrationForm";
import { getApiUrl } from "../config/api";

const normalizePatientKeys = (p) => ({
  ...p,
  firstName: p.firstName || p.user?.firstName,
  lastName: p.lastName || p.user?.lastName,
  email: p.email || p.user?.email,
  phone: p.phone || p.user?.phone,
  address: p.address || p.user?.address,
  gender: p.gender || p.user?.gender,
  dateOfBirth: p.dateOfBirth || p.user?.dateOfBirth,
  fatherName: p.fatherName,
  bloodGroup: p.bloodGroup,
  height: p.height,
  weight: p.weight,
  status: p.status,
  upid: p.publicId || p.upid,
  id: p.id,
});

export function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // ✅ Fetch all patients
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth_token");
      const res = await axios.get(getApiUrl("patients"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.map((p) => normalizePatientKeys(p));
      setPatients(data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "-";
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  // ✅ Add / Update patient
  const handleRegisterSuccess = async (formData) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (selectedPatient) {
        // PUT (Update)
        await axios.put(getApiUrl(`patients/${selectedPatient.id}`), formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // POST (Create)
        await axios.post(getApiUrl("patients"), formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await fetchPatients();
      setIsModalOpen(false);
      setSelectedPatient(null);
    } catch (err) {
      console.error("Error saving patient:", err);
    }
  };

  // ✅ Delete patient
  const handleDeletePatient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(getApiUrl(`patients/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone?.includes(searchQuery) ||
      p.upid?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return <p className="text-center py-8 text-gray-500">Loading patients...</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-1">Manage patient records and information</p>
        </div>
        <Button
          icon={Plus}
          onClick={() => {
            setSelectedPatient(null);
            setIsModalOpen(true);
          }}
        >
          Register New Patient
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total Patients", value: patients.length, color: "blue" },
          { label: "OPD Patients", value: patients.filter((p) => p.status === "OPD").length, color: "green" },
          { label: "IPD Patients", value: patients.filter((p) => p.status === "IPD").length, color: "orange" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-5 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <Users className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Table */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <div className="w-full sm:w-1/2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, UPID, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {filteredPatients.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No patients found. Register a new one!</p>
        ) : (
          <div className="overflow-x-auto">
            <DataTable
              data={filteredPatients}
              columns={[
                { header: "UPID", accessor: "upid" },
                { header: "Name", accessor: (r) => `${r.firstName || ""} ${r.lastName || ""}` },
                { header: "Phone", accessor: "phone" },
                { header: "Age", accessor: (r) => calculateAge(r.dateOfBirth) },
                { header: "Gender", accessor: "gender" },
                {
                  header: "Status",
                  accessor: (r) => {
                    let color = "bg-gray-100 text-gray-700";
                    if (r.status === "OPD") color = "bg-green-100 text-green-700";
                    else if (r.status === "IPD") color = "bg-orange-100 text-orange-700";
                    return (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
                        {r.status}
                      </span>
                    );
                  },
                },
                {
                  header: "Actions",
                  accessor: (r) => (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPatient(r);
                          setViewModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPatient(r);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePatient(r.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        )}
      </div>

      {/* Register/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPatient(null);
        }}
        title={selectedPatient ? "Edit Patient" : "Register New Patient"}
      >
        <PatientRegistrationForm
          patient={selectedPatient ? normalizePatientKeys(selectedPatient) : null}
          onSuccess={handleRegisterSuccess}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedPatient(null);
        }}
        title="Patient Details"
      >
        {selectedPatient && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
            <p><strong>UPID:</strong> {selectedPatient.upid}</p>
            <p><strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}</p>
            <p><strong>Father’s Name:</strong> {selectedPatient.fatherName}</p>
            <p><strong>DOB:</strong> {selectedPatient.dateOfBirth}</p>
            <p><strong>Age:</strong> {calculateAge(selectedPatient.dateOfBirth)}</p>
            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
            <p><strong>Phone:</strong> {selectedPatient.phone}</p>
            <p><strong>Email:</strong> {selectedPatient.email || "—"}</p>
            <p><strong>Address:</strong> {selectedPatient.address || "—"}</p>
            <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
            <p><strong>Height:</strong> {selectedPatient.height} cm</p>
            <p><strong>Weight:</strong> {selectedPatient.weight} kg</p>
            <p><strong>Treatment:</strong> {selectedPatient.currentTreatment}</p>
            <p><strong>Allergies:</strong> {selectedPatient.allergies}</p>
            <p><strong>History:</strong> {selectedPatient.medicalHistory}</p>
            <p><strong>National ID:</strong> {selectedPatient.nationalId}</p>
            <p><strong>Insurance:</strong> {selectedPatient.insuranceProvider}</p>
            <p><strong>Policy No:</strong> {selectedPatient.policyNumber}</p>
            <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyName}</p>
            <p><strong>Emergency Phone:</strong> {selectedPatient.emergencyPhone}</p>
            <p><strong>Status:</strong> {selectedPatient.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

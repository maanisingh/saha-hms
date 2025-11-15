// import {
//   Users,
//   UserCheck,
//   DollarSign,
//   Calendar,
//   AlertCircle,
//   TrendingUp,
// } from "../../lib/icons";
// import { StatsCard } from "../../components/common/StatsCard";
// import { DataTable } from "../../components/common/DataTable";
// // Removed: import { Appointment } from '../../types';

// export function AdminDashboard() {
//   // Removed type annotation
//   const recentAppointments = [
//     {
//       id: 1,
//       tokenNumber: "A001",
//       status: "IN_CONSULTATION",
//       scheduledAt: "10:00 AM",
//       patient: { firstName: "Ravi", lastName: "Kumar" },
//       doctor: { firstName: "Priya", lastName: "Sharma" },
//     },
//     {
//       id: 2,
//       tokenNumber: "A002",
//       status: "COMPLETED",
//       scheduledAt: "09:30 AM",
//       patient: { firstName: "Alia", lastName: "Singh" },
//       doctor: { firstName: "Priya", lastName: "Sharma" },
//     },
//     {
//       id: 3,
//       tokenNumber: "A003",
//       status: "SCHEDULED",
//       scheduledAt: "11:30 AM",
//       patient: { firstName: "Mohan", lastName: "Verma" },
//       doctor: { firstName: "Arun", lastName: "Jain" },
//     },
//   ]; // Added dummy data for demonstration since the array was empty

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-display font-bold text-gray-900">
//           Admin Dashboard
//         </h1>
//         <p className="text-gray-600 mt-1">
//           Overview of hospital operations and metrics
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatsCard
//           title="Total Patients"
//           value="1,234"
//           icon={Users}
//           color="purple"
//           trend={{ value: "+12%", isPositive: true }}
//         />
//         <StatsCard
//           title="Total Staff"
//           value="156"
//           icon={UserCheck}
//           color="teal"
//           trend={{ value: "+3", isPositive: true }}
//         />
//         <StatsCard
//           title="Revenue (Today)"
//           value="$12,450"
//           icon={DollarSign}
//           color="green"
//           trend={{ value: "+18%", isPositive: true }}
//         />
//         <StatsCard
//           title="Appointments"
//           value="48"
//           icon={Calendar}
//           color="blue"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">
//             Pending Payments
//           </h2>
//           <div className="space-y-3">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between p-3 bg-warning-50 rounded-lg"
//               >
//                 <div>
//                   <p className="font-medium text-gray-900">
//                     Patient #{1000 + i}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Invoice #INV-{2024000 + i}
//                   </p>
//                 </div>
//                 <span className="font-bold text-warning-600">
//                   ${(Math.random() * 1000 + 500).toFixed(2)}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">
//             Department Performance
//           </h2>
//           <div className="space-y-3">
//             {["Cardiology", "Neurology", "Orthopedics"].map((dept, i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//               >
//                 <div className="flex items-center gap-3">
//                   <TrendingUp className="w-5 h-5 text-success-600" />
//                   <span className="font-medium text-gray-900">{dept}</span>
//                 </div>
//                 <span className="font-bold text-gray-900">{85 + i * 3}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-xl font-bold text-gray-900 mb-4">
//           Recent Activity
//         </h2>
//         <DataTable
//           data={recentAppointments}
//           columns={[
//             { header: "Token", accessor: "tokenNumber" },
//             // Removed type annotation for accessor
//             {
//               header: "Patient",
//               accessor: (row) =>
//                 `${row.patient?.firstName} ${row.patient?.lastName}`,
//             },
//             // Removed type annotation for accessor
//             {
//               header: "Doctor",
//               accessor: (row) =>
//                 `Dr. ${row.doctor?.firstName} ${row.doctor?.lastName}`,
//             },
//             { header: "Time", accessor: "scheduledAt" },
//             {
//               header: "Status",
//               // Removed type annotation for accessor
//               accessor: (row) => (
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     row.status === "COMPLETED"
//                       ? "bg-success-100 text-success-700"
//                       : row.status === "IN_CONSULTATION"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {row.status}
//                 </span>
//               ),
//             },
//           ]}
//         />
//       </div>

//       <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-6 border border-gray-100">
//         <div className="flex items-start gap-4">
//           <div className="p-3 bg-warning-100 rounded-lg">
//             <AlertCircle className="w-6 h-6 text-warning-600" />
//           </div>
//           <div>
//             <h3 className="font-bold text-gray-900 mb-1">System Alerts</h3>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li>• 3 medicines below reorder level</li>
//               <li>• 2 pending lab results from yesterday</li>
//               <li>• Database backup scheduled for tonight</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import {
  Users,
  UserCheck,
  DollarSign,
  Calendar,
  AlertCircle,
  TrendingUp,
} from "../../lib/icons";
import { StatsCard } from "../../components/common/StatsCard";
import { DataTable } from "../../components/common/DataTable";

export function AdminDashboard() {
  const recentAppointments = [
    {
      id: 1,
      tokenNumber: "A001",
      status: "IN_CONSULTATION",
      scheduledAt: "10:00 AM",
      patient: { firstName: "Ravi", lastName: "Kumar" },
      doctor: { firstName: "Priya", lastName: "Sharma" },
    },
    {
      id: 2,
      tokenNumber: "A002",
      status: "COMPLETED",
      scheduledAt: "09:30 AM",
      patient: { firstName: "Alia", lastName: "Singh" },
      doctor: { firstName: "Priya", lastName: "Sharma" },
    },
    {
      id: 3,
      tokenNumber: "A003",
      status: "SCHEDULED",
      scheduledAt: "11:30 AM",
      patient: { firstName: "Mohan", lastName: "Verma" },
      doctor: { firstName: "Arun", lastName: "Jain" },
    },
  ];

  return (
    <div className="space-y-6 px-3 sm:px-4 md:px-6 lg:px-8 mt-10">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Overview of hospital operations and metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Patients"
          value="1,234"
          icon={Users}
          color="purple"
          trend={{ value: "+12%", isPositive: true }}
        />
        <StatsCard
          title="Total Staff"
          value="156"
          icon={UserCheck}
          color="teal"
          trend={{ value: "+3", isPositive: true }}
        />
        <StatsCard
          title="Revenue (Today)"
          value="$12,450"
          icon={DollarSign}
          color="green"
          trend={{ value: "+18%", isPositive: true }}
        />
        <StatsCard
          title="Appointments"
          value="48"
          icon={Calendar}
          color="blue"
        />
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Pending Payments */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
            Pending Payments
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-yellow-50 rounded-lg"
              >
                <div className="text-center sm:text-left">
                  <p className="font-medium text-gray-900">
                    Patient #{1000 + i}
                  </p>
                  <p className="text-sm text-gray-600">
                    Invoice #INV-{2024000 + i}
                  </p>
                </div>
                <span className="font-bold text-yellow-600">
                  ${(Math.random() * 1000 + 500).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
            Department Performance
          </h2>
          <div className="space-y-3">
            {["Cardiology", "Neurology", "Orthopedics"].map((dept, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">{dept}</span>
                </div>
                <span className="font-bold text-gray-900">{85 + i * 3}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
          Recent Activity
        </h2>
        <div className="overflow-x-auto">
          <DataTable
            data={recentAppointments}
            columns={[
              { header: "Token", accessor: "tokenNumber" },
              {
                header: "Patient",
                accessor: (row) =>
                  `${row.patient?.firstName} ${row.patient?.lastName}`,
              },
              {
                header: "Doctor",
                accessor: (row) =>
                  `Dr. ${row.doctor?.firstName} ${row.doctor?.lastName}`,
              },
              { header: "Time", accessor: "scheduledAt" },
              {
                header: "Status",
                accessor: (row) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : row.status === "IN_CONSULTATION"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {row.status}
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-soft p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 text-center sm:text-left">
          <div className="flex justify-center sm:justify-start">
            <div className="p-3 bg-yellow-100 rounded-lg inline-block">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">System Alerts</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 3 medicines below reorder level</li>
              <li>• 2 pending lab results from yesterday</li>
              <li>• Database backup scheduled for tonight</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

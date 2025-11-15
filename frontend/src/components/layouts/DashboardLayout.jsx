
// update

// import { Outlet } from "react-router-dom";
// import { Sidebar } from "../common/Sidebar";
// import { TopBar } from "../common/TopBar";
// import { useAuth } from "../../context/AuthContext";
// import {
//   LayoutDashboard,
//   Users,
//   Calendar,
//   FileText,
//   Pill,
//   FlaskConical,
//   Activity,
//   DollarSign,
//   UserCog,
//   ClipboardList,
// } from "../../lib/icons";

// const navItems = [
//   {
//     label: "Dashboard",
//     path: "/dashboard",
//     icon: LayoutDashboard,
//     roles: [
//       "ADMIN",
//       "DOCTOR",
//       "NURSE",
//       "RECEPTIONIST",
//       "PHARMACIST",
//       "LAB_TECH",
//       "RADIOLOGIST",
//       "FINANCE",
//       "HR",
//       "PATIENT",
//       "AUDITOR",
//     ],
//   },
//   { label: "Patients", path: "/dashboard/patients", icon: Users, roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"] },
//   { label: "Appointments", path: "/dashboard/appointments", icon: Calendar, roles: ["ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT"] },
//   { label: "Prescriptions", path: "/dashboard/prescriptions", icon: FileText, roles: ["ADMIN", "DOCTOR", "PHARMACIST"] },
//   { label: "Pharmacy", path: "/dashboard/pharmacy", icon: Pill, roles: ["ADMIN", "PHARMACIST"] },
//   { label: "Laboratory", path: "/dashboard/laboratory", icon: FlaskConical, roles: ["ADMIN", "DOCTOR", "LAB_TECH"] },
//   { label: "Radiology", path: "/dashboard/radiology", icon: Activity, roles: ["ADMIN", "DOCTOR", "RADIOLOGIST"] },
//   { label: "Billing", path: "/dashboard/billing", icon: DollarSign, roles: ["ADMIN", "RECEPTIONIST", "FINANCE"] },
//   { label: "Staff", path: "/dashboard/staff", icon: UserCog, roles: ["ADMIN", "HR"] },
//   { label: "Reports", path: "/dashboard/reports", icon: ClipboardList, roles: ["ADMIN", "FINANCE", "AUDITOR"] },
// ];

// export function DashboardLayout() {
//   const { user } = useAuth();

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-hospital-purple/5 flex flex-col md:flex-row">
//       {/* Sidebar (collapsible on mobile) */}
//       <div className="md:w-64 w-full md:fixed md:top-0 md:left-0 z-20">
//         <Sidebar items={navItems} currentRole={user.role} />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col md:ml-64">
//         <TopBar />
//         <main className="flex-1 pt-16 px-4 sm:px-6 md:px-8">
//           <div className="max-w-7xl mx-auto w-full">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// 1
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../common/Sidebar";
import { TopBar } from "../common/TopBar";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Pill,
  FlaskConical,
  Activity,
  DollarSign,
  UserCog,
  ClipboardList,
} from "../../lib/icons";
import { MapPin, RadioTower, Shield, HelpCircle } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    translationKey: "dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      "ADMIN",
      "DOCTOR",
      "NURSE",
      "RECEPTIONIST",
      "PHARMACIST",
      "LAB_TECH",
      "RADIOLOGIST",
      "FINANCE",
      "HR",
      "PATIENT",
      "AUDITOR",
      "Attendance"
    ],
  },
  { label: "Patients", translationKey: "patients", path: "/dashboard/patients", icon: Users, roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"] },
  { label: "Appointments", translationKey: "appointments", path: "/dashboard/appointments", icon: Calendar, roles: ["ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT"] },
  { label: "Prescriptions", translationKey: "prescriptions", path: "/dashboard/prescriptions", icon: FileText, roles: ["ADMIN", "DOCTOR", "PHARMACIST"] },
  { label: "Pharmacy", translationKey: "pharmacy", path: "/dashboard/pharmacy", icon: Pill, roles: ["ADMIN", "PHARMACIST"] },
  { label: "Laboratory", translationKey: "laboratory", path: "/dashboard/laboratory", icon: FlaskConical, roles: ["ADMIN", "DOCTOR", "LAB_TECH"] },
  { label: "Radiology", translationKey: "radiology", path: "/dashboard/radiology", icon: Activity, roles: ["ADMIN", "DOCTOR", "RADIOLOGIST"] },
  { label: "Billing", translationKey: "billing", path: "/dashboard/billing", icon: DollarSign, roles: ["ADMIN", "RECEPTIONIST", "FINANCE"] },
  { label: "Staff", translationKey: "staff", path: "/dashboard/staff", icon: UserCog, roles: ["ADMIN", "HR"] },
  { label: "User Management", translationKey: "userManagement", path: "/dashboard/users", icon: Shield, roles: ["ADMIN"] },
  { label: "Reports", translationKey: "reports", path: "/dashboard/reports", icon: ClipboardList, roles: ["ADMIN", "FINANCE", "AUDITOR"] },
  { label: "Location Tracker", translationKey: "locationTracker", path: "/dashboard/locationtracker", icon: MapPin, roles: ["ADMIN", "HR" ," RECEPTIONIST"] },
  { label: "Beacon Manager", translationKey: "beaconManager", path: "/dashboard/beaconmanager", icon: RadioTower, roles: ["ADMIN", "HR" ," RECEPTIONIST"] },
  { label: "Staff Attendance", translationKey: "staffAttendance", path: "/dashboard/Attendance", icon: Users, roles: ["ADMIN", "HR"] },
  { label: "Help Center", translationKey: "helpCenter", path: "/dashboard/help", icon: HelpCircle, roles: ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST", "PHARMACIST", "LAB_TECH", "RADIOLOGIST", "FINANCE", "HR", "PATIENT", "AUDITOR"] },

];{}

export function DashboardLayout() {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-hospital-purple/5 flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar
        items={navItems}
        currentRole={user.role}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content - RTL compatible */}
      <div className="flex-1 flex flex-col md:ms-64 transition-all duration-300">
        <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 pt-16 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

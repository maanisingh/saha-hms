
// 3
// import { useState, useEffect } from "react";
// import { Nav } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// // import logo from "../../components/assets/logo.png";
// import {
//   Activity,
//   Users,
//   Calendar,
//   UserPlus,
//   FileText,
//   Pill,
//   FlaskConical,
//   Radio,
//   DollarSign,
//   UserCog,
//   BarChart3,
//   LogOut,
//   Menu,
//   X,
// } from "../../lib/icons";
// import { useAuth } from "../../jsx-context/AuthContext";
// import { USER_ROLES } from "../../jsx-utils/constants";

// export const Sidebar = () => {
//   const location = useLocation();
//   const { user, signOut } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const menuItems = [
//     { path: "/dashboard", label: "Dashboard", icon: Activity, roles: "all" },
//     {
//       path: "/patients",
//       label: "Patients",
//       icon: Users,
//       roles: [
//         USER_ROLES.ADMIN,
//         USER_ROLES.DOCTOR,
//         USER_ROLES.NURSE,
//         USER_ROLES.RECEPTIONIST,
//       ],
//     },
//     {
//       path: "/appointments",
//       label: "Appointments",
//       icon: Calendar,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.RECEPTIONIST],
//     },
//     {
//       path: "/staff",
//       label: "Staff",
//       icon: UserCog,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.HR],
//     },
//      {
//       path: "/staffattendance",//mukul added this line
//       label: "Staff Attendance",
//       icon: UserCog,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.HR],
//     },

//     {
//       path: "/prescriptions",
//       label: "Prescriptions",
//       icon: FileText,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.PHARMACIST],
//     },
//     {
//       path: "/pharmacy",
//       label: "Pharmacy",
//       icon: Pill,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.PHARMACIST],
//     },
//     {
//       path: "/laboratory",
//       label: "Laboratory",
//       icon: FlaskConical,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.LAB_TECH, USER_ROLES.DOCTOR],
//     },
//     {
//       path: "/radiology",
//       label: "Radiology",
//       icon: Radio,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.RADIOLOGIST, USER_ROLES.DOCTOR],
//     },
//     {
//       path: "/billing",
//       label: "Billing",
//       icon: DollarSign,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.FINANCE],
//     },
//     {
//       path: "/reports",
//       label: "Reports",
//       icon: BarChart3,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.FINANCE, USER_ROLES.AUDITOR],
//     },
//     {
//       path: "/locationtracker",//mukul added this line
//       label: "Location Tracker",
//       icon: BarChart3,
//       roles: [USER_ROLES.ADMIN, USER_ROLES.HR],
//     },
//   ];

//   const hasAccess = (itemRoles) => {
//     if (itemRoles === "all") return true;
//     if (!user?.user_metadata?.role) return false;
//     return itemRoles.includes(user.user_metadata.role);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut();
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <>
//       {/* ✅ Mobile Header (Logo + Toggle stacked vertically) */}
//       {isMobile && (
//         <div className="position-fixed top-0 start-0 w-100  text-center py-2 shadow-sm d-md-none z-3">
//           <div>
//             <img
//               src={logo}
//               alt="Hospital Logo"
//               style={{ height: "40px", objectFit: "contain" }}
//             />
//           </div>
//           <button
//             className="btn btn-light mt-2 bg-hospital-purple text-white"
//             onClick={toggleSidebar}
//           >
//             {isOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`bg-dark text-white d-flex flex-column position-fixed top-0 start-0 vh-100 transition-all ${
//           isOpen ? "translate-x-0" : "-translate-x-100"
//         } d-md-flex translate-x-0`}
//         style={{
//           width: "260px",
//           transition: "transform 0.3s ease-in-out",
//           zIndex: 2,
//         }}
//       >
//         {/* ✅ Desktop Logo Section (only visible on md+) */}
//         <div className="p-4 border-bottom border-secondary d-none d-md-flex align-items-center">
//           <img
//             src={logo}
//             alt="Hospital Logo"
//             className="img-fluid"
//             style={{ height: "45px" }}
//           />
//         </div>

//         {/* Navigation Items */}
//         <Nav className="flex-column flex-grow-1 p-3 overflow-auto mt-md-0 mt-5">
//           {menuItems.map((item) => {
//             if (!hasAccess(item.roles)) return null;
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;
//             return (
//               <Nav.Item key={item.path}>
//                 <Link
//                   to={item.path}
//                   onClick={() => setIsOpen(false)} // close sidebar on mobile click
//                   className={`nav-link text-white d-flex align-items-center py-2 px-3 rounded mb-1 ${
//                     isActive ? "bg-primary" : "hover-bg-secondary"
//                   }`}
//                   style={{ textDecoration: "none" }}
//                 >
//                   <Icon size={20} className="me-2" />
//                   <span>{item.label}</span>
//                 </Link>
//               </Nav.Item>
//             );
//           })}

//           {/* ✅ Logout visible only on mobile (inside slider menu) */}
//           <Nav.Item className="d-md-none mt-3">
//             <button
//               onClick={handleLogout}
//               className="nav-link text-white d-flex align-items-center py-2 px-3 rounded mb-1 w-100"
//               style={{
//                 backgroundColor: "#dc3545",
//                 border: "none",
//               }}
//             >
//               <LogOut size={20} className="me-2" />
//               <span>Logout</span>
//             </button>
//           </Nav.Item>
//         </Nav>

//         {/* Desktop User Section */}
//         <div className="p-3 border-top border-secondary d-none d-md-block">
//           <div className="d-flex align-items-center mb-3 px-3">
//             <div
//               className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
//               style={{ width: "40px", height: "40px" }}
//             >
//               <UserPlus size={20} />
//             </div>
//             <div className="flex-grow-1">
//               <div className="fw-semibold small">{user?.email}</div>
//               <div className="text-muted small">
//                 {user?.user_metadata?.role || "User"}
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
//           >
//             <LogOut size={18} className="me-2" />
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Overlay on mobile when sidebar open */}
//       {isOpen && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
//           style={{ zIndex: 1 }}
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

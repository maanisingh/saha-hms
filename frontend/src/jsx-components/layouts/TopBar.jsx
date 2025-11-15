
// 2
// import { Navbar, Container, Form, Badge } from "react-bootstrap";
// import { Bell, Search, LogOut } from "../../lib/icons";
// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";

// export const TopBar = ({ title = "Dashboard" }) => {
//   const { logout } = useAuth();
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize(); // initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <Navbar
//       bg="white"
//       expand="md"
//       className="border-bottom shadow-sm py-3 sticky-top"
//     >
//       <Container fluid className="d-flex justify-content-between align-items-center">
//         {/* Brand / Title */}
//         <Navbar.Brand className="fw-bold text-dark fs-5 fs-md-4">
//           {title}
//         </Navbar.Brand>

//         {/* Right Section */}
//         <div className="d-flex align-items-center gap-2 gap-md-3">
//           {/* Search (hidden on small screens) */}
//           <Form className="d-none d-md-flex">
//             <div className="input-group">
//               <span className="input-group-text bg-light border-end-0">
//                 <Search size={18} />
//               </span>
//               <Form.Control
//                 type="search"
//                 placeholder="Search patients, appointments..."
//                 className="border-start-0"
//                 style={{ minWidth: "250px" }}
//               />
//             </div>
//           </Form>

//           {/* Search Icon (visible only on mobile) */}
//           <button className="btn btn-light d-md-none">
//             <Search size={20} />
//           </button>

//           {/* Notification Bell */}
//           <div className="position-relative">
//             <button className="btn btn-light position-relative">
//               <Bell size={20} />
//               <Badge
//                 bg="danger"
//                 pill
//                 className="position-absolute top-0 start-100 translate-middle"
//                 style={{ fontSize: "0.65rem" }}
//               >
//                 3
//               </Badge>
//             </button>
//           </div>

//           {/* ✅ Logout icon — show only on desktop */}
//           {isMobile && (
//             <button
//               onClick={logout}
//               className="btn btn-outline-danger d-none d-md-flex align-items-center"
//               title="Logout"
//             >
//               <LogOut size={18} className="me-1" />
//               Logout
//             </button>
//           )}
//          </div>  
//       </Container>
//     </Navbar>
//   );
// };

// export default TopBar;


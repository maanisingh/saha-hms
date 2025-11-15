// import { Container } from 'react-bootstrap';
// import Sidebar from './Sidebar';
// import TopBar from './TopBar';

// export const DashboardLayout = ({ children, title }) => {
//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1 bg-light min-vh-100">
//         <TopBar title={title} />
//         <Container fluid className="p-4">
//           {children}
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;





// import { useState } from "react";
// import { Container } from "react-bootstrap";
// import Sidebar from "./Sidebar";
// import TopBar from "./TopBar";

// export const DashboardLayout = ({ children, title }) => {
//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleSidebar = () => setShowSidebar(!showSidebar);
//   const closeSidebar = () => setShowSidebar(false);

//   return (
//     <div className="d-flex">
//       {/* Sidebar - handles both desktop & mobile */}
//       <Sidebar show={showSidebar} handleClose={closeSidebar} />

//       <div
//         className="flex-grow-1 bg-light min-vh-100"
//         style={{
//           marginLeft: window.innerWidth >= 768 ? "260px" : "0", // leave space for desktop sidebar
//         }}
//       >
//         {/* Top Bar with Toggle button */}
//         <TopBar title={title} onToggleSidebar={toggleSidebar} />

//         {/* Page Content */}
//         <Container fluid className="p-4">
//           {children}
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



// update

// import { Container } from 'react-bootstrap';
// import Sidebar from './Sidebar';
// import TopBar from './TopBar';

// export const DashboardLayout = ({ children, title }) => {
//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1 bg-light min-vh-100">
//         <TopBar title={title} />
//         <Container fluid className="p-4">
//           {children}
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// 1
// import { Container } from "react-bootstrap";
// import Sidebar from "./Sidebar";
// import TopBar from "./TopBar";

// export const DashboardLayout = ({ children, title }) => {
//   return (
//     <div className="d-flex flex-column flex-md-row min-vh-100 bg-light">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-grow-1">
//         {/* TopBar stays fixed at top */}
//         <TopBar title={title} />

//         {/* Page Content */}
//         <Container
//           fluid
//           className="p-4 mt-5 mt-md-0"
//           style={{
//             marginLeft: "0",
//             paddingTop: "70px", // space below TopBar on mobile
//           }}
//         >
//           {children}
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

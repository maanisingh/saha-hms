
// import { useState, useEffect } from "react";
// import { Row, Col } from "react-bootstrap";
// import {
//   Users,
//   Calendar,
//   DollarSign,
//   Activity,
//   TrendingUp,
//   Clock,
// } from "../../../lib/icons";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { StatsCard, Card } from "../../common/Card";
// import DataTable from "../../common/DataTable";
// import {
//   dashboardService,
//   appointmentService,
// } from "../../../jsx-services/api";

// export const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalPatients: 0,
//     totalStaff: 0,
//     todayAppointments: 0,
//     totalRevenue: 0,
//   });
//   const [recentAppointments, setRecentAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       setLoading(true);
//       const [statsData, appointments] = await Promise.all([
//         dashboardService.getStats(),
//         appointmentService.getTodayAppointments(),
//       ]);

//       setStats(statsData);
//       setRecentAppointments(appointments.slice(0, 5));
//     } catch (error) {
//       console.error("Error loading dashboard:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const appointmentColumns = [
//     {
//       header: "Token",
//       key: "token_number",
//       minWidth: "100px",
//     },
//     {
//       header: "Patient",
//       render: (row) =>
//         row.patient
//           ? `${row.patient.first_name} ${row.patient.last_name}`
//           : "N/A",
//       minWidth: "180px",
//     },
//     {
//       header: "Doctor",
//       render: (row) =>
//         row.doctor
//           ? `Dr. ${row.doctor.first_name} ${row.doctor.last_name}`
//           : "N/A",
//       minWidth: "180px",
//     },
//     {
//       header: "Time",
//       render: (row) =>
//         new Date(row.scheduled_at).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       minWidth: "120px",
//     },
//     {
//       header: "Status",
//       key: "status",
//       minWidth: "120px",
//     },
//   ];

//   return (
//     <DashboardLayout title="Dashboard">
//       <Row className="mb-4">
//         <Col>
//           <h2 className="fw-bold">Dashboard Overview</h2>
//           <p className="text-muted">
//             Welcome back! Here's what's happening today.
//           </p>
//         </Col>
//       </Row>

//       {/* ==== STAT CARDS ==== */}
//       <Row className="g-4 mb-4">
//         <Col md={6} xl={3}>
//           <StatsCard
//             title="Total Patients"
//             value={stats.totalPatients}
//             icon={Users}
//             bgColor="primary"
//             trend="+12% from last month"
//           />
//         </Col>
//         <Col md={6} xl={3}>
//           <StatsCard
//             title="Today's Appointments"
//             value={stats.todayAppointments}
//             icon={Calendar}
//             bgColor="success"
//             trend="5 pending"
//           />
//         </Col>
//         <Col md={6} xl={3}>
//           <StatsCard
//             title="Total Staff"
//             value={stats.totalStaff}
//             icon={Activity}
//             bgColor="info"
//             trend="All departments"
//           />
//         </Col>
//         <Col md={6} xl={3}>
//           <StatsCard
//             title="Monthly Revenue"
//             value={stats.totalRevenue ? `$${stats.totalRevenue}` : "$45,200"}
//             icon={DollarSign}
//             bgColor="warning"
//             trend="+8% from last month"
//           />
//         </Col>
//       </Row>

//       {/* ==== TABLE & SIDE PANEL ==== */}
//       <Row className="g-4">
//         {/* LEFT SIDE: Today's Appointments */}
//         <Col lg={8}>
//           <Card title="Today's Appointments">
//             <DataTable
//               columns={appointmentColumns}
//               data={recentAppointments}
//               loading={loading}
//               searchable={false}
//               pageSize={5}
//             />
//           </Card>
//         </Col>

//         {/* RIGHT SIDE: Quick Stats + Activities */}
//         <Col lg={4}>
//           <Card title="Quick Stats" className="mb-3">
//             <div className="d-flex flex-column gap-3">
//               <QuickStat
//                 icon={<Clock className="text-primary me-2" size={24} />}
//                 label="Avg Wait Time"
//                 value="15 min"
//               />
//               <QuickStat
//                 icon={<TrendingUp className="text-success me-2" size={24} />}
//                 label="Patient Satisfaction"
//                 value="98%"
//               />
//               <QuickStat
//                 icon={<Users className="text-info me-2" size={24} />}
//                 label="Active IPD"
//                 value="24"
//               />
//             </div>
//           </Card>

//           <Card title="Recent Activities">
//             {[
//               "New patient registered",
//               "Lab report completed",
//               "Prescription dispensed",
//               "Payment received",
//             ].map((activity, index) => (
//               <div key={index} className="p-2 border-bottom">
//                 <small className="text-muted">{activity}</small>
//                 <div className="text-muted small">Just now</div>
//               </div>
//             ))}
//           </Card>
//         </Col>
//       </Row>
//     </DashboardLayout>
//   );
// };

// /* 🔹 Small reusable component for Quick Stats */
// const QuickStat = ({ icon, label, value }) => (
//   <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
//     <div className="d-flex align-items-center">
//       {icon}
//       <span>{label}</span>
//     </div>
//     <strong>{value}</strong>
//   </div>
// );

// export default Dashboard;





import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  TrendingUp,
  Clock,
} from "../../../lib/icons";
import DashboardLayout from "../../layouts/DashboardLayout";
import { StatsCard, Card } from "../../common/Card";
import DataTable from "../../common/DataTable";
import {
  dashboardService,
  appointmentService,
} from "../../../jsx-services/api";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalStaff: 0,
    todayAppointments: 0,
    totalRevenue: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, appointments] = await Promise.all([
        dashboardService.getStats(),
        appointmentService.getTodayAppointments(),
      ]);

      setStats(statsData);
      setRecentAppointments(appointments.slice(0, 5));
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const appointmentColumns = [
    {
      header: "Token",
      key: "token_number",
      minWidth: "80px",
    },
    {
      header: "Patient",
      render: (row) =>
        row.patient
          ? `${row.patient.first_name} ${row.patient.last_name}`
          : "N/A",
      minWidth: "150px",
    },
    {
      header: "Doctor",
      render: (row) =>
        row.doctor
          ? `Dr. ${row.doctor.first_name} ${row.doctor.last_name}`
          : "N/A",
      minWidth: "150px",
    },
    {
      header: "Time",
      render: (row) =>
        new Date(row.scheduled_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      minWidth: "100px",
    },
    {
      header: "Status",
      key: "status",
      minWidth: "100px",
    },
  ];

  return (
    <DashboardLayout title="Dashboard">
      {/* ==== HEADER ==== */}
      <Row className="align-items-center justify-content-between mb-4 g-3">
        <Col xs={12} md="auto" className="text-center text-md-start">
          <h2 className="fw-bold mb-1">Dashboard Overview</h2>
          <p className="text-muted mb-0">
            Welcome back! Here's what's happening today.
          </p>
        </Col>
      </Row>

      {/* ==== STAT CARDS ==== */}
      <Row className="g-3 g-md-4 mb-4">
        <Col xs={12} sm={6} xl={3}>
          <StatsCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            bgColor="primary"
            trend="+12% from last month"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <StatsCard
            title="Today's Appointments"
            value={stats.todayAppointments}
            icon={Calendar}
            bgColor="success"
            trend="5 pending"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <StatsCard
            title="Total Staff"
            value={stats.totalStaff}
            icon={Activity}
            bgColor="info"
            trend="All departments"
          />
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <StatsCard
            title="Monthly Revenue"
            value={stats.totalRevenue ? `$${stats.totalRevenue}` : "$45,200"}
            icon={DollarSign}
            bgColor="warning"
            trend="+8% from last month"
          />
        </Col>
      </Row>

      {/* ==== TABLE & SIDE PANEL ==== */}
      <Row className="g-4">
        {/* LEFT SIDE: Today's Appointments */}
        <Col xs={12} lg={8}>
          <Card title="Today's Appointments">
            <div className="table-responsive">
              <DataTable
                columns={appointmentColumns}
                data={recentAppointments}
                loading={loading}
                searchable={false}
                pageSize={5}
              />
            </div>
          </Card>
        </Col>

        {/* RIGHT SIDE: Quick Stats + Activities */}
        <Col xs={12} lg={4}>
          <Card title="Quick Stats" className="mb-3">
            <div className="d-flex flex-column gap-3">
              <QuickStat
                icon={<Clock className="text-primary me-2" size={22} />}
                label="Avg Wait Time"
                value="15 min"
              />
              <QuickStat
                icon={<TrendingUp className="text-success me-2" size={22} />}
                label="Patient Satisfaction"
                value="98%"
              />
              <QuickStat
                icon={<Users className="text-info me-2" size={22} />}
                label="Active IPD"
                value="24"
              />
            </div>
          </Card>

          <Card title="Recent Activities">
            {[
              "New patient registered",
              "Lab report completed",
              "Prescription dispensed",
              "Payment received",
            ].map((activity, index) => (
              <div
                key={index}
                className="p-2 border-bottom d-flex flex-column flex-sm-row justify-content-between"
              >
                <small className="text-muted">{activity}</small>
                <div className="text-muted small">Just now</div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

/* 🔹 Small reusable component for Quick Stats */
const QuickStat = ({ icon, label, value }) => (
  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded flex-wrap">
    <div className="d-flex align-items-center mb-2 mb-sm-0">
      {icon}
      <span>{label}</span>
    </div>
    <strong>{value}</strong>
  </div>
);

export default Dashboard;


// import { useState, useEffect } from "react";
// import { Row, Col, Badge, Alert } from "react-bootstrap";
// import {
//   Users,
//   Calendar,
//   DollarSign,
//   Activity,
//   UserPlus,
//   FileText,
//   UserCog,
// } from "../../../lib/icons";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { StatsCard } from "../../common/Card";
// import { Card } from "../../common/Card";
// import DataTable from "../../common/DataTable";
// import Button from "../../common/Button";
// import Modal from "../../common/Modal";
// import PatientRegistrationForm from "../../forms/PatientRegistrationForm";
// import StaffRegistrationForm from "../../forms/StaffRegistrationForm";
// import {
//   dashboardService,
//   patientService,
//   appointmentService,
//   staffService,
// } from "../../../jsx-services/api";

// export const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     totalPatients: 0,
//     totalStaff: 0,
//     todayAppointments: 0,
//   });
//   const [recentPatients, setRecentPatients] = useState([]);
//   const [recentAppointments, setRecentAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPatientModal, setShowPatientModal] = useState(false);
//   const [showStaffModal, setShowStaffModal] = useState(false);
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       setLoading(true);
//       const [statsData, patients, appointments] = await Promise.all([
//         dashboardService.getStats(),
//         patientService.getAll(),
//         appointmentService.getTodayAppointments(),
//       ]);

//       setStats(statsData);
//       setRecentPatients(patients.slice(0, 5));
//       setRecentAppointments(appointments.slice(0, 5));
//     } catch (error) {
//       console.error("Error loading dashboard:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePatientSuccess = () => {
//     setShowPatientModal(false);
//     setSuccess("Patient registered successfully!");
//     loadDashboardData();
//     setTimeout(() => setSuccess(""), 3000);
//   };

//   const handleStaffSuccess = () => {
//     setShowStaffModal(false);
//     setSuccess("Staff member registered successfully!");
//     loadDashboardData();
//     setTimeout(() => setSuccess(""), 3000);
//   };

//   const patientColumns = [
//     { header: "UPID", key: "upid" },
//     {
//       header: "Name",
//       render: (row) => `${row.first_name} ${row.last_name}`,
//     },
//     { header: "Phone", key: "phone" },
//     {
//       header: "Status",
//       render: (row) => <Badge bg="primary">{row.status}</Badge>,
//     },
//   ];

//   const appointmentColumns = [
//     { header: "Token", key: "token_number" },
//     {
//       header: "Patient",
//       render: (row) =>
//         row.patient
//           ? `${row.patient.first_name} ${row.patient.last_name}`
//           : "N/A",
//     },
//     {
//       header: "Time",
//       render: (row) => new Date(row.scheduled_at).toLocaleTimeString(),
//     },
//     {
//       header: "Status",
//       render: (row) => <Badge bg="info">{row.status}</Badge>,
//     },
//   ];

//   return (
//     <DashboardLayout title="Admin Dashboard">
//       {/* Header */}
//       <Row className="align-items-center justify-content-between mb-4 g-3">
//         <Col xs={12} md="auto">
//           <div className="text-center text-md-start">
//             <h2 className="fw-bold mb-1">Admin Overview</h2>
//             <p className="text-muted mb-0">
//               Complete hospital management at your fingertips
//             </p>
//           </div>
//         </Col>
//         <Col xs={12} md="auto" className="text-center text-md-end">
//           <Button variant="primary" onClick={() => setShowPatientModal(true)}>
//             <UserPlus size={18} className="me-2" />
//             Register Patient
//           </Button>
//         </Col>
//       </Row>

//       {/* Stats Section */}
//       <Row className="g-4 mb-4">
//         <Col xs={12} sm={6} xl={3}>
//           <StatsCard
//             title="Total Patients"
//             value={stats.totalPatients}
//             icon={Users}
//             bgColor="primary"
//             trend="+12% from last month"
//           />
//         </Col>
//         <Col xs={12} sm={6} xl={3}>
//           <StatsCard
//             title="Today's Appointments"
//             value={stats.todayAppointments}
//             icon={Calendar}
//             bgColor="success"
//             trend={`${stats.todayAppointments} scheduled`}
//           />
//         </Col>
//         <Col xs={12} sm={6} xl={3}>
//           <StatsCard
//             title="Total Staff"
//             value={stats.totalStaff}
//             icon={Activity}
//             bgColor="info"
//             trend="All departments"
//           />
//         </Col>
//         <Col xs={12} sm={6} xl={3}>
//           <StatsCard
//             title="Monthly Revenue"
//             value="$45,200"
//             icon={DollarSign}
//             bgColor="warning"
//             trend="+8% from last month"
//           />
//         </Col>
//       </Row>

//       {/* Success Alert */}
//       {success && (
//         <Alert
//           variant="success"
//           dismissible
//           onClose={() => setSuccess("")}
//           className="mb-4"
//         >
//           {success}
//         </Alert>
//       )}

//       {/* Quick Actions & System Status */}
//       <Row className="g-4 mb-4">
//         <Col xs={12} lg={6}>
//           <Card title="Quick Actions">
//             <div className="d-grid gap-2">
//               <Button
//                 variant="outline-primary"
//                 className="text-start"
//                 onClick={() => setShowPatientModal(true)}
//               >
//                 <UserPlus size={18} className="me-2" />
//                 Register New Patient
//               </Button>
//               <Button
//                 variant="outline-success"
//                 className="text-start"
//                 onClick={() => navigate("/appointments")}
//               >
//                 <Calendar size={18} className="me-2" />
//                 Book Appointment
//               </Button>
//               <Button
//                 variant="outline-info"
//                 className="text-start"
//                 onClick={() => navigate("/reports")}
//               >
//                 <FileText size={18} className="me-2" />
//                 View Reports
//               </Button>
//               <Button
//                 variant="outline-warning"
//                 className="text-start"
//                 onClick={() => setShowStaffModal(true)}
//               >
//                 <UserCog size={18} className="me-2" />
//                 Register Staff
//               </Button>
//             </div>
//           </Card>
//         </Col>

//         <Col xs={12} lg={6}>
//           <Card title="System Status">
//             <div className="d-flex flex-column gap-3">
//               <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded flex-wrap">
//                 <span>Database Status</span>
//                 <Badge bg="success" className="mt-2 mt-sm-0">
//                   Online
//                 </Badge>
//               </div>
//               <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded flex-wrap">
//                 <span>Active Users</span>
//                 <strong className="mt-2 mt-sm-0">24</strong>
//               </div>
//               <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded flex-wrap">
//                 <span>Server Health</span>
//                 <Badge bg="success" className="mt-2 mt-sm-0">
//                   Healthy
//                 </Badge>
//               </div>
//               <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded flex-wrap">
//                 <span>Last Backup</span>
//                 <small className="text-muted mt-2 mt-sm-0">
//                   2 hours ago
//                 </small>
//               </div>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Tables Section */}
//       <Row className="g-4">
//         <Col xs={12} lg={6}>
//           <Card title="Recent Patients">
//             <div className="table-responsive">
//               <DataTable
//                 columns={patientColumns}
//                 data={recentPatients}
//                 loading={loading}
//                 searchable={false}
//                 pageSize={5}
//               />
//             </div>
//           </Card>
//         </Col>

//         <Col xs={12} lg={6}>
//           <Card title="Today's Appointments">
//             <div className="table-responsive">
//               <DataTable
//                 columns={appointmentColumns}
//                 data={recentAppointments}
//                 loading={loading}
//                 searchable={false}
//                 pageSize={5}
//               />
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Modals */}
//       <Modal
//         show={showPatientModal}
//         onHide={() => setShowPatientModal(false)}
//         title="Register New Patient"
//         size="xl"
//       >
//         <PatientRegistrationForm
//           onSuccess={handlePatientSuccess}
//           onCancel={() => setShowPatientModal(false)}
//         />
//       </Modal>

//       <Modal
//         show={showStaffModal}
//         onHide={() => setShowStaffModal(false)}
//         title="Register New Staff"
//         size="xl"
//       >
//         <StaffRegistrationForm
//           onSuccess={handleStaffSuccess}
//           onCancel={() => setShowStaffModal(false)}
//         />
//       </Modal>
//     </DashboardLayout>
//   );
// };

// export default AdminDashboard;




import { useState, useEffect } from "react";
import { Row, Col, Badge, Alert } from "react-bootstrap";
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  UserPlus,
  FileText,
  UserCog,
} from "../../../lib/icons";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { StatsCard, Card } from "../../common/Card";
import DataTable from "../../common/DataTable";
import Button from "../../common/Button";
import Modal from "../../common/Modal";
import PatientRegistrationForm from "../../forms/PatientRegistrationForm";
import StaffRegistrationForm from "../../forms/StaffRegistrationForm";
import {
  dashboardService,
  patientService,
  appointmentService,
} from "../../../jsx-services/api";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalStaff: 0,
    todayAppointments: 0,
  });
  const [recentPatients, setRecentPatients] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, patients, appointments] = await Promise.all([
        dashboardService.getStats(),
        patientService.getAll(),
        appointmentService.getTodayAppointments(),
      ]);

      setStats(statsData);
      setRecentPatients(patients.slice(0, 5));
      setRecentAppointments(appointments.slice(0, 5));
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSuccess = () => {
    setShowPatientModal(false);
    setSuccess("Patient registered successfully!");
    loadDashboardData();
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleStaffSuccess = () => {
    setShowStaffModal(false);
    setSuccess("Staff member registered successfully!");
    loadDashboardData();
    setTimeout(() => setSuccess(""), 3000);
  };

  const patientColumns = [
    { header: "UPID", key: "upid" },
    {
      header: "Name",
      render: (row) => `${row.first_name} ${row.last_name}`,
    },
    { header: "Phone", key: "phone" },
    {
      header: "Status",
      render: (row) => <Badge bg="primary">{row.status}</Badge>,
    },
  ];

  const appointmentColumns = [
    { header: "Token", key: "token_number" },
    {
      header: "Patient",
      render: (row) =>
        row.patient
          ? `${row.patient.first_name} ${row.patient.last_name}`
          : "N/A",
    },
    {
      header: "Time",
      render: (row) => new Date(row.scheduled_at).toLocaleTimeString(),
    },
    {
      header: "Status",
      render: (row) => <Badge bg="info">{row.status}</Badge>,
    },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Header */}
      <Row className="align-items-center justify-content-between mb-4 g-3">
        <Col xs={12} md="auto" className="text-center text-md-start">
          <h2 className="fw-bold mb-1">Admin Overview</h2>
          <p className="text-muted mb-0">
            Complete hospital management at your fingertips
          </p>
        </Col>
        <Col xs={12} md="auto" className="text-center text-md-end">
          <Button
            variant="primary"
            onClick={() => setShowPatientModal(true)}
            className="w-100 w-md-auto"
          >
            <UserPlus size={18} className="me-2" />
            Register Patient
          </Button>
        </Col>
      </Row>

      {/* Stats Section */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <StatsCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            bgColor="primary"
            trend="+12% from last month"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatsCard
            title="Today's Appointments"
            value={stats.todayAppointments}
            icon={Calendar}
            bgColor="success"
            trend={`${stats.todayAppointments} scheduled`}
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatsCard
            title="Total Staff"
            value={stats.totalStaff}
            icon={Activity}
            bgColor="info"
            trend="All departments"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatsCard
            title="Monthly Revenue"
            value="$45,200"
            icon={DollarSign}
            bgColor="warning"
            trend="+8% from last month"
          />
        </Col>
      </Row>

      {/* Success Alert */}
      {success && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccess("")}
          className="mb-4"
        >
          {success}
        </Alert>
      )}

      {/* Quick Actions & System Status */}
      <Row className="g-4 mb-4">
        <Col xs={12} lg={6}>
          <Card title="Quick Actions">
            <div className="d-grid gap-2">
              <Button
                variant="outline-primary"
                className="text-start"
                onClick={() => setShowPatientModal(true)}
              >
                <UserPlus size={18} className="me-2" />
                Register New Patient
              </Button>
              <Button
                variant="outline-success"
                className="text-start"
                onClick={() => navigate("/appointments")}
              >
                <Calendar size={18} className="me-2" />
                Book Appointment
              </Button>
              <Button
                variant="outline-info"
                className="text-start"
                onClick={() => navigate("/reports")}
              >
                <FileText size={18} className="me-2" />
                View Reports
              </Button>
              <Button
                variant="outline-warning"
                className="text-start"
                onClick={() => setShowStaffModal(true)}
              >
                <UserCog size={18} className="me-2" />
                Register Staff
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
          <Card title="System Status">
            <div className="d-flex flex-column gap-3">
              {[
                ["Database Status", <Badge bg="success">Online</Badge>],
                ["Active Users", <strong>24</strong>],
                ["Server Health", <Badge bg="success">Healthy</Badge>],
                ["Last Backup", <small className="text-muted">2 hours ago</small>],
              ].map(([label, value], idx) => (
                <div
                  key={idx}
                  className="d-flex justify-content-between align-items-center p-3 bg-light rounded flex-wrap"
                >
                  <span>{label}</span>
                  <div className="mt-2 mt-sm-0">{value}</div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tables Section */}
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card title="Recent Patients">
            <div className="table-responsive">
              <DataTable
                columns={patientColumns}
                data={recentPatients}
                loading={loading}
                searchable={false}
                pageSize={5}
              />
            </div>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
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
      </Row>

      {/* Modals */}
      <Modal
        show={showPatientModal}
        onHide={() => setShowPatientModal(false)}
        title="Register New Patient"
        size="xl"
      >
        <PatientRegistrationForm
          onSuccess={handlePatientSuccess}
          onCancel={() => setShowPatientModal(false)}
        />
      </Modal>

      <Modal
        show={showStaffModal}
        onHide={() => setShowStaffModal(false)}
        title="Register New Staff"
        size="xl"
      >
        <StaffRegistrationForm
          onSuccess={handleStaffSuccess}
          onCancel={() => setShowStaffModal(false)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default AdminDashboard;

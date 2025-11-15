// import { useState, useEffect } from "react";
// import { Row, Col, Badge } from "react-bootstrap";
// import { Pill, Package, AlertCircle, TrendingUp } from "../../../lib/icons";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { StatsCard } from "../../common/Card";
// import { Card } from "../../common/Card";
// import DataTable from "../../common/DataTable";
// import Button from "../../common/Button";

// export const PharmacistDashboard = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const prescriptions = [
//     {
//       id: 1,
//       prescriptionNo: "RX001",
//       patientName: "John Doe",
//       doctor: "Dr. Smith",
//       medicines: 3,
//       status: "PENDING",
//       date: new Date().toISOString(),
//     },
//     {
//       id: 2,
//       prescriptionNo: "RX002",
//       patientName: "Jane Smith",
//       doctor: "Dr. Johnson",
//       medicines: 2,
//       status: "DISPENSED",
//       date: new Date().toISOString(),
//     },
//   ];

//   const lowStockMedicines = [
//     { id: 1, name: "Paracetamol 500mg", stock: 50, minStock: 100 },
//     { id: 2, name: "Amoxicillin 250mg", stock: 30, minStock: 100 },
//     { id: 3, name: "Ibuprofen 400mg", stock: 45, minStock: 100 },
//   ];

//   const prescriptionColumns = [
//     {
//       header: "Prescription No",
//       key: "prescriptionNo",
//     },
//     {
//       header: "Patient",
//       key: "patientName",
//     },
//     {
//       header: "Doctor",
//       key: "doctor",
//     },
//     {
//       header: "Medicines",
//       key: "medicines",
//     },
//     {
//       header: "Status",
//       render: (row) => {
//         const variants = {
//           PENDING: "warning",
//           DISPENSED: "success",
//           CANCELLED: "danger",
//         };
//         return <Badge bg={variants[row.status]}>{row.status}</Badge>;
//       },
//     },
//     {
//       header: "Actions",
//       render: (row) =>
//         row.status === "PENDING" && (
//           <Button size="sm" variant="success">
//             Dispense
//           </Button>
//         ),
//     },
//   ];

//   const stockColumns = [
//     {
//       header: "Medicine Name",
//       key: "name",
//     },
//     {
//       header: "Current Stock",
//       render: (row) => (
//         <Badge bg={row.stock < row.minStock ? "danger" : "success"}>
//           {row.stock}
//         </Badge>
//       ),
//     },
//     {
//       header: "Min Stock",
//       key: "minStock",
//     },
//     {
//       header: "Actions",
//       render: () => (
//         <Button size="sm" variant="primary">
//           Reorder
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <DashboardLayout title="Pharmacist Dashboard">
//       <Row className="mb-4">
//         <Col>
//           <h2 className="fw-bold">Pharmacy Dashboard</h2>
//           <p className="text-muted">
//             Manage prescriptions and medicine inventory
//           </p>
//         </Col>
//       </Row>

//       <Row className="g-4 mb-4">
//         <Col md={6} xl={3}>
//           <StatsCard
//             title="Pending Prescriptions"
//             value={prescriptions.filter((p) => p.status === "PENDING").length}
//             icon={Pill}
//             bgColor="warning"
//           />
//         </Col>
//         <Col md={6} xl={3}>
//           <StatsCard
//             title="Dispensed Today"
//             value={prescriptions.filter((p) => p.status === "DISPENSED").length}
//             icon={Package}
//             bgColor="success"
//           />
//         </Col>
//         <Col md={6} xl={3}>
//           <StatsCard
//             title="Low Stock Items"
//             value={lowStockMedicines.length}
//             icon={AlertCircle}
//             bgColor="danger"
//           />
//         </Col>
//         <Col md={6} xl={3}>
//           <StatsCard
//             title="Total Medicines"
//             value="450"
//             icon={TrendingUp}
//             bgColor="info"
//           />
//         </Col>
//       </Row>

//       <Row className="g-4 mb-4">
//         <Col lg={8}>
//           <Card title="Pending Prescriptions">
//             <DataTable
//               columns={prescriptionColumns}
//               data={prescriptions}
//               loading={loading}
//               searchable
//               pageSize={10}
//             />
//           </Card>
//         </Col>

//         <Col lg={4}>
//           <Card title="Quick Actions">
//             <div className="d-grid gap-2">
//               <Button
//                 variant="outline-primary"
//                 onClick={() => navigate("/prescriptions")}
//               >
//                 <Pill size={18} className="me-2" />
//                 Dispense Medicine
//               </Button>
//               <Button
//                 variant="outline-success"
//                 onClick={() => navigate("/pharmacy")}
//               >
//                 <Package size={18} className="me-2" />
//                 Add Stock
//               </Button>
//               <Button
//                 variant="outline-info"
//                 onClick={() => navigate("/pharmacy")}
//               >
//                 <AlertCircle size={18} className="me-2" />
//                 View Low Stock
//               </Button>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="g-4">
//         <Col lg={12}>
//           <Card title="Low Stock Medicines">
//             <DataTable
//               columns={stockColumns}
//               data={lowStockMedicines}
//               loading={loading}
//               searchable={false}
//               pageSize={10}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </DashboardLayout>
//   );
// };

// export default PharmacistDashboard;




import { useState } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { Pill, Package, AlertCircle, TrendingUp } from "../../../lib/icons";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { StatsCard } from "../../common/Card";
import { Card } from "../../common/Card";
import DataTable from "../../common/DataTable";
import Button from "../../common/Button";

export const PharmacistDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const prescriptions = [
    {
      id: 1,
      prescriptionNo: "RX001",
      patientName: "John Doe",
      doctor: "Dr. Smith",
      medicines: 3,
      status: "PENDING",
      date: new Date().toISOString(),
    },
    {
      id: 2,
      prescriptionNo: "RX002",
      patientName: "Jane Smith",
      doctor: "Dr. Johnson",
      medicines: 2,
      status: "DISPENSED",
      date: new Date().toISOString(),
    },
  ];

  const lowStockMedicines = [
    { id: 1, name: "Paracetamol 500mg", stock: 50, minStock: 100 },
    { id: 2, name: "Amoxicillin 250mg", stock: 30, minStock: 100 },
    { id: 3, name: "Ibuprofen 400mg", stock: 45, minStock: 100 },
  ];

  const prescriptionColumns = [
    { header: "Prescription No", key: "prescriptionNo" },
    { header: "Patient", key: "patientName" },
    { header: "Doctor", key: "doctor" },
    { header: "Medicines", key: "medicines" },
    {
      header: "Status",
      render: (row) => {
        const variants = {
          PENDING: "warning",
          DISPENSED: "success",
          CANCELLED: "danger",
        };
        return <Badge bg={variants[row.status]}>{row.status}</Badge>;
      },
    },
    {
      header: "Actions",
      render: (row) =>
        row.status === "PENDING" && (
          <Button size="sm" variant="success" className="w-100 w-sm-auto">
            Dispense
          </Button>
        ),
    },
  ];

  const stockColumns = [
    { header: "Medicine Name", key: "name" },
    {
      header: "Current Stock",
      render: (row) => (
        <Badge bg={row.stock < row.minStock ? "danger" : "success"}>
          {row.stock}
        </Badge>
      ),
    },
    { header: "Min Stock", key: "minStock" },
    {
      header: "Actions",
      render: () => (
        <Button size="sm" variant="primary" className="w-100 w-sm-auto">
          Reorder
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout title="Pharmacist Dashboard">
      <Row className="mb-3 text-center text-md-start">
        <Col>
          <h2 className="fw-bold fs-4 fs-md-3">Pharmacy Dashboard</h2>
          <p className="text-muted mb-0">
            Manage prescriptions and medicine inventory
          </p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-3 g-md-4 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <StatsCard
            title="Pending Prescriptions"
            value={prescriptions.filter((p) => p.status === "PENDING").length}
            icon={Pill}
            bgColor="warning"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatsCard
            title="Dispensed Today"
            value={prescriptions.filter((p) => p.status === "DISPENSED").length}
            icon={Package}
            bgColor="success"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatsCard
            title="Low Stock Items"
            value={lowStockMedicines.length}
            icon={AlertCircle}
            bgColor="danger"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatsCard
            title="Total Medicines"
            value="450"
            icon={TrendingUp}
            bgColor="info"
          />
        </Col>
      </Row>

      {/* Main Content */}
      <Row className="g-3 g-md-4 mb-4">
        <Col xs={12} lg={8}>
          <Card title="Pending Prescriptions" className="h-100">
            <DataTable
              columns={prescriptionColumns}
              data={prescriptions}
              loading={loading}
              searchable
              pageSize={10}
            />
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card title="Quick Actions" className="h-100">
            <div className="d-grid gap-3">
              <Button
                variant="outline-primary"
                onClick={() => navigate("/prescriptions")}
                className="w-100"
              >
                <Pill size={18} className="me-2" />
                Dispense Medicine
              </Button>
              <Button
                variant="outline-success"
                onClick={() => navigate("/pharmacy")}
                className="w-100"
              >
                <Package size={18} className="me-2" />
                Add Stock
              </Button>
              <Button
                variant="outline-info"
                onClick={() => navigate("/pharmacy")}
                className="w-100"
              >
                <AlertCircle size={18} className="me-2" />
                View Low Stock
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Low Stock Table */}
      <Row className="g-3 g-md-4">
        <Col xs={12}>
          <Card title="Low Stock Medicines">
            <DataTable
              columns={stockColumns}
              data={lowStockMedicines}
              loading={loading}
              searchable={false}
              pageSize={10}
            />
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default PharmacistDashboard;

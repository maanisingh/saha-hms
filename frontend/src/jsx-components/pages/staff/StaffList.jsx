
import { useState, useEffect } from "react";
import { Row, Col, Badge, Alert } from "react-bootstrap";
import { UserPlus, Edit, Eye } from "../../../lib/icons";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Card } from "../../common/Card";
import Button from "../../common/Button";
import DataTable from "../../common/DataTable";
import Modal from "../../common/Modal";
import StaffRegistrationForm from "../../forms/StaffRegistrationForm";
import { staffService } from "../../../jsx-services/api";

export const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      setLoading(true);
      const data = await staffService.getAll();
      setStaff(data);
    } catch (error) {
      console.error("Error loading staff:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setSuccess("Staff member saved successfully!");
    setShowModal(false);
    setSelectedStaff(null);
    loadStaff();
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleEdit = (staffMember) => {
    setSelectedStaff(staffMember);
    setShowModal(true);
  };

  const columns = [
    {
      header: "Employee ID",
      key: "employee_id",
    },
    {
      header: "Name",
      render: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      header: "Phone",
      key: "phone",
    },
    {
      header: "Gender",
      key: "gender",
    },
    {
      header: "Status",
      render: (row) => (
        <Badge bg={row.is_active ? "success" : "danger"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="d-flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => handleEdit(row)}
          >
            <Edit size={14} />
          </Button>
          <Button size="sm" variant="outline-info">
            <Eye size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout title="Staff Management">
      {/* Header Section */}
      <Row className="align-items-center mb-4 gy-3">
        <Col xs={12} md={6}>
          <h2 className="fw-bold mb-1">Staff</h2>
          <p className="text-muted mb-0">Manage hospital staff and employees</p>
        </Col>
        <Col xs={12} md="auto" className="text-md-end text-center">
          <Button
            variant="primary"
            onClick={() => {
              setSelectedStaff(null);
              setShowModal(true);
            }}
          >
            <UserPlus size={18} className="me-2" />
            Add Staff
          </Button>
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

      {/* Table Section */}
      <Card className="overflow-auto">
        <DataTable
          columns={columns}
          data={staff}
          loading={loading}
          searchable
          pageSize={10}
        />
      </Card>

      {/* Modal for Add/Edit Staff */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedStaff(null);
        }}
        title={selectedStaff ? "Edit Staff" : "Register New Staff"}
        size="xl"
      >
        <StaffRegistrationForm
          staff={selectedStaff}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowModal(false);
            setSelectedStaff(null);
          }}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default StaffList;



// import { useState, useEffect } from "react";
// import { Row, Col, Badge, Alert } from "react-bootstrap";
// import { UserPlus, Edit, Eye } from "../../../lib/icons";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { Card } from "../../common/Card";
// import Button from "../../common/Button";
// import DataTable from "../../common/DataTable";
// import Modal from "../../common/Modal";
// import StaffRegistrationForm from "../../forms/StaffRegistrationForm";
// import { staffService } from "../../../jsx-services/api";

// export const StaffList = () => {
//   const [staff, setStaff] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     loadStaff();
//   }, []);

//   const loadStaff = async () => {
//     try {
//       setLoading(true);
//       const data = await staffService.getAll();
//       setStaff(data);
//     } catch (error) {
//       console.error("Error loading staff:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSuccess = () => {
//     setSuccess("Staff member saved successfully!");
//     setShowModal(false);
//     setSelectedStaff(null);
//     loadStaff();
//     setTimeout(() => setSuccess(""), 3000);
//   };

//   const handleEdit = (staffMember) => {
//     setSelectedStaff(staffMember);
//     setShowModal(true);
//   };

//   const columns = [
//     {
//       header: "Employee ID",
//       key: "employee_id",
//     },
//     {
//       header: "Name",
//       key: "name",
//     },
//     {
//       header: "Email",
//       key: "email",
//     },
//     {
//       header: "Department",
//       key: "department",
//     },
//     {
//       header: "Phone",
//       key: "phone",
//     },
//     {
//       header: "Role",
//       key: "role",
//     },
//     {
//       header: "Username",
//       key: "username",
//     },
//     {
//       header: "Status",
//       render: (row) => (
//         <Badge bg={row.is_active ? "success" : "danger"}>
//           {row.is_active ? "Active" : "Inactive"}
//         </Badge>
//       ),
//     },
//     {
//       header: "Actions",
//       render: (row) => (
//         <div className="d-flex flex-wrap gap-2">
//           <Button
//             size="sm"
//             variant="outline-primary"
//             onClick={() => handleEdit(row)}
//           >
//             <Edit size={14} />
//           </Button>
//           <Button size="sm" variant="outline-info">
//             <Eye size={14} />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <DashboardLayout title="Staff Management">
//       {/* Header Section */}
//       <Row className="align-items-center mb-4 gy-3">
//         <Col xs={12} md={6}>
//           <h2 className="fw-bold mb-1">Staff</h2>
//           <p className="text-muted mb-0">
//             Manage hospital staff and employees
//           </p>
//         </Col>
//         <Col xs={12} md="auto" className="text-md-end text-center">
//           <Button
//             variant="primary"
//             onClick={() => {
//               setSelectedStaff(null);
//               setShowModal(true);
//             }}
//           >
//             <UserPlus size={18} className="me-2" />
//             Add Staff
//           </Button>
//         </Col>
//       </Row>
//       {/* Success Message */}
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

//       {/* Staff Table */}
//       <Card className="overflow-auto">
//         <DataTable
//           columns={columns}
//           data={staff}
//           loading={loading}
//           searchable
//           pageSize={10}
//         />
//       </Card>

//       {/* Add/Edit Modal */}
//       <Modal
//         show={showModal}
//         onHide={() => {
//           setShowModal(false);
//           setSelectedStaff(null);
//         }}
//         title={selectedStaff ? "Edit Staff Member" : "Add New Staff Member"}
//         size="lg"
//       >
//         <StaffRegistrationForm
//           staff={selectedStaff}
//           onSuccess={handleSuccess}
//           onCancel={() => {
//             setShowModal(false);
//             setSelectedStaff(null);
//           }}
//         />
//       </Modal>
//     </DashboardLayout>
//   );
// };

// export default StaffList;



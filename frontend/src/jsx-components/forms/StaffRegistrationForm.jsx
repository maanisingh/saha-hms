


// import { useState } from "react";
// import { Form, Row, Col, Alert } from "react-bootstrap";
// import Button from "../common/Button";
// import { staffService } from "../../jsx-services/api";
// import { USER_ROLES, GENDER_OPTIONS } from "../../jsx-utils/constants";

// export const StaffRegistrationForm = ({ staff, onSuccess, onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     firstName: staff?.first_name || "",
//     lastName: staff?.last_name || "",
//     email: staff?.email || "",
//     phone: staff?.phone || "",
//     gender: staff?.gender || "MALE",
//     dateOfBirth: staff?.date_of_birth || "",
//     role: staff?.role || "DOCTOR",
//     employeeId: staff?.employee_id || "",
//     department: staff?.department || "",
//     specialization: staff?.specialization || "",
//     qualification: staff?.qualification || "",
//     experience: staff?.experience || "",
//     joiningDate: staff?.joining_date || "",
//     address: staff?.address || "",
//     emergencyContactName: staff?.emergency_contact_name || "",
//     emergencyContactPhone: staff?.emergency_contact_phone || "",
//     isActive: staff?.is_active !== undefined ? staff.is_active : true,
//   });

//   const roleOptions = [
//     { value: USER_ROLES.DOCTOR, label: "Doctor" },
//     { value: USER_ROLES.NURSE, label: "Nurse" },
//     { value: USER_ROLES.RECEPTIONIST, label: "Receptionist" },
//     { value: USER_ROLES.PHARMACIST, label: "Pharmacist" },
//     { value: USER_ROLES.LAB_TECH, label: "Lab Technician" },
//     { value: USER_ROLES.RADIOLOGIST, label: "Radiologist" },
//     { value: USER_ROLES.FINANCE, label: "Finance" },
//     { value: USER_ROLES.HR, label: "HR" },
//     { value: USER_ROLES.ADMIN, label: "Admin" },
//   ];

//   const handleChange = (e) => {
//     const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const staffData = {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         gender: formData.gender,
//         date_of_birth: formData.dateOfBirth || null,
//         role: formData.role,
//         employee_id: formData.employeeId,
//         department: formData.department || null,
//         specialization: formData.specialization || null,
//         qualification: formData.qualification || null,
//         experience: formData.experience ? parseInt(formData.experience) : null,
//         joining_date: formData.joiningDate || null,
//         address: formData.address || null,
//         emergency_contact_name: formData.emergencyContactName || null,
//         emergency_contact_phone: formData.emergencyContactPhone || null,
//         is_active: formData.isActive,
//       };

//       let result;
//       if (staff) {
//         result = await staffService.update(staff.id, staffData);
//       } else {
//         result = await staffService.create(staffData);
//       }

//       onSuccess?.(result);
//     } catch (err) {
//       setError(err.message || "Failed to save staff member");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit} className="responsive-form">
//       {error && (
//         <Alert variant="danger" dismissible onClose={() => setError("")}>
//           {error}
//         </Alert>
//       )}

//       <Row className="gy-3">
//         {/* Each <Col> automatically stacks on smaller devices */}
//         <Col xs={12} md={6}>
//           <Form.Group>
//             <Form.Label>
//               First Name <span className="text-danger">*</span>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>

//         <Col xs={12} md={6}>
//           <Form.Group>
//             <Form.Label>
//               Last Name <span className="text-danger">*</span>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>

//         <Col xs={12} md={6}>
//           <Form.Group>
//             <Form.Label>
//               Employee ID <span className="text-danger">*</span>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               name="employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>

//         <Col xs={12} md={6}>
//           <Form.Group>
//             <Form.Label>
//               Role <span className="text-danger">*</span>
//             </Form.Label>
//             <Form.Select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//             >
//               {roleOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Col>

//         {/* ✅ All other fields remain same */}
//         {/* Just used xs={12} md={6} for mobile responsiveness */}

//         {/* Address */}
//         <Col xs={12}>
//           <Form.Group>
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>

//         {/* Emergency Contacts */}
//         <Col xs={12} md={6}>
//           <Form.Group>
//             <Form.Label>Emergency Contact Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="emergencyContactName"
//               value={formData.emergencyContactName}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>

//         <Col xs={12} md={6}>
//           <Form.Group>
//             <Form.Label>Emergency Contact Phone</Form.Label>
//             <Form.Control
//               type="tel"
//               name="emergencyContactPhone"
//               value={formData.emergencyContactPhone}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>

//         {/* Active Checkbox */}
//         <Col xs={12}>
//           <Form.Group>
//             <Form.Check
//               type="checkbox"
//               name="isActive"
//               label="Active Status"
//               checked={formData.isActive}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       {/* Buttons Section */}
//       <div className="d-flex flex-wrap gap-2 justify-content-end pt-3 border-top mt-3">
//         {onCancel && (
//           <Button variant="secondary" onClick={onCancel} disabled={loading}>
//             Cancel
//           </Button>
//         )}
//         <Button type="submit" variant="primary" loading={loading}>
//           {staff ? "Update Staff" : "Register Staff"}
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default StaffRegistrationForm;




// import { useState } from "react";
// import { Form, Row, Col, Alert } from "react-bootstrap";
// import Button from "../common/Button";
// import { staffService } from "../../jsx-services/api";
// import { USER_ROLES } from "../../jsx-utils/constants";

// export const StaffRegistrationForm = ({ staff, onSuccess, onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     employeeId: staff?.employee_id || "",
//     name: staff?.name || "",
//     email: staff?.email || "",
//     department: staff?.department || "",
//     phone: staff?.phone || "",
//     role: staff?.role || USER_ROLES.DOCTOR,
//     username: staff?.username || "",
//     password: "",
//     isActive: staff?.is_active !== undefined ? staff.is_active : true,
//   });

//   const roleOptions = [
//     { value: USER_ROLES.DOCTOR, label: "Doctor" },
//     { value: USER_ROLES.NURSE, label: "Nurse" },
//     { value: USER_ROLES.RECEPTIONIST, label: "Receptionist" },
//     { value: USER_ROLES.PHARMACIST, label: "Pharmacist" },
//     { value: USER_ROLES.LAB_TECH, label: "Lab Technician" },
//     { value: USER_ROLES.RADIOLOGIST, label: "Radiologist" },
//     { value: USER_ROLES.FINANCE, label: "Finance" },
//     { value: USER_ROLES.HR, label: "HR" },
//     { value: USER_ROLES.ADMIN, label: "Admin" },
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const staffData = {
//         employee_id: formData.employeeId,
//         name: formData.name,
//         email: formData.email,
//         department: formData.department,
//         phone: formData.phone,
//         role: formData.role,
//         username: formData.username,
//         password: formData.password || undefined,
//         is_active: formData.isActive,
//       };

//       let result;
//       if (staff) {
//         result = await staffService.update(staff.id, staffData);
//       } else {
//         result = await staffService.create(staffData);
//       }

//       onSuccess?.(result);
//     } catch (err) {
//       setError(err.message || "Failed to save staff member");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       {error && (
//         <Alert variant="danger" dismissible onClose={() => setError("")}>
//           {error}
//         </Alert>
//       )}

//       <Row className="gy-3">
//         <Col xs={12}>
//           <Form.Group>
//             <Form.Label>Employee Id</Form.Label>
//             <Form.Control
//               type="text"
//               name="employeeId"
//               placeholder="Enter employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>

//         <Col xs={12}>
//           <Form.Group>
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               placeholder="Enter name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>

//         <Col xs={12}>
//           <Form.Group>
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>

//         <Col xs={12}>
//           <Form.Group>
//             <Form.Label>Department</Form.Label>
//             <Form.Control
//               type="text"
//               name="department"
//               placeholder="Enter department"
//               value={formData.department}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>

//         <Col xs={12}>
//           <Form.Group>
//             <Form.Label>Phone</Form.Label>
//             <Form.Control
//               type="tel"
//               name="phone"
//               placeholder="Enter phone"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>

//         <Col xs={12}>
//           <Form.Group>
//             <Form.Label>Role</Form.Label>
//             <Form.Select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//             >
//               {roleOptions.map((r) => (
//                 <option key={r.value} value={r.value}>
//                   {r.label}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Col>

//         {/* New Username Field */}
//         <Col xs={12}>
//           <Form.Group>
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               type="text"
//               name="username"
//               placeholder="Enter username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>

//         {/* New Password Field */}
//         <Col xs={12}>
//           <Form.Group>
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               value={formData.password}
//               onChange={handleChange}
//               required={!staff} // only required when adding new staff
//             />
//           </Form.Group>
//         </Col>

//         {/* Active Checkbox */}
//         <Col xs={12}>
//           <Form.Check
//             type="checkbox"
//             name="isActive"
//             label="Active"
//             checked={formData.isActive}
//             onChange={handleChange}
//           />
//         </Col>
//       </Row>

//       <div className="pt-3">
//         <Button
//           type="submit"
//           variant="primary"
//           loading={loading}
//           className="w-100"
//         >
//           {staff ? "Update Staff" : "Add Staff"}
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default StaffRegistrationForm;

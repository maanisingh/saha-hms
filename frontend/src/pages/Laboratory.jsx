
// import { useState } from "react";
// import { FlaskConical, Search, Plus, FileCheck } from "../lib/icons";
// import { Button } from "../components/common/Button";
// import { DataTable } from "../components/common/DataTable";
// import { Modal } from "../components/common/Modal";

// export function Laboratory() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [labTests, setLabTests] = useState([
//     {
//       id: "1",
//       testId: "LAB001",
//       patientName: "John Doe",
//       testType: "Complete Blood Count",
//       orderedBy: "Dr. Sarah Wilson",
//       orderedDate: "2025-10-28",
//       status: "PENDING",
//     },
//     {
//       id: "2",
//       testId: "LAB002",
//       patientName: "Jane Smith",
//       testType: "Lipid Profile",
//       orderedBy: "Dr. Michael Chen",
//       orderedDate: "2024-10-28",
//       status: "IN_PROGRESS",
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     patientName: "",
//     testType: "",
//     orderedBy: "",
//     status: "PENDING",
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "PENDING":
//         return "bg-yellow-100 text-yellow-700";
//       case "IN_PROGRESS":
//         return "bg-blue-100 text-blue-700";
//       case "COMPLETED":
//         return "bg-green-100 text-green-700";
//       case "REJECTED":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newOrder = {
//       id: Date.now().toString(),
//       testId: `LAB${(labTests.length + 1).toString().padStart(3, "0")}`,
//       patientName: formData.patientName,
//       testType: formData.testType,
//       orderedBy: formData.orderedBy,
//       orderedDate: new Date().toISOString().split("T")[0],
//       status: formData.status,
//     };
//     setLabTests([newOrder, ...labTests]);
//     setIsModalOpen(false);
//     setFormData({ patientName: "", testType: "", orderedBy: "", status: "PENDING" });
//   };

//   return (
//     <div className="space-y-6 px-4 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
//             Laboratory
//           </h1>
//           <p className="text-gray-600 mt-1">Manage lab tests and results</p>
//         </div>
//         <div className="w-full sm:w-auto">
//           <Button
//             icon={Plus}
//             onClick={() => setIsModalOpen(true)}
//             className="w-full sm:w-auto"
//           >
//             Create Lab Order
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[
//           { label: "Total Today", value: labTests.length, icon: FlaskConical, color: "blue" },
//           { label: "Pending", value: labTests.filter(t => t.status === "PENDING").length, icon: FlaskConical, color: "yellow" },
//           { label: "In Progress", value: labTests.filter(t => t.status === "IN_PROGRESS").length, icon: FlaskConical, color: "purple" },
//           { label: "Completed", value: labTests.filter(t => t.status === "COMPLETED").length, icon: FileCheck, color: "green" },
//         ].map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white/70 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-semibold text-gray-900 mt-1">
//                   {stat.value}
//                 </p>
//               </div>
//               <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
//                 <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Lab Tests Table */}
//       <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-sm p-5 border border-gray-100">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div className="relative w-full sm:max-w-sm">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search lab tests..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         <DataTable
//           data={labTests.filter(
//             (t) =>
//               t.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               t.testType.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               t.testId.toLowerCase().includes(searchQuery.toLowerCase())
//           )}
//           columns={[
//             { header: "Test ID", accessor: "testId" },
//             { header: "Patient", accessor: "patientName" },
//             { header: "Test Type", accessor: "testType" },
//             { header: "Ordered By", accessor: "orderedBy" },
//             { header: "Date", accessor: "orderedDate" },
//             {
//               header: "Status",
//               accessor: (row) => (
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                     row.status
//                   )}`}
//                 >
//                   {row.status.replace("_", " ")}
//                 </span>
//               ),
//             },
//           ]}
//         />
//       </div>

//       {/* Modal Form */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Create Lab Order"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {[
//             { label: "Patient Name", key: "patientName" },
//             { label: "Test Type", key: "testType" },
//             { label: "Ordered By", key: "orderedBy" },
//           ].map((field) => (
//             <div key={field.key}>
//               <label className="block text-sm font-medium text-gray-700">
//                 {field.label}
//               </label>
//               <input
//                 type="text"
//                 value={formData[field.key]}
//                 onChange={(e) =>
//                   setFormData({ ...formData, [field.key]: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           ))}

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="PENDING">Pending</option>
//               <option value="IN_PROGRESS">In Progress</option>
//               <option value="COMPLETED">Completed</option>
//             </select>
//           </div>

//           <div className="flex justify-end gap-2 pt-4">
//             <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary">
//               Cancel
//             </Button>
//             <Button type="submit" variant="primary">
//               Save
//             </Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { FlaskConical, Search, Plus, FileCheck, Trash2, Edit2 } from "../lib/icons";
import { Button } from "../components/common/Button";
import { DataTable } from "../components/common/DataTable";
import { Modal } from "../components/common/Modal";

export function Laboratory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [labTests, setLabTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    testType: "",
    orderedBy: "",
    status: "PENDING",
  });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/lab";

  // ✅ Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Fetch all lab orders
  const fetchLabOrders = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setLabTests(data);
    } catch (error) {
      console.error("Error fetching lab orders:", error);
    }
  };

  useEffect(() => {
    fetchLabOrders();
  }, []);

  // ✅ Handle form submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchLabOrders();
        setIsModalOpen(false);
        setFormData({ patientName: "", testType: "", orderedBy: "", status: "PENDING" });
        setEditId(null);
      } else {
        console.error("Failed to save lab order:", await response.text());
      }
    } catch (error) {
      console.error("Error saving lab order:", error);
    }
  };

  // ✅ Edit lab order
  const handleEdit = (order) => {
    setEditId(order.id);
    setFormData({
      patientName: order.patientName,
      testType: order.testType,
      orderedBy: order.orderedBy,
      status: order.status,
    });
    setIsModalOpen(true);
  };

  // ✅ Delete lab order
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lab order?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      await fetchLabOrders();
    } catch (error) {
      console.error("Error deleting lab order:", error);
    }
  };

  // ✅ Filtered table data
  const filteredTests = labTests.filter(
    (t) =>
      t.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.testType?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
            Laboratory
          </h1>
          <p className="text-gray-600 mt-1">Manage lab tests and results</p>
        </div>
        <div className="w-full sm:w-auto">
          <Button icon={Plus} onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
            Create Lab Order
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search lab tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <DataTable
          data={filteredTests}
          columns={[
            { header: "ID", accessor: "id" },
            { header: "Patient", accessor: "patientName" },
            { header: "Test Type", accessor: "testType" },
            { header: "Ordered By", accessor: "orderedBy" },
            {
              header: "Status",
              accessor: (row) => (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}
                >
                  {row.status}
                </span>
              ),
            },
            {
              header: "Actions",
              accessor: (row) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(row)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditId(null);
        }}
        title={editId ? "Edit Lab Order" : "Create Lab Order"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="Test Type"
            value={formData.testType}
            onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="Ordered By"
            value={formData.orderedBy}
            onChange={(e) => setFormData({ ...formData, orderedBy: e.target.value })}
            className="w-full border rounded-lg p-2"
            required
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border rounded-lg p-2"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <Button type="submit" variant="primary" className="w-full">
            {editId ? "Update" : "Save"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}

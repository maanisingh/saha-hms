

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "../components/common/Button";
// import { X, Edit2, Trash2, Plus } from "lucide-react";

// export default function Prescriptions() {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [medicines, setMedicines] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     patientId: "",
//     doctorId: "",
//     notes: "",
//     items: [],
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const API_BASE = "http://localhost:5000/api";

//   // ---------------- Fetch Data ----------------
//   useEffect(() => {
//     fetchAllPrescriptions();
//     fetchDoctors();
//     fetchPatients();
//     fetchMedicines();
//   }, []);

//   const fetchAllPrescriptions = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/prescriptions`);
//       setPrescriptions(res.data);
//     } catch (error) {
//       console.error("Error fetching prescriptions:", error);
//     }
//   };

//   const fetchDoctors = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/doctors`);
//       setDoctors(res.data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const fetchPatients = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/patients`);
//       setPatients(res.data);
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   const fetchMedicines = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/medicines`);
//       setMedicines(res.data);
//     } catch (error) {
//       console.error("Error fetching medicines:", error);
//     }
//   };

//   // ---------------- Handle Form ----------------
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...formData.items];
//     newItems[index][field] = value;
//     setFormData({ ...formData, items: newItems });
//   };

//   const addItem = () => {
//     setFormData({
//       ...formData,
//       items: [...formData.items, { medicineId: "", dosage: "", quantity: 1, durationDays: 1 }],
//     });
//   };

//   const removeItem = (index) => {
//     const newItems = formData.items.filter((_, i) => i !== index);
//     setFormData({ ...formData, items: newItems });
//   };

//   // ---------------- Save ----------------
//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       const payload = {
//         ...formData,
//         doctorId: Number(formData.doctorId),
//         patientId: Number(formData.patientId),
//         items: formData.items.map((i) => ({
//           ...i,
//           medicineId: Number(i.medicineId),
//           quantity: Number(i.quantity),
//           durationDays: Number(i.durationDays),
//         })),
//       };

//       if (editingId) {
//         await axios.put(`${API_BASE}/prescriptions/${editingId}`, payload);
//       } else {
//         await axios.post(`${API_BASE}/prescriptions`, payload);
//       }

//       await fetchAllPrescriptions();
//       setShowForm(false);
//       resetForm();
//     } catch (error) {
//       console.error("Error saving prescription:", error);
//       alert("Failed to save prescription!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setFormData({ patientId: "", doctorId: "", notes: "", items: [] });
//   };

//   const handleEdit = (p) => {
//     setEditingId(p.id);
//     setFormData({
//       patientId: p.patientId,
//       doctorId: p.doctorId,
//       notes: p.notes || "",
//       items: p.items?.map((i) => ({
//         medicineId: i.medicineId,
//         dosage: i.dosage || "",
//         quantity: i.quantity || 1,
//         durationDays: i.durationDays || 1,
//       })) || [],
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this prescription?")) return;
//     try {
//       await axios.delete(`${API_BASE}/prescriptions/${id}`);
//       await fetchAllPrescriptions();
//     } catch (error) {
//       console.error("Error deleting prescription:", error);
//       alert("Failed to delete prescription!");
//     }
//   };

//   const getDoctorName = (id) => {
//     const doc = doctors.find((d) => d.id === id);
//     return doc ? `${doc.fullName} (${doc.speciality})` : "N/A";
//   };

//   const getPatientName = (id) => {
//     const p = patients.find((pt) => pt.id === id);
//     return p ? `${p.user?.firstName} ${p.user?.lastName}` : "N/A";
//   };

//   const getMedicineNames = (items) => {
//     return items?.map((i) => {
//       const m = medicines.find((med) => med.id === i.medicineId);
//       return m ? `${m.brandName} (${i.dosage})` : "-";
//     }).join(", ");
//   };

//   // ---------------- UI ----------------
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Prescriptions</h2>
//         <Button onClick={() => { resetForm(); setShowForm(true); }}>+ Add Prescription</Button>
//       </div>

//       {/* ---------------- Form Modal ---------------- */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-2xl shadow-lg w-[700px] relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>

//             <h3 className="text-xl font-semibold mb-4 text-purple-700">
//               {editingId ? "Edit Prescription" : "Add New Prescription"}
//             </h3>

//             {/* Patient & Doctor */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label>Patient</label>
//                 <select name="patientId" value={formData.patientId} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md">
//                   <option value="">Select Patient</option>
//                   {patients.map((p) => (
//                     <option key={p.id} value={p.id}>{p.user?.firstName} {p.user?.lastName}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label>Doctor</label>
//                 <select name="doctorId" value={formData.doctorId} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md">
//                   <option value="">Select Doctor</option>
//                   {doctors.map((d) => (
//                     <option key={d.id} value={d.id}>{d.fullName} — {d.speciality}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Notes */}
//             <div className="mb-4">
//               <label>Notes</label>
//               <textarea
//                 rows={2}
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border rounded-md"
//               ></textarea>
//             </div>

//             {/* Prescription Items */}
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <h4 className="font-semibold">Medicines</h4>
//                 <Button onClick={addItem} className="flex items-center gap-2">
//                   <Plus size={16} /> Add Medicine
//                 </Button>
//               </div>
//               {formData.items.map((item, index) => (
//                 <div key={index} className="grid grid-cols-5 gap-2 mb-2 items-end">
//                   <select
//                     value={item.medicineId}
//                     onChange={(e) => handleItemChange(index, "medicineId", e.target.value)}
//                     className="p-2 border rounded-md"
//                   >
//                     <option value="">Select Medicine</option>
//                     {medicines.map((m) => (
//                       <option key={m.id} value={m.id}>{m.brandName} — {m.strength}</option>
//                     ))}
//                   </select>

//                   <input
//                     type="text"
//                     placeholder="Dosage"
//                     value={item.dosage}
//                     onChange={(e) => handleItemChange(index, "dosage", e.target.value)}
//                     className="p-2 border rounded-md"
//                   />

//                   <input
//                     type="number"
//                     placeholder="Quantity"
//                     value={item.quantity}
//                     onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
//                     className="p-2 border rounded-md"
//                   />

//                   <input
//                     type="number"
//                     placeholder="Days"
//                     value={item.durationDays}
//                     onChange={(e) => handleItemChange(index, "durationDays", e.target.value)}
//                     className="p-2 border rounded-md"
//                   />

//                   <button onClick={() => removeItem(index)} className="text-red-600 hover:text-red-800">
//                     <X size={20} />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end mt-4">
//               <Button onClick={handleSave} disabled={loading} className="bg-purple-600 text-white hover:bg-purple-700">
//                 {loading ? "Saving..." : editingId ? "Update" : "Save"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ---------------- Prescription Table ---------------- */}
//       <div className="mt-8 overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg">
//           <thead className="bg-purple-100">
//             <tr>
//               <th>#</th>
//               <th>Patient</th>
//               <th>Doctor</th>
//               <th>Medicines</th>
//               <th>Notes</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {prescriptions.length > 0 ? (
//               prescriptions.map((p, index) => (
//                 <tr key={p.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2">{index + 1}</td>
//                   <td className="px-4 py-2">{getPatientName(p.patientId)}</td>
//                   <td className="px-4 py-2">{getDoctorName(p.doctorId)}</td>
//                   <td className="px-4 py-2">{getMedicineNames(p.items)}</td>
//                   <td className="px-4 py-2">{p.notes || "-"}</td>
//                   <td className="px-4 py-2 flex gap-3">
//                     <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800">
//                       <Edit2 size={16} />
//                     </button>
//                     <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500 italic">
//                   No prescriptions found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



// update

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/common/Button";
import { X, Edit2, Trash2, Plus } from "lucide-react";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    notes: "",
    items: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    fetchAllPrescriptions();
    fetchDoctors();
    fetchPatients();
    fetchMedicines();
  }, []);

  const fetchAllPrescriptions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/prescriptions`);
      setPrescriptions(res.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API_BASE}/doctors`);
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${API_BASE}/patients`);
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${API_BASE}/medicines`);
      setMedicines(res.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...formData.items];
    updated[index][field] = value;
    setFormData({ ...formData, items: updated });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { medicineId: "", dosage: "", quantity: 1, durationDays: 1 },
      ],
    });
  };

  const removeItem = (index) => {
    const updated = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updated });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        patientId: Number(formData.patientId),
        doctorId: Number(formData.doctorId),
        items: formData.items.map((i) => ({
          ...i,
          medicineId: Number(i.medicineId),
          quantity: Number(i.quantity),
          durationDays: Number(i.durationDays),
        })),
      };

      if (editingId)
        await axios.put(`${API_BASE}/prescriptions/${editingId}`, payload);
      else await axios.post(`${API_BASE}/prescriptions`, payload);

      await fetchAllPrescriptions();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving prescription!");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      patientId: "",
      doctorId: "",
      notes: "",
      items: [],
    });
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      patientId: p.patientId,
      doctorId: p.doctorId,
      notes: p.notes || "",
      items:
        p.items?.map((i) => ({
          medicineId: i.medicineId,
          dosage: i.dosage,
          quantity: i.quantity,
          durationDays: i.durationDays,
        })) || [],
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this prescription?")) return;
    try {
      await axios.delete(`${API_BASE}/prescriptions/${id}`);
      await fetchAllPrescriptions();
    } catch (error) {
      alert("Failed to delete!");
    }
  };

  const getDoctorName = (id) => {
    const d = doctors.find((x) => x.id === id);
    return d ? `${d.fullName} (${d.speciality})` : "N/A";
  };

  const getPatientName = (id) => {
    const p = patients.find((x) => x.id === id);
    return p ? `${p.user?.firstName} ${p.user?.lastName}` : "N/A";
  };

  const getMedicineNames = (items) => {
    return (
      items
        ?.map((i) => {
          const m = medicines.find((med) => med.id === i.medicineId);
          return m ? `${m.brandName} (${i.dosage})` : "";
        })
        .join(", ") || "-"
    );
  };

  return (
    <div className="space-y-8 px-2 sm:px-6 lg:px-8 mt-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 text-sm">Manage patient prescriptions</p>
        </div>

        <Button
          icon={Plus}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="w-full sm:w-auto"
        >
          Add Prescription
        </Button>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 py-6">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-xl overflow-auto max-h-[90vh] relative">

            <button
              onClick={() => setShowForm(false)}
              className="absolute right-6 top-6 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center">
              {editingId ? "Edit Prescription" : "Add Prescription"}
            </h2>

            {/* PATIENT & DOCTOR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium">Patient</label>
                <select
                  className="w-full border rounded-lg p-2 mt-1"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                >
                  <option value="">Select Patient</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.user?.firstName} {p.user?.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Doctor</label>
                <select
                  className="w-full border rounded-lg p-2 mt-1"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.fullName} — {d.speciality}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* NOTES */}
            <div>
              <label className="text-sm font-medium">Notes</label>
              <textarea
                className="w-full border rounded-lg p-2 mt-2"
                rows={2}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* MEDICINES */}
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Medicines</h3>
                <Button icon={Plus} onClick={addItem}>
                  Add Item
                </Button>
              </div>

              <div className="mt-4 space-y-3">
                {formData.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-start"
                  >
                    <select
                      value={item.medicineId}
                      onChange={(e) =>
                        handleItemChange(index, "medicineId", e.target.value)
                      }
                      className="border rounded-lg p-2"
                    >
                      <option>Select Medicine</option>
                      {medicines.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.brandName} — {m.strength}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Dosage"
                      value={item.dosage}
                      onChange={(e) =>
                        handleItemChange(index, "dosage", e.target.value)
                      }
                      className="border rounded-lg p-2"
                    />

                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      className="border rounded-lg p-2"
                    />

                    <input
                      type="number"
                      placeholder="Days"
                      value={item.durationDays}
                      onChange={(e) =>
                        handleItemChange(index, "durationDays", e.target.value)
                      }
                      className="border rounded-lg p-2"
                    />

                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <X />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSave}
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? "Saving..." : editingId ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-3">#</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Medicines</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((p, index) => (
                <tr key={p.id} className="border-t text-sm hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{getPatientName(p.patientId)}</td>
                  <td className="p-3">{getDoctorName(p.doctorId)}</td>
                  <td className="p-3">{getMedicineNames(p.items)}</td>
                  <td className="p-3">{p.notes || "-"}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 italic text-gray-500"
                >
                  No prescriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

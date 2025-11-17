

// import React, { useState, useEffect } from "react";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import { Button } from "../components/common/Button";

// // ✅ API Base URL (backend ka)
// const API_URL = "http://localhost:5000/api/medicines";

// export default function Pharmacy() {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     brandName: "",
//     genericName: "",
//     strength: "",
//     stock: "",
//     reorderLevel: "",
//     expiryDate: "",
//     manufacturer: "",
//     batchNumber: "",
//     status: "IN_STOCK",
//     notes: "",
//   });

//   // ✅ Fetch all medicines
//   const fetchMedicines = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(API_URL);
//       const data = await res.json();
//       console.log("Fetched data:", data); // 🧠 Debug
//       setMedicines(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching medicines:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   // ✅ Handle input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Submit new medicine
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Medicine added successfully!");
//         setShowModal(false);
//         setFormData({
//           brandName: "",
//           genericName: "",
//           strength: "",
//           stock: "",
//           reorderLevel: "",
//           expiryDate: "",
//           manufacturer: "",
//           batchNumber: "",
//           status: "IN_STOCK",
//           notes: "",
//         });
//         fetchMedicines();
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error adding medicine:", error);
//     }
//   };

//   // ✅ Delete medicine
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this medicine?")) return;
//     try {
//       await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       fetchMedicines();
//     } catch (error) {
//       console.error("Error deleting medicine:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* ✅ Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-purple-700">Pharmacy Management</h1>
//         <Button onClick={() => setShowModal(true)} className="flex items-center bg-purple-600 hover:bg-purple-700">
//           <FaPlus className="mr-2" /> Add Medicine
//         </Button>
//       </div>

//       {/* ✅ Table */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//           <table className="min-w-full border-collapse">
//             <thead className="bg-purple-100">
//               <tr>
//                 <th className="p-3 border">ID</th>
//                 <th className="p-3 border">Brand Name</th>
//                 <th className="p-3 border">Generic Name</th>
//                 <th className="p-3 border">Strength</th>
//                 <th className="p-3 border">Stock</th>
//                 <th className="p-3 border">Status</th>
//                 <th className="p-3 border">Expiry</th>
//                 <th className="p-3 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {medicines.length > 0 ? (
//                 medicines.map((med) => (
//                   <tr key={med.id} className="hover:bg-purple-50 text-center">
//                     <td className="p-3 border">{med.id}</td>
//                     <td className="p-3 border">{med.brandName}</td>
//                     <td className="p-3 border">{med.genericName}</td>
//                     <td className="p-3 border">{med.strength}</td>
//                     <td className="p-3 border">{med.stock}</td>
//                     <td className="p-3 border">{med.status}</td>
//                     <td className="p-3 border">
//                       {med.expiryDate ? new Date(med.expiryDate).toLocaleDateString() : "-"}
//                     </td>
//                     <td className="p-3 border space-x-2">
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(med.id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="p-4 text-center text-gray-500">
//                     No medicines found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ✅ Modal Form */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
//             <h2 className="text-xl font-semibold mb-4 text-purple-700">Add New Medicine</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//               <input type="text" name="brandName" placeholder="Brand Name" value={formData.brandName} onChange={handleChange} required className="border p-2 rounded" />
//               <input type="text" name="genericName" placeholder="Generic Name" value={formData.genericName} onChange={handleChange} required className="border p-2 rounded" />
//               <input type="text" name="strength" placeholder="Strength" value={formData.strength} onChange={handleChange} required className="border p-2 rounded" />
//               <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="border p-2 rounded" />
//               <input type="number" name="reorderLevel" placeholder="Reorder Level" value={formData.reorderLevel} onChange={handleChange} className="border p-2 rounded" />
//               <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="border p-2 rounded" />
//               <input type="text" name="manufacturer" placeholder="Manufacturer" value={formData.manufacturer} onChange={handleChange} className="border p-2 rounded" />
//               <input type="text" name="batchNumber" placeholder="Batch No." value={formData.batchNumber} onChange={handleChange} className="border p-2 rounded" />
//               <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
//                 <option value="IN_STOCK">In Stock</option>
//                 <option value="OUT_OF_STOCK">Out of Stock</option>
//               </select>
//               <input type="text" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} className="border p-2 rounded col-span-2" />

//               <div className="col-span-2 flex justify-end gap-2 mt-3">
//                 <Button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 hover:bg-gray-500">
//                   Cancel
//                 </Button>
//                 <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
//                   Save
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// update


// import React, { useState, useEffect } from "react";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import { Button } from "../components/common/Button";

// // ✅ API Base URL (backend ka)
// const API_URL = "http://localhost:5000/api/medicines";

// export default function Pharmacy() {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     brandName: "",
//     genericName: "",
//     strength: "",
//     stock: "",
//     reorderLevel: "",
//     expiryDate: "",
//     manufacturer: "",
//     batchNumber: "",
//     status: "IN_STOCK",
//     notes: "",
//   });

//   // ✅ Fetch all medicines
//   const fetchMedicines = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(API_URL);
//       const data = await res.json();
//       setMedicines(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching medicines:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   // ✅ Handle input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Submit new medicine
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Medicine added successfully!");
//         setShowModal(false);
//         setFormData({
//           brandName: "",
//           genericName: "",
//           strength: "",
//           stock: "",
//           reorderLevel: "",
//           expiryDate: "",
//           manufacturer: "",
//           batchNumber: "",
//           status: "IN_STOCK",
//           notes: "",
//         });
//         fetchMedicines();
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error adding medicine:", error);
//     }
//   };

//   // ✅ Delete medicine
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this medicine?")) return;
//     try {
//       await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       fetchMedicines();
//     } catch (error) {
//       console.error("Error deleting medicine:", error);
//     }
//   };

//   return (
//     <div className="p-6">

//       {/* ✅ Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold ">Pharmacy Management</h1>

//         <Button
//           onClick={() => setShowModal(true)}
//           className="flex items-center px-4 py-2 rounded-lg"
//         >
//           Add Medicine<FaPlus className="mr-2" />
//         </Button>
//       </div>

//       {/* ✅ Table Wrapper */}
//       {loading ? (
//         <p className="text-center text-gray-600">Loading...</p>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-lg">

//           <table className="min-w-full text-sm sm:text-base">
//             <thead className="bg-gray-200 rounded-t-xl">
//               <tr>
//                 <th className="p-3 border">ID</th>
//                 <th className="p-3 border">Brand Name</th>
//                 <th className="p-3 border">Generic Name</th>
//                 <th className="p-3 border">Strength</th>
//                 <th className="p-3 border">Stock</th>
//                 <th className="p-3 border">Status</th>
//                 <th className="p-3 border">Expiry</th>
//                 <th className="p-3 border">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {medicines.length > 0 ? (
//                 medicines.map((med) => (
//                   <tr
//                     key={med.id}
//                     className="hover:bg-purple-50 even:bg-gray-50 text-center transition-all"
//                   >
//                     <td className="p-3 border">{med.id}</td>
//                     <td className="p-3 border">{med.brandName}</td>
//                     <td className="p-3 border">{med.genericName}</td>
//                     <td className="p-3 border">{med.strength}</td>
//                     <td className="p-3 border">{med.stock}</td>
//                     <td className="p-3 border font-semibold text-purple-700">{med.status}</td>
//                     <td className="p-3 border">
//                       {med.expiryDate ? new Date(med.expiryDate).toLocaleDateString() : "-"}
//                     </td>

//                     <td className="p-3 border flex justify-center gap-4">
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <FaEdit />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(med.id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="p-6 text-center text-gray-500">
//                     No medicines found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//         </div>
//       )}

//       {/* ✅ Modal Form */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">

//           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-gray-200 p-6">

//             <h2 className="text-xl font-semibold mb-4 text-purple-700">
//               Add New Medicine
//             </h2>

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//               <input type="text" name="brandName" placeholder="Brand Name" value={formData.brandName} onChange={handleChange} required className="border p-2 rounded-lg" />
//               <input type="text" name="genericName" placeholder="Generic Name" value={formData.genericName} onChange={handleChange} required className="border p-2 rounded-lg" />
//               <input type="text" name="strength" placeholder="Strength" value={formData.strength} onChange={handleChange} required className="border p-2 rounded-lg" />
//               <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="border p-2 rounded-lg" />
//               <input type="number" name="reorderLevel" placeholder="Reorder Level" value={formData.reorderLevel} onChange={handleChange} className="border p-2 rounded-lg" />
//               <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="border p-2 rounded-lg" />
//               <input type="text" name="manufacturer" placeholder="Manufacturer" value={formData.manufacturer} onChange={handleChange} className="border p-2 rounded-lg" />
//               <input type="text" name="batchNumber" placeholder="Batch No." value={formData.batchNumber} onChange={handleChange} className="border p-2 rounded-lg" />

//               <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded-lg">
//                 <option value="IN_STOCK">In Stock</option>
//                 <option value="OUT_OF_STOCK">Out of Stock</option>
//               </select>

//               <input
//                 type="text"
//                 name="notes"
//                 placeholder="Notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 className="border p-2 rounded-lg sm:col-span-2"
//               />

//               <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
//                 <Button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
//                 >
//                   Cancel
//                 </Button>

//                 <Button
//                   type="submit"
//                   className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
//                 >
//                   Save
//                 </Button>
//               </div>

//             </form>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../components/common/Button";
import { useTranslation } from 'react-i18next';

// ✅ API Base URL (backend ka)
const API_URL = "http://localhost:5000/api/medicines";

export default function Pharmacy() {
  const { t } = useTranslation('pharmacy');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    brandName: "",
    genericName: "",
    strength: "",
    stock: "",
    reorderLevel: "",
    expiryDate: "",
    manufacturer: "",
    batchNumber: "",
    status: "IN_STOCK",
    notes: "",
  });

  // ✅ Fetch all medicines
  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setMedicines(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit new medicine
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`✅ ${t('medicineAddedSuccess')}`);
        setShowModal(false);
        setFormData({
          brandName: "",
          genericName: "",
          strength: "",
          stock: "",
          reorderLevel: "",
          expiryDate: "",
          manufacturer: "",
          batchNumber: "",
          status: "IN_STOCK",
          notes: "",
        });
        fetchMedicines();
      } else {
        alert(`❌ ${t('addMedicineError')}: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  // ✅ Delete medicine
  const handleDelete = async (id) => {
    if (!window.confirm(t('deleteConfirm'))) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchMedicines();
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6">

      {/* ✅ Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">{t('title')}</h1>

        <Button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 rounded-lg"
        >
          <FaPlus className="mr-2" />
          {t('addMedicine')}
        </Button>
      </div>

      {/* ✅ Table Wrapper */}
      {loading ? (
        <p className="text-center text-gray-600">{t('loading')}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-lg w-full">

          <table className="min-w-full text-xs sm:text-sm md:text-base">
            <thead className="bg-gray-200 rounded-t-xl">
              <tr>
                <th className="p-3 border">{t('id')}</th>
                <th className="p-3 border">{t('brandName')}</th>
                <th className="p-3 border">{t('genericName')}</th>
                <th className="p-3 border">{t('strength')}</th>
                <th className="p-3 border">{t('stock')}</th>
                <th className="p-3 border">{t('status')}</th>
                <th className="p-3 border">{t('expiry')}</th>
                <th className="p-3 border">{t('actions')}</th>
              </tr>
            </thead>

            <tbody>
              {medicines.length > 0 ? (
                medicines.map((med) => (
                  <tr
                    key={med.id}
                    className="hover:bg-purple-50 even:bg-gray-50 text-center transition-all"
                  >
                    <td className="p-3 border whitespace-normal break-words">{med.id}</td>
                    <td className="p-3 border whitespace-normal break-words">{med.brandName}</td>
                    <td className="p-3 border whitespace-normal break-words">{med.genericName}</td>
                    <td className="p-3 border whitespace-normal break-words">{med.strength}</td>
                    <td className="p-3 border whitespace-normal break-words">{med.stock}</td>
                    <td className="p-3 border font-semibold text-purple-700 whitespace-normal break-words">{med.status}</td>
                    <td className="p-3 border whitespace-normal break-words">
                      {med.expiryDate ? new Date(med.expiryDate).toLocaleDateString() : "-"}
                    </td>

                    <td className="p-3 border flex justify-center gap-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(med.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    {t('noMedicinesFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      )}

      {/* ✅ Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-gray-200 p-6 max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-semibold mb-4 text-purple-700">
              {t('addNewMedicine')}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

              <input type="text" name="brandName" placeholder={t('brandNamePlaceholder')} value={formData.brandName} onChange={handleChange} required className="border p-2 rounded-lg" />
              <input type="text" name="genericName" placeholder={t('genericNamePlaceholder')} value={formData.genericName} onChange={handleChange} required className="border p-2 rounded-lg" />
              <input type="text" name="strength" placeholder={t('strengthPlaceholder')} value={formData.strength} onChange={handleChange} required className="border p-2 rounded-lg" />
              <input type="number" name="stock" placeholder={t('stockPlaceholder')} value={formData.stock} onChange={handleChange} className="border p-2 rounded-lg" />
              <input type="number" name="reorderLevel" placeholder={t('reorderLevelPlaceholder')} value={formData.reorderLevel} onChange={handleChange} className="border p-2 rounded-lg" />
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="border p-2 rounded-lg" />
              <input type="text" name="manufacturer" placeholder={t('manufacturerPlaceholder')} value={formData.manufacturer} onChange={handleChange} className="border p-2 rounded-lg" />
              <input type="text" name="batchNumber" placeholder={t('batchNumberPlaceholder')} value={formData.batchNumber} onChange={handleChange} className="border p-2 rounded-lg" />

              <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded-lg">
                <option value="IN_STOCK">{t('inStock')}</option>
                <option value="OUT_OF_STOCK">{t('outOfStock')}</option>
              </select>

              <input
                type="text"
                name="notes"
                placeholder={t('notesPlaceholder')}
                value={formData.notes}
                onChange={handleChange}
                className="border p-2 rounded-lg sm:col-span-2"
              />

              <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4">
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  {t('cancel')}
                </Button>

                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  {t('save')}
                </Button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

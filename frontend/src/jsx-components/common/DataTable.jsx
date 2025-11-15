// import { Table, Form, Pagination } from 'react-bootstrap';
// import { useState } from 'react';

// export const DataTable = ({
//   columns,
//   data,
//   loading = false,
//   onRowClick,
//   striped = true,
//   hover = true,
//   bordered = false,
//   pageSize = 10,
//   searchable = true,
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredData = searchable
//     ? data.filter((row) =>
//         columns.some((col) => {
//           const value = col.accessor ? col.accessor(row) : row[col.key];
//           return String(value).toLowerCase().includes(searchTerm.toLowerCase());
//         })
//       )
//     : data;

//   const totalPages = Math.ceil(filteredData.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       {searchable && (
//         <div className="mb-3">
//           <Form.Control
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>
//       )}

//       <div className="table-responsive">
//         <Table striped={striped} hover={hover} bordered={bordered}>
//           <thead className="bg-light">
//             <tr>
//               {columns.map((col, index) => (
//                 <th key={index} style={{ minWidth: col.minWidth }}>
//                   {col.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={columns.length} className="text-center py-5">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </td>
//               </tr>
//             ) : paginatedData.length === 0 ? (
//               <tr>
//                 <td colSpan={columns.length} className="text-center py-5 text-muted">
//                   No data available
//                 </td>
//               </tr>
//             ) : (
//               paginatedData.map((row, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   onClick={() => onRowClick && onRowClick(row)}
//                   style={{ cursor: onRowClick ? 'pointer' : 'default' }}
//                 >
//                   {columns.map((col, colIndex) => (
//                     <td key={colIndex}>
//                       {col.render
//                         ? col.render(row)
//                         : col.accessor
//                         ? col.accessor(row)
//                         : row[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>
//       </div>

//       {totalPages > 1 && (
//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <div className="text-muted small">
//             Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredData.length)} of{' '}
//             {filteredData.length} entries
//           </div>
//           <Pagination className="mb-0">
//             <Pagination.Prev
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             />
//             {[...Array(totalPages)].map((_, index) => (
//               <Pagination.Item
//                 key={index + 1}
//                 active={currentPage === index + 1}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </Pagination.Item>
//             ))}
//             <Pagination.Next
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             />
//           </Pagination>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DataTable;



import { Table, Form, Pagination } from "react-bootstrap";
import { useState } from "react";

export const DataTable = ({
  columns,
  data,
  loading = false,
  onRowClick,
  striped = true,
  hover = true,
  bordered = false,
  pageSize = 10,
  searchable = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Filtered Data
  const filteredData = searchable
    ? data.filter((row) =>
        columns.some((col) => {
          const value = col.accessor ? col.accessor(row) : row[col.key];
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    : data;

  // 🔢 Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white rounded-3 shadow-sm p-3 p-md-4 border border-light-subtle">
      {/* 🔍 Search Bar */}
      {searchable && (
        <div className="mb-3 d-flex justify-content-end">
          <Form.Control
            type="text"
            placeholder="🔍 Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-100 w-md-50"
          />
        </div>
      )}

      {/* 🧾 Table */}
      <div className="table-responsive rounded-2">
        <Table
          striped={striped}
          hover={hover}
          bordered={bordered}
          className="align-middle text-nowrap"
        >
          <thead className="bg-light text-secondary">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  style={{ minWidth: col.minWidth || "120px" }}
                  className="fw-semibold small text-uppercase"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-5 text-muted"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`${
                    onRowClick ? "table-row-clickable" : ""
                  } transition-all`}
                  style={{
                    cursor: onRowClick ? "pointer" : "default",
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>
                      {col.render
                        ? col.render(row)
                        : col.accessor
                        ? col.accessor(row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2">
          <div className="text-muted small text-center text-md-start">
            Showing <strong>{startIndex + 1}</strong> to{" "}
            <strong>
              {Math.min(startIndex + pageSize, filteredData.length)}
            </strong>{" "}
            of <strong>{filteredData.length}</strong> entries
          </div>

          <Pagination className="mb-0 justify-content-center">
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DataTable;

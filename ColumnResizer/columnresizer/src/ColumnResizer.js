// // ColumnResizer.js
// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // 컬럼 정의
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   // 데이터 생성
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );
//   const isResizing = useRef(false);
//   const resizingColumn = useRef(null);
//   const startX = useRef(0);
//   const startWidth = useRef(0);

//   // 마우스 다운 이벤트로 리사이징 초기화
//   const handleMouseDown = (e, columnKey) => {
//     isResizing.current = true;
//     resizingColumn.current = columnKey;
//     startX.current = e.clientX;
//     startWidth.current = columnWidths[columnKey];
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // 마우스 이동 중 컬럼 너비 조정
//   const handleMouseMove = (e) => {
//     if (!isResizing.current) return;
//     const dx = e.clientX - startX.current;
//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [resizingColumn.current]: Math.max(startWidth.current + dx, 50),
//     }));
//   };

//   // 마우스 업 이벤트로 리사이징 종료
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumn.current = null;
//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               key={column.key}
//               style={{ width: `${columnWidths[column.key]}px`, position: 'relative' }}
//             >
//               {column.label}
//               <div
//                 className="column-resizer"
//                 onMouseDown={(e) => handleMouseDown(e, column.key)}
//               ></div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;

// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // 컬럼 정의
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   // 데이터 생성
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );
//   const isResizing = useRef(false);
//   const resizingColumn = useRef(null);
//   const startX = useRef(0);

//   // 리사이징 시작
//   const handleMouseDown = (e, columnKey) => {
//     isResizing.current = true;
//     resizingColumn.current = columnKey;
//     startX.current = e.clientX;

//     // 마우스 이동과 마우스 릴리즈 이벤트 등록
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // 마우스 이동에 따른 컬럼 너비 조정
//   const handleMouseMove = (e) => {
//     if (!isResizing.current) return;
//     const dx = e.clientX - startX.current;

//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [resizingColumn.current]: Math.max(prevWidths[resizingColumn.current] + dx, 50),
//     }));

//     startX.current = e.clientX; // 시작 위치 업데이트 (부드러운 움직임을 위해)
//   };

//   // 리사이징 종료
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumn.current = null;

//     // 이벤트 제거
//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               key={column.key}
//               style={{ width: `${columnWidths[column.key]}px`, position: 'relative' }}
//             >
//               {column.label}
//               <div
//                 className="column-resizer"
//                 onMouseDown={(e) => handleMouseDown(e, column.key)}
//               ></div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;

// ColumnResizer.js
// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // 컬럼 정의
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   // 데이터 생성
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );
//   const isResizing = useRef(false);
//   const resizingColumn = useRef(null);
//   const startX = useRef(0);

//   // 리사이징 시작
//   const handleMouseDown = (e, columnKey) => {
//     // 왼쪽 클릭 체크
//     if (e.button !== 0) return;

//     isResizing.current = true;
//     resizingColumn.current = columnKey;
//     startX.current = e.clientX;

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // 마우스 이동에 따른 컬럼 너비 조정
//   const handleMouseMove = (e) => {
//     if (!isResizing.current) return;

//     // 이동 거리 계산 및 속도 조절
//     const dx = (e.clientX - startX.current) * 0.5; // 속도 조절
//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [resizingColumn.current]: Math.max(prevWidths[resizingColumn.current] + dx, 50),
//     }));

//     startX.current = e.clientX;
//   };

//   // 리사이징 종료
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumn.current = null;

//     // 이벤트 제거
//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               key={column.key}
//               style={{ width: `${columnWidths[column.key]}px`, position: 'relative' }}
//             >
//               {column.label}
//               <div
//                 className="column-resizer"
//                 onMouseDown={(e) => handleMouseDown(e, column.key)}
//               ></div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;

// ColumnResizer.js
// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // 컬럼 정의
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   // 데이터 생성
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );
//   const isResizing = useRef(false);
//   const resizingColumn = useRef(null);
//   const startX = useRef(0);

//   // 리사이징 시작
//   const handleMouseDown = (e, columnKey) => {
//     if (e.button !== 0) return;

//     isResizing.current = true;
//     resizingColumn.current = columnKey;
//     startX.current = e.clientX;

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // 마우스 이동에 따른 컬럼 너비 조정
//   const handleMouseMove = (e) => {
//     if (!isResizing.current) return;

//     // 이동 거리 계산 및 컬럼 속도 증가
//     const dx = (e.clientX - startX.current) * 2; // 비율을 2로 설정하여 빠르게 이동
//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [resizingColumn.current]: Math.max(prevWidths[resizingColumn.current] + dx, 50),
//     }));

//     startX.current = e.clientX;
//   };

//   // 리사이징 종료
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumn.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               key={column.key}
//               style={{ width: `${columnWidths[column.key]}px`, position: 'relative' }}
//             >
//               {column.label}
//               <div
//                 className="column-resizer"
//                 onMouseDown={(e) => handleMouseDown(e, column.key)}
//               ></div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;

// ColumnResizer.js
// import React, { useState, useRef, useEffect } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   const columns = [
//     { key: 'name', label: '이름' },
//     { key: 'modifiedDate', label: '수정한 날짜' },
//     { key: 'type', label: '유형' },
//     { key: 'size', label: '크기' },
//   ];

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 150 }), {})
//   );

//   const isResizing = useRef(false);
//   const resizingColumn = useRef(null);
//   const startX = useRef(0);
//   const startWidth = useRef(0);

//   // 리사이징 시작
//   const handleMouseDown = (e, columnKey) => {
//     if (e.button !== 0) return; // 왼쪽 버튼이 아닌 경우 리턴

//     isResizing.current = true;
//     resizingColumn.current = columnKey;
//     startX.current = e.clientX;
//     startWidth.current = columnWidths[columnKey];

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // 마우스 이동 시 컬럼 너비 업데이트
//   const handleMouseMove = (e) => {
//     if (!isResizing.current) return;

//     const dx = e.clientX - startX.current;
//     const newWidth = Math.max(startWidth.current + dx, 50); // 최소 너비 50px

//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [resizingColumn.current]: newWidth,
//     }));
//   };

//   // 리사이징 종료
//   const handleMouseUp = () => {
//     if (!isResizing.current) return;

//     isResizing.current = false;
//     resizingColumn.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   const [mouseX, setMouseX] = useState(null);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMouseX(e.clientX);
//     };

//     // 마우스 움직임 이벤트 리스너 추가
//     document.addEventListener('mousemove', handleMouseMove);

//     // 컴포넌트 언마운트 시 이벤트 리스너 제거
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               key={column.key}
//               style={{ width: `${columnWidths[column.key]}px`, position: 'relative' }}
//             >
//               {column.label}
//               <div
//                 className="column-resizer"
//                 onMouseDown={(e) => handleMouseDown(e, column.key)}
//               ></div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {/* 여기에 데이터 행 추가 */}
//       </tbody>
//       <div className="mouse-line-container">
//         <div className="mouse-line" style={{ left: mouseX }} />
//       </div>
//     </table>
//   );
// };

// export default ColumnResizer;

// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // 컬럼 정의
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   // 데이터 생성
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );
//   const isResizing = useRef(false);
//   const resizingColumn = useRef(null);
//   const startX = useRef(0);
//   const initialWidth = useRef(0);

//   // 리사이징 시작
//   const handleMouseDown = (e, columnKey) => {
//     if (e.button !== 0) return;

//     isResizing.current = true;
//     resizingColumn.current = columnKey;
//     startX.current = e.clientX;
//     initialWidth.current = columnWidths[columnKey]; // 시작 너비 저장

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // 마우스 이동에 따른 컬럼 너비 조정
//   const handleMouseMove = (e) => {
//     if (!isResizing.current) return;

//     const dx = e.clientX - startX.current;
//     const newWidth = initialWidth.current + dx; // 초기 너비에 이동 거리 더함

//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [resizingColumn.current]: Math.max(newWidth, 50), // 최소 너비 50px 보장
//     }));
//   };

//   // 리사이징 종료
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumn.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               key={column.key}
//               style={{
//                 width: `${columnWidths[column.key]}px`,
//                 position: 'relative',
//               }}
//             >
//               {column.label}
//               <div
//                 className="column-resizer"
//                 onMouseDown={(e) => handleMouseDown(e, column.key)}
//                 style={{ right: 0 }}
//               ></div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;

// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // 컬럼 정의
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

  // 데이터 생성
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );

//   const isResizing = useRef(false);
//   const resizingColumn = useRef(null);
//   const startX = useRef(0);
//   const initialWidth = useRef(0);

//   // 리사이징 시작
//   const handleMouseDown = (e, columnKey) => {
//     if (e.button !== 0) return;

//     // 셀 오른쪽 끝에서만 리사이즈 허용
//     if (e.target.className !== 'column-resizer') return;

//     isResizing.current = true;
//     resizingColumn.current = columnKey;
//     startX.current = e.clientX;
//     initialWidth.current = columnWidths[columnKey];

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // 마우스 이동에 따른 셀 너비 조정 (오른쪽만)
//   const handleMouseMove = (e) => {
//     if (!isResizing.current) return;

//     const dx = e.clientX - startX.current;
//     const newWidth = initialWidth.current + dx; // 오른쪽으로만 리사이즈

//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [resizingColumn.current]: Math.max(newWidth, 50), // 최소 너비 50px
//     }));
//   };

//   // 리사이징 종료
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumn.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               key={column.key}
//               style={{
//                 width: `${columnWidths[column.key]}px`,
//                 position: 'relative',
//               }}
//               onMouseDown={(e) => handleMouseDown(e, column.key)}
//             >
//               {column.label}
//               {/* 셀 오른쪽 끝에서만 리사이즈 가능 */}
//               <div className="column-resizer" style={{ right: 0 }}></div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;


// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // 컬럼 정의
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   // 데이터 생성
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );

//   const isResizing = useRef(false);
//   const resizingColumn = useRef(null);
//   const startX = useRef(0);
//   const initialWidth = useRef(0);

//   // 리사이징 시작
//   const handleMouseDown = (e, columnKey) => {
//     if (e.button !== 0) return; // 왼쪽 버튼만 허용

//     // 셀 오른쪽 끝에서만 리사이즈 허용
//     if (e.target.className !== 'column-resizer') return;

//     isResizing.current = true;
//     resizingColumn.current = columnKey;
//     startX.current = e.clientX;
//     initialWidth.current = columnWidths[columnKey];

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // 마우스 이동에 따른 셀 너비 조정 (오른쪽만)
//   const handleMouseMove = (e) => {
//     if (!isResizing.current) return;

//     const dx = e.clientX - startX.current;
//     const newWidth = initialWidth.current + dx; // 오른쪽으로만 리사이즈

//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [resizingColumn.current]: Math.max(newWidth, 50), // 최소 너비 50px
//     }));
//   };

//   // 리사이징 종료
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumn.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               key={column.key}
//               style={{
//                 width: `${columnWidths[column.key]}px`,
//                 position: 'relative',
//               }}
//               onMouseDown={(e) => handleMouseDown(e, column.key)}
//             >
//               {column.label}
//               {/* 셀 오른쪽 끝에서만 리사이즈 가능 */}
//               <div className="column-resizer" style={{ right: 0 }}></div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;

// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // Column definitions
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   // Sample data generation
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );

//   const isResizing = useRef(false); // Keeps track of resizing state
//   const resizingColumn = useRef(null); // Stores the current column being resized
//   const startX = useRef(0); // Stores the initial X position of mouse down event
//   const initialWidth = useRef(0); // Stores the initial width of the column being resized

//   // Start resizing
//   const handleMouseDown = (e, columnKey) => {
//     if (e.button !== 0) return; // Only allow left-click

//     // Only allow resizing if clicked on the right edge of the column
//     if (e.target.className !== 'column-resizer') return;

//     isResizing.current = true;
//     resizingColumn.current = columnKey;
//     startX.current = e.clientX;
//     initialWidth.current = columnWidths[columnKey];

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // Adjust column width as the mouse moves (resize from the right only)
//   const handleMouseMove = (e) => {
//     if (!isResizing.current || !resizingColumn.current) return;

//     const dx = e.clientX - startX.current; // Distance moved in X direction
//     const newWidth = initialWidth.current + dx; // Only expand to the right

//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [resizingColumn.current]: Math.max(newWidth, 50), // Ensure a minimum width of 50px
//     }));
//   };

//   // Stop resizing
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumn.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th
//               key={column.key}
//               style={{
//                 width: `${columnWidths[column.key]}px`,
//                 position: 'relative',
//               }}
//               onMouseDown={(e) => handleMouseDown(e, column.key)}
//             >
//               {column.label}
//               {/* Only allow resizing on the right edge of each column */}
//               <div className="column-resizer" style={{ right: 0 }}></div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;

// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // Column definitions
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   // Sample data generation
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );

//   const isResizing = useRef(false); // Keeps track of resizing state
//   const resizingColumnIndex = useRef(null); // Stores the current column being resized
//   const startX = useRef(0); // Stores the initial X position of mouse down event
//   const initialWidths = useRef({}); // Stores the initial widths of the columns being resized

//   // Start resizing
//   const handleMouseDown = (e, index) => {
//     if (e.button !== 0) return; // Only allow left-click

//     // Only allow resizing if clicked on the right edge of the column
//     if (e.target.className !== 'column-resizer') return;

//     isResizing.current = true;
//     resizingColumnIndex.current = index;
//     startX.current = e.clientX;
//     initialWidths.current = {
//       currentColumn: columnWidths[columns[index].key],
//       adjacentColumn: columnWidths[columns[index + 1]?.key],
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // Adjust column width as the mouse moves
//   const handleMouseMove = (e) => {
//     if (!isResizing.current || resizingColumnIndex.current === null) return;

//     const dx = e.clientX - startX.current; // Distance moved in X direction
//     const currentColumnKey = columns[resizingColumnIndex.current].key;
//     const adjacentColumnKey = columns[resizingColumnIndex.current + 1]?.key;

//     const newCurrentWidth = Math.max(initialWidths.current.currentColumn + dx, 50); // Ensure a minimum width of 50px
//     const newAdjacentWidth = Math.max(initialWidths.current.adjacentColumn - dx, 50);

//     setColumnWidths((prevWidths) => ({
//       ...prevWidths,
//       [currentColumnKey]: newCurrentWidth,
//       [adjacentColumnKey]: newAdjacentWidth,
//     }));
//   };

//   // Stop resizing
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumnIndex.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column, index) => (
//             <th
//               key={column.key}
//               style={{
//                 width: `${columnWidths[column.key]}px`,
//                 position: 'relative',
//               }}
//             >
//               {column.label}
//               {/* Only allow resizing on the right edge of each column */}
//               {index < columns.length - 1 && (
//                 <div
//                   className="column-resizer"
//                   style={{ right: 0 }}
//                   onMouseDown={(e) => handleMouseDown(e, index)}
//                 ></div>
//               )}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;


// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   // Column definitions
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   const MIN_COLUMN_WIDTH = 50;

//   // Sample data generation
//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );

//   const isResizing = useRef(false);
//   const resizingColumnIndex = useRef(null);
//   const startX = useRef(0);
//   const initialWidths = useRef({});

//   // Start resizing
//   const handleMouseDown = (e, index) => {
//     if (e.button !== 0) return; // Only allow left-click

//     // Only allow resizing if clicked on the right edge of the column
//     if (e.target.className !== 'column-resizer') return;

//     isResizing.current = true;
//     resizingColumnIndex.current = index;
//     startX.current = e.clientX;
//     initialWidths.current = {
//       currentColumn: columnWidths[columns[index].key],
//       adjacentColumn: columnWidths[columns[index + 1]?.key],
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // Adjust column width as the mouse moves
//   const handleMouseMove = (e) => {
//     if (!isResizing.current || resizingColumnIndex.current === null) return;

//     const dx = e.clientX - startX.current;
//     const currentColumnKey = columns[resizingColumnIndex.current].key;
//     const adjacentColumnKey = columns[resizingColumnIndex.current + 1]?.key;

//     const newCurrentWidth = Math.max(initialWidths.current.currentColumn + dx, MIN_COLUMN_WIDTH);
//     const newAdjacentWidth = Math.max(initialWidths.current.adjacentColumn - dx, MIN_COLUMN_WIDTH);

//     // Only update widths if the adjacent column has not reached its minimum width
//     if (newAdjacentWidth >= MIN_COLUMN_WIDTH) {
//       setColumnWidths((prevWidths) => ({
//         ...prevWidths,
//         [currentColumnKey]: newCurrentWidth,
//         [adjacentColumnKey]: newAdjacentWidth,
//       }));
//     }
//   };

//   // Stop resizing
//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumnIndex.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <table className="data-table">
//       <thead>
//         <tr>
//           {columns.map((column, index) => (
//             <th
//               key={column.key}
//               style={{
//                 width: `${columnWidths[column.key]}px`,
//                 position: 'relative',
//               }}
//             >
//               {column.label}
//               {/* Only allow resizing on the right edge of each column */}
//               {index < columns.length - 1 && (
//                 <div
//                   className="column-resizer"
//                   style={{ right: 0 }}
//                   onMouseDown={(e) => handleMouseDown(e, index)}
//                 ></div>
//               )}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column) => (
//               <td key={column.key}>{row[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ColumnResizer;

// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   const MIN_COLUMN_WIDTH = 50;

//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );

//   const isResizing = useRef(false);
//   const resizingColumnIndex = useRef(null);
//   const startX = useRef(0);
//   const initialWidths = useRef({});
//   const [mousePosition, setMousePosition] = useState(null);

//   const handleMouseDown = (e, index) => {
//     if (e.button !== 0) return;
//     if (e.target.className !== 'column-resizer') return;

//     isResizing.current = true;
//     resizingColumnIndex.current = index;
//     startX.current = e.clientX;
//     initialWidths.current = {
//       currentColumn: columnWidths[columns[index].key],
//       adjacentColumn: columnWidths[columns[index + 1]?.key],
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   const handleMouseMove = (e) => {
//     setMousePosition(e.clientX);

//     if (!isResizing.current || resizingColumnIndex.current === null) return;

//     const dx = e.clientX - startX.current;
//     const currentColumnKey = columns[resizingColumnIndex.current].key;
//     const adjacentColumnKey = columns[resizingColumnIndex.current + 1]?.key;

//     const newCurrentWidth = Math.max(initialWidths.current.currentColumn + dx, MIN_COLUMN_WIDTH);
//     const newAdjacentWidth = Math.max(initialWidths.current.adjacentColumn - dx, MIN_COLUMN_WIDTH);

//     if (newAdjacentWidth >= MIN_COLUMN_WIDTH) {
//       setColumnWidths((prevWidths) => ({
//         ...prevWidths,
//         [currentColumnKey]: newCurrentWidth,
//         [adjacentColumnKey]: newAdjacentWidth,
//       }));
//     }
//   };

//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumnIndex.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <div className="table-container">
//       <table className="data-table">
//         <thead>
//           <tr>
//             {columns.map((column, index) => (
//               <th
//                 key={column.key}
//                 style={{
//                   width: `${columnWidths[column.key]}px`,
//                   position: 'relative',
//                 }}
//                 onMouseDown={(e) => handleMouseDown(e, index)}
//               >
//                 {column.label}
//                 {index < columns.length - 1 && (
//                   <div className="column-resizer" style={{ right: 0 }}></div>
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columns.map((column) => (
//                 <td key={column.key}>{row[column.key]}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {mousePosition !== null && (
//         <div
//           className="mouse-indicator"
//           style={{ left: `${mousePosition}px` }}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default ColumnResizer;

// import React, { useState, useRef } from 'react';
// import './ColumnResizer.css';

// const ColumnResizer = () => {
//   const columns = [
//     { key: 'id', label: 'ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'company', label: 'Company' },
//     { key: 'address', label: 'Address' },
//     { key: 'jobTitle', label: 'Job Title' },
//     { key: 'salary', label: 'Salary' },
//     { key: 'status', label: 'Status' },
//     { key: 'dateJoined', label: 'Date Joined' },
//   ];

//   const MIN_COLUMN_WIDTH = 50;

//   const data = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     name: `User ${index + 1}`,
//     email: `user${index + 1}@example.com`,
//     phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
//     company: `Company ${index + 1}`,
//     address: `Address ${index + 1}`,
//     jobTitle: `Job Title ${index + 1}`,
//     salary: `$${(50000 + index * 1000).toLocaleString()}`,
//     status: index % 2 === 0 ? 'Active' : 'Inactive',
//     dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
//   }));

//   const [columnWidths, setColumnWidths] = useState(
//     columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
//   );

//   const isResizing = useRef(false);
//   const resizingColumnIndex = useRef(null);
//   const startX = useRef(0);
//   const initialWidths = useRef({});
//   const [mousePosition, setMousePosition] = useState(null);

//   const handleMouseDown = (e, index) => {
//     if (e.button !== 0) return;
//     if (e.target.className !== 'column-resizer') return;

//     isResizing.current = true;
//     resizingColumnIndex.current = index;
//     startX.current = e.clientX;
//     initialWidths.current = {
//       currentColumn: columnWidths[columns[index].key],
//       adjacentColumn: columnWidths[columns[index + 1]?.key],
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   const handleMouseMove = (e) => {
//     setMousePosition(e.clientX);

//     if (!isResizing.current || resizingColumnIndex.current === null) return;

//     const dx = e.clientX - startX.current;
//     const currentColumnKey = columns[resizingColumnIndex.current].key;
//     const adjacentColumnKey = columns[resizingColumnIndex.current + 1]?.key;

//     const newCurrentWidth = Math.max(initialWidths.current.currentColumn + dx, MIN_COLUMN_WIDTH);
//     const newAdjacentWidth = Math.max(initialWidths.current.adjacentColumn - dx, MIN_COLUMN_WIDTH);

//     if (newAdjacentWidth >= MIN_COLUMN_WIDTH) {
//       setColumnWidths((prevWidths) => ({
//         ...prevWidths,
//         [currentColumnKey]: newCurrentWidth,
//         [adjacentColumnKey]: newAdjacentWidth,
//       }));
//     }
//   };

//   const handleMouseUp = () => {
//     isResizing.current = false;
//     resizingColumnIndex.current = null;

//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <div className="table-container">
//       <table className="data-table">
//         <thead>
//           <tr>
//             {columns.map((column, index) => (
//               <th
//                 key={column.key}
//                 style={{
//                   width: `${columnWidths[column.key]}px`,
//                   position: 'relative',
//                 }}
//                 onMouseDown={(e) => handleMouseDown(e, index)}
//               >
//                 {column.label}
//                 {index < columns.length - 1 && (
//                   <div className="column-resizer" style={{ right: 0 }}></div>
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columns.map((column) => (
//                 <td key={column.key}>{row[column.key]}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {mousePosition !== null && (
//         <div
//           className="mouse-indicator"
//           style={{ left: `${mousePosition}px` }}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default ColumnResizer;

import React, { useState, useRef } from 'react';
import './ColumnResizer.css';

const ColumnResizer = () => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'company', label: 'Company' },
    { key: 'address', label: 'Address' },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'salary', label: 'Salary' },
    { key: 'status', label: 'Status' },
    { key: 'dateJoined', label: 'Date Joined' },
  ];

  const MIN_COLUMN_WIDTH = 50; // 최소 너비 설정

  // 더미 데이터 생성
  const data = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `010-0000-${String(index + 1).padStart(4, '0')}`,
    company: `Company ${index + 1}`,
    address: `Address ${index + 1}`,
    jobTitle: `Job Title ${index + 1}`,
    salary: `$${(50000 + index * 1000).toLocaleString()}`,
    status: index % 2 === 0 ? 'Active' : 'Inactive',
    dateJoined: `2024-09-${String(index + 1).padStart(2, '0')}`,
  }));

  const [columnWidths, setColumnWidths] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: 120 }), {})
  );

  const isResizing = useRef(false);
  const resizingColumnIndex = useRef(null);
  const startX = useRef(0);
  const initialWidths = useRef({});
  const [mousePosition, setMousePosition] = useState(null);

  // 리사이징 시작
  const handleMouseDown = (e, index) => {
    if (e.button !== 0) return;
    if (e.target.className !== 'column-resizer') return;

    isResizing.current = true;
    resizingColumnIndex.current = index;
    startX.current = e.clientX;
    initialWidths.current = {
      currentColumn: columnWidths[columns[index].key],
      adjacentColumn: columnWidths[columns[index + 1]?.key],
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // 리사이징 동작
  const handleMouseMove = (e) => {
    setMousePosition(e.clientX);

    if (!isResizing.current || resizingColumnIndex.current === null) return;

    const dx = e.clientX - startX.current;
    const currentColumnKey = columns[resizingColumnIndex.current].key;
    const adjacentColumnKey = columns[resizingColumnIndex.current + 1]?.key;

    const newCurrentWidth = Math.max(initialWidths.current.currentColumn + dx, MIN_COLUMN_WIDTH);
    const newAdjacentWidth = Math.max(initialWidths.current.adjacentColumn - dx, MIN_COLUMN_WIDTH);

    if (newAdjacentWidth >= MIN_COLUMN_WIDTH) {
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [currentColumnKey]: newCurrentWidth,
        [adjacentColumnKey]: newAdjacentWidth,
      }));
    }
  };

  // 리사이징 종료
  const handleMouseUp = () => {
    isResizing.current = false;
    resizingColumnIndex.current = null;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                style={{
                  width: `${columnWidths[column.key]}px`,
                  position: 'relative',
                }}
                onMouseDown={(e) => handleMouseDown(e, index)}
              >
                {column.label}
                {index < columns.length - 1 && (
                  <div className="column-resizer" style={{ right: 0 }}></div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.key} style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {mousePosition !== null && (
        <div
          className="mouse-indicator"
          style={{ left: `${mousePosition}px` }}
        ></div>
      )}
    </div>
  );
};

export default ColumnResizer;
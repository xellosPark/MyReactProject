// ColumnResizer.js
import React, { useState, useRef } from 'react';
import './ColumnResizer.css';

const ColumnResizer = () => {
  // 컬럼 정의
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

  // 데이터 생성
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
  const resizingColumn = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  // 마우스 다운 이벤트로 리사이징 초기화
  const handleMouseDown = (e, columnKey) => {
    isResizing.current = true;
    resizingColumn.current = columnKey;
    startX.current = e.clientX;
    startWidth.current = columnWidths[columnKey];
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // 마우스 이동 중 컬럼 너비 조정
  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const dx = e.clientX - startX.current;
    setColumnWidths((prevWidths) => ({
      ...prevWidths,
      [resizingColumn.current]: Math.max(startWidth.current + dx, 50),
    }));
  };

  // 마우스 업 이벤트로 리사이징 종료
  const handleMouseUp = () => {
    isResizing.current = false;
    resizingColumn.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              style={{ width: `${columnWidths[column.key]}px`, position: 'relative' }}
            >
              {column.label}
              <div
                className="column-resizer"
                onMouseDown={(e) => handleMouseDown(e, column.key)}
              ></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ColumnResizer;
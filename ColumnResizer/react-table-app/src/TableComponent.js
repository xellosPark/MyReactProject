import React, { useState } from 'react';
import { useTable } from 'react-table';

// Generate 50 rows of mock data
const data = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Name ${i + 1}`,
  age: Math.floor(Math.random() * 30) + 20,
  city: `City ${i + 1}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
}));

// Define initial column widths
const initialColumns = [
  { Header: 'ID', accessor: 'id', width: 100 },
  { Header: 'Name', accessor: 'name', width: 100 },
  { Header: 'Age', accessor: 'age', width: 100 },
  { Header: 'City', accessor: 'city', width: 100 },
  { Header: 'Status', accessor: 'status', width: 100 },
];

const TableComponent = () => {
  const [columns, setColumns] = useState(initialColumns);

  // Handle the resizing of columns
  const handleMouseDown = (index, e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columns[index].width;

    // Mouse move handler
    const onMouseMove = (e) => {
      const newWidth = Math.max(startWidth + e.clientX - startX, 0); // Minimum width of 0px
      setColumns((prev) =>
        prev.map((col, colIndex) =>
          colIndex === index ? { ...col, width: newWidth } : col
        )
      );
    };

    // Remove listeners on mouse up
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div style={{ width: '800px', overflowX: 'auto' }}>
      <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    width: `${columns[index].width}px`,
                    position: 'relative',
                    background: '#f0f0f0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {column.render('Header')}
                  {/* Add resize handle, except for the last column */}
                  {index < columns.length - 1 && (
                    <div
                      onMouseDown={(e) => handleMouseDown(index, e)}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: '100%',
                        width: '5px',
                        cursor: 'col-resize',
                        backgroundColor: 'transparent',
                      }}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      border: '1px solid black',
                      padding: '8px',
                      textAlign: 'center',
                      width: `${columns[index].width}px`,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
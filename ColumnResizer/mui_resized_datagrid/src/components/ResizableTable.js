import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import CSS for resizing handles

const ResizableTable = () => {
  // Define initial column widths
  const [columnWidths, setColumnWidths] = useState({
    title1: 1,
    title2: 1,
    title3: 1,
    operations: 1,
  });

  // Handle resizing of columns
  const handleResize = (headerName) => (e, { size }) => {
    setColumnWidths((prevWidths) => ({
      ...prevWidths,
      [headerName]: size.width,
    }));
  };

  // Sample data for the table
  const rows = [
    { title1: '123', title2: '', title3: '', operations: 'Operations' },
    { title1: 'cdd', title2: 'edd', title3: '', operations: 'Operations' },
    { title1: '1333', title2: '', title3: 'eee', operations: 'Operations' },
  ];

  return (
    <div style={{ width: '1000px', margin: '0 auto', border: '1px solid red' }}>
      <h2>Integrate with react-resizable</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['title1', 'title2', 'title3', 'operations'].map((header) => (
              <th
                key={header}
                style={{
                  border: '1px solid red',
                  padding: '8px',
                  backgroundColor: '#f9f9f9',
                  width: columnWidths[header],
                }}
              >
                <Resizable
                  width={columnWidths[header]}
                  height={0} // Height is not used for horizontal resizing
                  onResize={handleResize(header)}
                  draggableOpts={{ enableUserSelectHack: false }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ flex: 1 }}>{header}</span>
                  </div>
                </Resizable>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid red', padding: '8px', width: columnWidths.title1 }}>
                {row.title1}
              </td>
              <td style={{ border: '1px solid red', padding: '8px', width: columnWidths.title2 }}>
                {row.title2}
              </td>
              <td style={{ border: '1px solid red', padding: '8px', width: columnWidths.title3 }}>
                {row.title3}
              </td>
              <td style={{ border: '1px solid red', padding: '8px', width: columnWidths.operations, color: 'blue' }}>
                <a href="#">{row.operations}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResizableTable;
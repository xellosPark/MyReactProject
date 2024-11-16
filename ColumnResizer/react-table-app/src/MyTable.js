// MyTable.js
import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import data from './data';

const MyTable = () => {
  const [columnWidths] = useState({
    no: 0,
    file: 0,
    send: 0,
    receive: 0,
    title: 0,
    time: 0,
    fileName: 0,
    reference: 0,
    hiddenRef: 0,
    analyzeFiles: 0,
    name: 0,
    mainContent: 40,
    content: 40,
    blenk: 0,
    complianceRisk: 40,
    result: 40,
  });

  const columns = useMemo(
    () => [
      { Header: 'No', accessor: 'no', width: columnWidths.no },
      { Header: 'File', accessor: 'file', width: columnWidths.file },
      { Header: 'Send', accessor: 'send', width: columnWidths.send },
      { Header: 'Receive', accessor: 'receive', width: columnWidths.receive },
      { Header: 'Title', accessor: 'title', width: columnWidths.title },
      { Header: 'Time', accessor: 'time', width: columnWidths.time },
      { Header: 'File Name', accessor: 'fileName', width: columnWidths.fileName },
      { Header: 'Reference', accessor: 'reference', width: columnWidths.reference },
      { Header: 'Hidden Ref', accessor: 'hiddenRef', width: columnWidths.hiddenRef },
      { Header: 'Analyze Files', accessor: 'analyzeFiles', width: columnWidths.analyzeFiles },
      { Header: 'Name', accessor: 'name', width: columnWidths.name },
      { Header: 'Main Content', accessor: 'mainContent', width: columnWidths.mainContent },
      { Header: 'Content', accessor: 'content', width: columnWidths.content },
      { Header: 'Blenk', accessor: 'blenk', width: columnWidths.blenk },
      { Header: 'Compliance Risk', accessor: 'complianceRisk', width: columnWidths.complianceRisk },
      { Header: 'Result', accessor: 'result', width: columnWidths.result },
    ],
    [columnWidths]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  
  

  return (
    <div style={{ width: '1200px', margin: '0 auto', overflowX: 'auto' }}>
      <table
        {...getTableProps()}
        style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    border: '1px solid black',
                    width: `${column.width}px`,
                    overflow: 'hidden', // Cuts off content if it exceeds width
                    whiteSpace: 'nowrap', // Prevents text from wrapping
                    textOverflow: 'ellipsis', // Adds "..." for overflowed text
                  }}
                >
                  {column.render('Header')}
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
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      border: '1px solid black',
                      padding: '8px',
                      width: `${cell.column.width}px`,
                      overflow: 'hidden', // Cuts off content if it exceeds width
                      whiteSpace: 'nowrap', // Prevents text from wrapping
                      textOverflow: 'ellipsis', // Adds "..." for overflowed text
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

export default MyTable;

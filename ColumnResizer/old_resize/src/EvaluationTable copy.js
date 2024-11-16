import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const TabbedTableComponent = () => {
  // Initial state
  const [activeTab, setActiveTab] = useState(0);
  const [columnWidths, setColumnWidths] = useState({
    no: 2,
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
  });
  const [headers, setHeaders] = useState([]);

  // Fetch headers from localStorage
  useEffect(() => {
    const allSheetData = JSON.parse(localStorage.getItem('allSheetData'));
    const currentSheetData = allSheetData ? allSheetData['currentSheetData'] : null;
    if (currentSheetData && currentSheetData.headers) {
      setHeaders(currentSheetData.headers);
    }
  }, []);

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      {/* Tabs */}
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>

      {/* Table */}
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} style={{ display: activeTab === i ? 'block' : 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((headerName, index) => (
                  <TableCell
                    key={index}
                    style={{ width: `${columnWidths[headerName] || 10}%` }}
                  >
                    {headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Placeholder for table rows */}
              <TableRow>
                {headers.map((headerName, index) => (
                  <TableCell key={index}>
                    Data for {headerName} (e.g., Row {index + 1})
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default TabbedTableComponent;

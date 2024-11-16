import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import generateData from './data';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  table: {
    width: '90%',
    height: '70%',
    position: 'relative',
  },
  tabs: {
    width: '100%',
  },
  controlButtons: {
    margin: '20px 0',
    display: 'flex',
    gap: '10px',
  },
  resizeHandle: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: '5px',
    cursor: 'col-resize',
    backgroundColor: 'transparent',
  },
});

export default function App() {
  const classes = useStyles();

  // Generate custom data for each tab
  const generateCustomData = () => {
    const generatedData = generateData(300);

    const tab1Data = generatedData.slice(0, 100).map((row) => ({
      ...row,
      colorState: 'red',
      buttonText: 'RISK',
    }));

    const tab2Data = generatedData.slice(100, 200).map((row) => ({
      ...row,
      colorState: 'gray',
      buttonText: 'NO RISK',
    }));

    const tab3Data = generatedData.slice(200, 300).map((row) => ({
      ...row,
      colorState: 'gray',
      buttonText: 'NO RISK',
    }));

//     return [tab1Data, tab2Data, tab3Data];
//   };

  const loadData = () => {
    const savedData = localStorage.getItem('dataSets');
    if (savedData) {
      console.log("Loaded data from localStorage.");
      return JSON.parse(savedData);
    } else {
      console.log("No data found in localStorage. Generating new data.");
      return generateCustomData();
    }
  };

  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dataSets, setDataSets] = useState(loadData);

  useEffect(() => {
    localStorage.setItem('dataSets', JSON.stringify(dataSets));
  }, [dataSets]);

  // Initialize column widths, ensuring the 'Role' column is fixed
  const [columnWidths, setColumnWidths] = useState({
    index: 70,
    id: 70,
    name: 130,
    age: 90,
    colorToggle: 150,
    email: 200,
    address: 150,
    phone: 150,
    company: 150,
    department: 130,
    role: 130, // Fixed width for the 'Role' column
  });

  const [resizing, setResizing] = useState(null);

  // Handle mouse down event to start resizing, ensuring 'Role' is not resizable
  const handleMouseDown = (field, e) => {
    if (field === 'role') return; // Prevent resizing for the 'Role' column
    setResizing({ field, startX: e.clientX, startWidth: columnWidths[field] });
  };

  // Handle mouse move to resize columns dynamically
  const handleMouseMove = (e) => {
    if (resizing) {
      const delta = e.clientX - resizing.startX;
      const newWidth = Math.max(resizing.startWidth + delta, 50); // Set minimum width to 50px

      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [resizing.field]: newWidth,
        role: 130, // Keep 'Role' column width fixed
      }));
    }
  };

  // Stop resizing on mouse up
  const handleMouseUp = () => {
    setResizing(null);
  };

  useEffect(() => {
    if (resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing]);

  // Define columns with custom headers and fixed 'Role' column
  const columns = [
    {
      field: 'index',
      headerName: '번호',
      width: columnWidths.index,
      renderCell: (params) => {
        const rowNumber = page * pageSize + params.rowIndex + 1;
        return rowNumber;
      },
      renderHeader: (params) => (
        <div style={{ position: 'relative' }}>
          {params.colDef.headerName}
          <div
            className={classes.resizeHandle}
            onMouseDown={(e) => handleMouseDown('index', e)}
          />
        </div>
      ),
    },
    { field: 'id', headerName: 'ID', width: columnWidths.id },
    { field: 'name', headerName: 'Name', width: columnWidths.name },
    { field: 'age', headerName: 'Age', type: 'number', width: columnWidths.age },
    {
      field: 'colorToggle',
      headerName: 'Color Toggle',
      width: columnWidths.colorToggle,
      sortable: false,
      renderHeader: (params) => (
        <div style={{ position: 'relative' }}>
          {params.colDef.headerName}
          <div
            className={classes.resizeHandle}
            onMouseDown={(e) => handleMouseDown('colorToggle', e)}
          />
        </div>
      ),
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{
            backgroundColor: params.row.colorState,
            color: 'white',
          }}
          onClick={() => handleColorToggle(params.row.id)}
        >
          {params.row.buttonText}
        </Button>
      ),
    },
    { field: 'email', headerName: 'Email', width: columnWidths.email },
    { field: 'address', headerName: 'Address', width: columnWidths.address },
    { field: 'phone', headerName: 'Phone', width: columnWidths.phone },
    { field: 'company', headerName: 'Company', width: columnWidths.company },
    { field: 'department', headerName: 'Department', width: columnWidths.department },
    {
      field: 'role',
      headerName: 'Role',
      width: columnWidths.role, // Fixed width for the 'Role' column
      renderHeader: (params) => (
        <div style={{ position: 'relative' }}>
          {params.colDef.headerName}
          {/* No resize handle on the last column */}
        </div>
      ),
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleColorToggle = (id) => {
    setDataSets((prevDataSets) => {
      const updatedTabData = prevDataSets[tabValue].map((row) =>
        row.id === id
          ? {
              ...row,
              colorState: row.colorState === 'red' ? 'gray' : 'red',
              buttonText: row.buttonText === 'RISK' ? 'NO RISK' : 'RISK',
            }
          : row
      );
      const newDataSets = [...prevDataSets];
      newDataSets[tabValue] = updatedTabData;
      return newDataSets;
    });
  };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//     setPage(0);
//   };

  const toggleAllColorStates = () => {
    setDataSets((prevDataSets) => {
      const updatedTabData = prevDataSets[tabValue].map((row) => ({
        ...row,
        colorState: row.colorState === 'red' ? 'gray' : 'red',
        buttonText: row.buttonText === 'RISK' ? 'NO RISK' : 'RISK',
      }));
      const newDataSets = [...prevDataSets];
      newDataSets[tabValue] = updatedTabData;
      return newDataSets;
    });
  };

//   return (
//     <div className={classes.container}>
//       <div className={classes.controlButtons}>
//         <Button variant="contained" color="secondary" onClick={() => localStorage.clear()}>
//           Clear Local Storage
//         </Button>
//       </div>
//       <Tabs value={tabValue} onChange={handleTabChange} className={classes.tabs} centered>
//         <Tab label="Tab 1" />
//         <Tab label="Tab 2" />
//         <Tab label="Tab 3" />
//       </Tabs>
//       <Box className={classes.table}>
//         <DataGrid
//           rows={dataSets[tabValue]}
//           columns={columns}
//           pageSize={pageSize}
//           rowsPerPageOptions={[10, 15, 20]}
//           page={page}
//           onPageChange={handlePageChange}
//           onPageSizeChange={handlePageSizeChange}
//           disableSelectionOnClick
//         />
//       </Box>
//     </div>
//   );
// }

// App.js

// import React from 'react';
// import ExampleComponent from './ExampleComponent'; // ExampleComponent를 현재 디렉토리에서 가져옴

// // App 함수 정의
// const App = () => {
//   return (
//     <div>
//       {/* ExampleComponent 사용 */}
//       <ExampleComponent />
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import { Tabs, Tab, Box, Button } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import generateData from './data';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//   container: {
//     display: 'flex',
//     height: '100vh',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   table: {
//     width: '90%', // Set a fixed width for the table container
//     height: '70%', // Set a fixed height for the table container
//     overflowX: 'auto', // Allow horizontal scrolling if needed
//   },
//   tabs: {
//     width: '100%',
//   },
//   controlButtons: {
//     margin: '20px 0',
//     display: 'flex',
//     gap: '10px',
//   },
// });

// export default function App() {
//   const classes = useStyles();
//   const [tabValue, setTabValue] = useState(0);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);

//   const generateCustomData = () => {
//     const generatedData = generateData(300);

//     const tab1Data = generatedData.slice(0, 100).map(row => ({
//       ...row,
//       colorState: 'red',
//       buttonText: 'RISK',
//     }));

//     const tab2Data = generatedData.slice(100, 200).map(row => ({
//       ...row,
//       colorState: 'gray',
//       buttonText: 'NO RISK',
//     }));

//     const tab3Data = generatedData.slice(200, 300).map(row => ({
//       ...row,
//       colorState: 'gray',
//       buttonText: 'NO RISK',
//     }));

//     return [tab1Data, tab2Data, tab3Data];
//   };

//   const loadData = () => {
//     const savedData = localStorage.getItem('dataSets');
//     if (savedData) {
//       console.log("Loaded data from local storage.");
//       return JSON.parse(savedData);
//     } else {
//       console.log("Generated new data.");
//       return generateCustomData();
//     }
//   };

//   const [dataSets, setDataSets] = useState(loadData);

//   useEffect(() => {
//     localStorage.setItem('dataSets', JSON.stringify(dataSets));
//   }, [dataSets]);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//     setPage(0);
//   };

//   const handleColorToggle = (id) => {
//     setDataSets((prevDataSets) => {
//       const updatedTabData = prevDataSets[tabValue].map((row) =>
//         row.id === id
//           ? {
//               ...row,
//               colorState: row.colorState === 'red' ? 'gray' : 'red',
//               buttonText: row.buttonText === 'RISK' ? 'NO RISK' : 'RISK',
//             }
//           : row
//       );
//       const newDataSets = [...prevDataSets];
//       newDataSets[tabValue] = updatedTabData;
//       return newDataSets;
//     });
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//     setPage(0);
//   };

//   const columns = [
//     { field: 'index', headerName: '번호', width: 70, sortable: false, renderCell: (params) => page * pageSize + params.rowIndex + 1 },
//     { field: 'company', headerName: 'Company', minWidth: 150, flex: 1 }, // Allow resizing
//     { field: 'department', headerName: 'Department', width: 150, maxWidth: 200, minWidth: 100 }, // Set bounds for Department
//     { field: 'role', headerName: 'Role', width: 130, resizable: false }, // Fixed width for Role
//   ];

//   return (
//     <div className={classes.container}>
//       <div className={classes.controlButtons}>
//         <Button variant="contained" color="secondary" onClick={() => localStorage.clear()}>
//           Clear Local Storage
//         </Button>
//       </div>
//       <Tabs value={tabValue} onChange={handleTabChange} className={classes.tabs} centered>
//         <Tab label="Tab 1" />
//         <Tab label="Tab 2" />
//         <Tab label="Tab 3" />
//       </Tabs>
//       <Box className={classes.table}>
//         <DataGrid
//           rows={dataSets[tabValue]}
//           columns={columns}
//           pageSize={pageSize}
//           rowsPerPageOptions={[10, 15, 20]}
//           page={page}
//           onPageChange={handlePageChange}
//           onPageSizeChange={handlePageSizeChange}
//           disableSelectionOnClick
//           style={{
//             width: '100%',
//             minWidth: '1200px', // Ensures the table has a minimum width and only specific columns resize
//           }}
//         />
//       </Box>
//     </div>
//   );
// }

import ResizableTable from './components/ResizableTable';
import React from 'react';
import ExampleTable from './components/ExampleTable';

function App() {
  return (
    <div className="App">
      {/* <ExampleTable /> */}
      <ResizableTable />
    </div>
  );
}

export default App;
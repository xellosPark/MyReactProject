// import React, { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Switch, Button } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import generateData from './data';

// const useStyles = makeStyles({
//   container: {
//     display: 'flex',
//     height: '100vh',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   table: {
//     width: '90%',
//     height: '80%',
//   },
// });

// export default function App() {
//   const classes = useStyles();
//   const [rows, setRows] = useState(generateData(100));

//   // Handle toggle button change
//   const handleToggleChange = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, active: !row.active } : row
//       )
//     );
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 130 },
//     { field: 'age', headerName: 'Age', type: 'number', width: 90 },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'address', headerName: 'Address', width: 150 },
//     { field: 'phone', headerName: 'Phone', width: 150 },
//     { field: 'company', headerName: 'Company', width: 150 },
//     { field: 'department', headerName: 'Department', width: 130 },
//     { field: 'role', headerName: 'Role', width: 130 },
//     {
//       field: 'active',
//       headerName: 'Active',
//       width: 100,
//       renderCell: (params) => (
//         <Switch
//           checked={params.row.active}
//           onChange={() => handleToggleChange(params.row.id)}
//           color="primary"
//         />
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => alert(`Editing ${params.row.name}`)}
//         >
//           Edit
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className={classes.container}>
//       <div className={classes.table}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10, 25, 50]}
//           checkboxSelection
//           disableSelectionOnClick
//         />
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import generateData from './data';

// const useStyles = makeStyles({
//   container: {
//     display: 'flex',
//     height: '100vh',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   table: {
//     width: '90%',
//     height: '80%',
//   },
// });

// export default function App() {
//   const classes = useStyles();
//   const [rows, setRows] = useState(generateData(100));

//   // Handle color toggle button click
//   const handleColorToggle = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id
//           ? { ...row, colorState: row.colorState === 'green' ? 'blue' : 'green' }
//           : row
//       )
//     );
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 130 },
//     { field: 'age', headerName: 'Age', type: 'number', width: 90 },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'address', headerName: 'Address', width: 150 },
//     { field: 'phone', headerName: 'Phone', width: 150 },
//     { field: 'company', headerName: 'Company', width: 150 },
//     { field: 'department', headerName: 'Department', width: 130 },
//     { field: 'role', headerName: 'Role', width: 130 },
//     {
//       field: 'colorToggle',
//       headerName: 'Color Toggle',
//       width: 150,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           style={{
//             backgroundColor: params.row.colorState,
//             color: 'white',
//           }}
//           onClick={() => handleColorToggle(params.row.id)}
//         >
//           Toggle Color
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className={classes.container}>
//       <div className={classes.table}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10, 25, 50]}
//           checkboxSelection
//           disableSelectionOnClick
//         />
//       </div>
//     </div>
//   );
// }


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
//     width: '90%',
//     height: '70%',
//   },
//   tabs: {
//     width: '100%',
//   },
//   clearButton: {
//     margin: '20px 0',
//   },
// });

// export default function App() {
//   const classes = useStyles();
//   const [tabValue, setTabValue] = useState(0);

//   // Function to load data from localStorage or generate new data if not found
//   const loadData = () => {
//     const savedData = localStorage.getItem('dataSets');
//     if (savedData) {
//       console.log("로컬스토리지에서 데이터 로드 성공.");
//       return JSON.parse(savedData);
//     } else {
//       console.log("로컬스토리지에서 데이터가 없어 새 데이터를 생성합니다.");
//       const generatedData = generateData(300);
//       return [
//         generatedData.slice(0, 100),
//         generatedData.slice(100, 200),
//         generatedData.slice(200, 300),
//       ];
//     }
//   };

//   // Initializing the dataSets state with loaded data
//   const [dataSets, setDataSets] = useState(loadData);

//   useEffect(() => {
//     // Save dataSets to localStorage whenever it changes
//     localStorage.setItem('dataSets', JSON.stringify(dataSets));
//     console.log("로컬스토리지에 데이터 저장 완료.");
//   }, [dataSets]);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//    const handleColorToggle = (id) => {
//     setDataSets((prevDataSets) => {
//       const updatedTabData = prevDataSets[tabValue].map((row) =>
//         row.id === id ? { ...row, colorState: row.colorState === 'green' ? 'blue' : 'green' } : row
//       );
//       const newDataSets = [...prevDataSets];
//       newDataSets[tabValue] = updatedTabData;
//       return newDataSets;
//     });
//   };

//   // Clear localStorage and reset dataSets state
//   const handleClearLocalStorage = () => {
//     localStorage.removeItem('dataSets');
//     console.log("로컬스토리지 데이터가 초기화되었습니다.");
//     const generatedData = generateData(300);
//     setDataSets([
//       generatedData.slice(0, 100),
//       generatedData.slice(100, 200),
//       generatedData.slice(200, 300),
//     ]);
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 130 },
//     { field: 'age', headerName: 'Age', type: 'number', width: 90 },
//     {
//       field: 'spacer',
//       headerName: '',
//       width: 50,
//       sortable: false,
//       resizable: false,
//       renderCell: () => (
//         <div style={{ backgroundColor: '#ECF0F1', width: '100%', height: '100%' }}></div>
//       ),
//       cellClassName: 'spacer-cell',
//     },
//     {
//       field: 'colorToggle',
//       headerName: 'Color Toggle',
//       width: 150,
//       sortable: false, // Disable sorting for this column
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           style={{
//             backgroundColor: params.row.colorState,
//             color: 'white',
//           }}
//           onClick={() => handleColorToggle(params.row.id)}
//         >
//           TOGGLE COLOR
//         </Button>
//       ),
//     },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'address', headerName: 'Address', width: 150 },
//     { field: 'phone', headerName: 'Phone', width: 150 },
//     { field: 'company', headerName: 'Company', width: 150 },
//     { field: 'department', headerName: 'Department', width: 130 },
//     { field: 'role', headerName: 'Role', width: 130 },
//   ];

//   return (
//     <div className={classes.container}>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleClearLocalStorage}
//         className={classes.clearButton}
//       >
//         Clear Local Storage
//       </Button>
//       <Tabs value={tabValue} onChange={handleTabChange} className={classes.tabs} centered>
//         <Tab label="Tab 1" />
//         <Tab label="Tab 2" />
//         <Tab label="Tab 3" />
//       </Tabs>
//       <Box className={classes.table}>
//         <DataGrid
//           rows={dataSets[tabValue]}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10, 25, 50]}
//           disableSelectionOnClick
//         />
//       </Box>
//     </div>
//   );
// }


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
//     width: '90%',
//     height: '70%',
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

//   // Function to load data from localStorage or generate new data if not found
//   const loadData = () => {
//     const savedData = localStorage.getItem('dataSets');
//     if (savedData) {
//       console.log("로컬스토리지에서 데이터 로드 성공.");
//       return JSON.parse(savedData);
//     } else {
//       console.log("로컬스토리지에서 데이터가 없어 새 데이터를 생성합니다.");
//       const generatedData = generateData(300);
//       return [
//         generatedData.slice(0, 100),
//         generatedData.slice(100, 200),
//         generatedData.slice(200, 300),
//       ];
//     }
//   };

//   // Initializing the dataSets state with loaded data
//   const [dataSets, setDataSets] = useState(loadData);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   // Handle color toggle for a specific row in the selected tab's dataset
//   const handleColorToggle = (id) => {
//     setDataSets((prevDataSets) => {
//       const updatedTabData = prevDataSets[tabValue].map((row) =>
//         row.id === id ? { ...row, colorState: row.colorState === 'green' ? 'blue' : 'green' } : row
//       );
//       const newDataSets = [...prevDataSets];
//       newDataSets[tabValue] = updatedTabData;
//       return newDataSets;
//     });
//   };

//   // Save dataSets to localStorage manually with the Apply button
//   const handleApplyChanges = () => {
//     localStorage.setItem('dataSets', JSON.stringify(dataSets));
//     console.log("로컬스토리지에 데이터 저장 완료.");
//     logLocalStorageData(); // Log data in Korean after saving
//   };

//   // Clear localStorage and reset dataSets state
//   const handleClearLocalStorage = () => {
//     localStorage.removeItem('dataSets');
//     console.log("로컬스토리지 데이터가 초기화되었습니다.");
//     const generatedData = generateData(300);
//     setDataSets([
//       generatedData.slice(0, 100),
//       generatedData.slice(100, 200),
//       generatedData.slice(200, 300),
//     ]);
//   };

//   // Function to log data in Korean
//   const logLocalStorageData = () => {
//     const data = localStorage.getItem('dataSets');
//     if (data) {
//       console.log("로컬스토리지에 저장된 데이터:", JSON.parse(data));
//     } else {
//       console.log("로컬스토리지에 저장된 데이터가 없습니다.");
//     }
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 130 },
//     { field: 'age', headerName: 'Age', type: 'number', width: 90 },
//     {
//       field: 'spacer',
//       headerName: '',
//       width: 50,
//       sortable: false,
//       resizable: false,
//       renderCell: () => (
//         <div style={{ backgroundColor: '#ECF0F1', width: '100%', height: '100%' }}></div>
//       ),
//       cellClassName: 'spacer-cell',
//     },
//     {
//       field: 'colorToggle',
//       headerName: 'Color Toggle',
//       width: 150,
//       sortable: false,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           style={{
//             backgroundColor: params.row.colorState,
//             color: 'white',
//           }}
//           onClick={() => handleColorToggle(params.row.id)}
//         >
//           TOGGLE COLOR
//         </Button>
//       ),
//     },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'address', headerName: 'Address', width: 150 },
//     { field: 'phone', headerName: 'Phone', width: 150 },
//     { field: 'company', headerName: 'Company', width: 150 },
//     { field: 'department', headerName: 'Department', width: 130 },
//     { field: 'role', headerName: 'Role', width: 130 },
//   ];

//   return (
//     <div className={classes.container}>
//       <div className={classes.controlButtons}>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleClearLocalStorage}
//         >
//           Clear Local Storage
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleApplyChanges}
//         >
//           Apply
//         </Button>
//         <Button
//           variant="contained"
//           color="default"
//           onClick={logLocalStorageData}
//         >
//           View Local Storage Data
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
//           pageSize={10}
//           rowsPerPageOptions={[10, 25, 50]}
//           disableSelectionOnClick
//         />
//       </Box>
//     </div>
//   );
// }

// akeStyles의 주요 역할
// CSS-in-JS 방식: JavaScript 코드 내에서 CSS를 작성하고 적용할 수 있게 합니다.
// 동적 스타일링: 컴포넌트의 상태나 속성에 따라 동적으로 스타일을 변경할 수 있습니다.
// 고유 클래스 이름 생성: Material-UI의 스타일링 시스템은 클래스 이름을 고유하게 생성하여 스타일 충돌을 방지합니다.

// import React, { useState } from 'react'; // useEffect 제거
// import { Tabs, Tab, Box, Button } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import generateData from './data';
// import { makeStyles } from '@mui/styles';

// // 스타일 정의
// const useStyles = makeStyles({
//   container: {
//     display: 'flex',
//     height: '100vh',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   table: {
//     width: '90%',
//     height: '70%',
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
//   const classes = useStyles(); // 스타일 사용 준비
//   const [tabValue, setTabValue] = useState(0); // 현재 선택된 탭을 추적하는 상태
//   const [page, setPage] = useState(0); // 현재 페이지 상태
//   const [pageSize, setPageSize] = useState(10); // 현재 페이지 크기 상태를 초기화

//   // 로컬스토리지에서 데이터를 불러오거나, 없으면 새로운 데이터를 생성하는 함수
//   const loadData = () => {
//     const savedData = localStorage.getItem('dataSets');
//     if (savedData) {
//       console.log("로컬스토리지에서 데이터 로드 성공.");
//       return JSON.parse(savedData);
//     } else {
//       console.log("로컬스토리지에서 데이터가 없어 새 데이터를 생성합니다.");
//       const generatedData = generateData(300);
//       return [
//         generatedData.slice(0, 100),
//         generatedData.slice(100, 200),
//         generatedData.slice(200, 300),
//       ];
//     }
//   };

//   // dataSets 상태를 로컬스토리지에서 불러온 데이터로 초기화
//   const [dataSets, setDataSets] = useState(loadData);

//   // 탭 변경 핸들러 함수
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue); // 현재 탭 상태 업데이트
//     setPage(0); // 탭 변경 시 페이지를 처음으로 초기화
//   };

//   // 현재 선택된 탭의 특정 행에 대해 색상 토글을 처리하는 함수
//   const handleColorToggle = (id) => {
//     setDataSets((prevDataSets) => {
//       const updatedTabData = prevDataSets[tabValue].map((row) =>
//         row.id === id ? { ...row, colorState: row.colorState === 'green' ? 'blue' : 'green' } : row
//       );
//       const newDataSets = [...prevDataSets];
//       newDataSets[tabValue] = updatedTabData;
//       return newDataSets;
//     });
//   };

//   // "Apply" 버튼을 클릭하여 dataSets를 로컬스토리지에 저장하는 함수
//   const handleApplyChanges = () => {
//     localStorage.setItem('dataSets', JSON.stringify(dataSets));
//     console.log("로컬스토리지에 데이터 저장 완료.");
//     logLocalStorageData(); // 저장 후 데이터를 콘솔에 로그
//   };

//   // 로컬스토리지를 초기화하고 dataSets 상태를 초기 상태로 재설정하는 함수
//   const handleClearLocalStorage = () => {
//     localStorage.removeItem('dataSets');
//     console.log("로컬스토리지 데이터가 초기화되었습니다.");
//     const generatedData = generateData(300);
//     setDataSets([
//       generatedData.slice(0, 100),
//       generatedData.slice(100, 200),
//       generatedData.slice(200, 300),
//     ]);
//   };

//   // 로컬스토리지에 저장된 데이터를 한국어로 콘솔에 출력하는 함수
//   const logLocalStorageData = () => {
//     const data = localStorage.getItem('dataSets');
//     if (data) {
//       console.log("로컬스토리지에 저장된 데이터:", JSON.parse(data));
//     } else {
//       console.log("로컬스토리지에 저장된 데이터가 없습니다.");
//     }
//   };

//   // 페이지 변경을 처리하고 각 탭에 대한 현재 페이지를 저장하는 함수
//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   // 페이지 크기 변경 핸들러
//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//     setPage(0); // 페이지 크기 변경 시 첫 페이지로 초기화
//   };

//   // 컬럼 정의
//   const columns = [
//     {
//       field: 'index',
//       headerName: '번호', // "번호" 컬럼 헤더명
//       width: 70,
//       sortable: false, // 정렬 비활성화
//       renderCell: (params) => {
//         // 현재 페이지 및 페이지 크기를 고려한 전역 행 번호 계산
//         const rowNumber = page * pageSize + params.rowIndex + 1;
//         return rowNumber;
//       },
//     },
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 130 },
//     { field: 'age', headerName: 'Age', type: 'number', width: 90 },
//     {
//       field: 'spacer',
//       headerName: '',
//       width: 50,
//       sortable: false,
//       resizable: false,
//       renderCell: () => (
//         <div style={{ backgroundColor: '#ECF0F1', width: '100%', height: '100%' }}></div>
//       ),
//       cellClassName: 'spacer-cell',
//     },
//     {
//       field: 'colorToggle',
//       headerName: 'Color Toggle',
//       width: 150,
//       sortable: false,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           style={{
//             backgroundColor: params.row.colorState,
//             color: 'white',
//           }}
//           onClick={() => handleColorToggle(params.row.id)}
//         >
//           TOGGLE COLOR
//         </Button>
//       ),
//     },
//     { field: 'email', headerName: 'Email', width: 1 },
//     { field: 'address', headerName: 'Address', width: 1 },
//     { field: 'phone', headerName: 'Phone', width: 1 },
//     { field: 'company', headerName: 'Company', width: 150 },
//     { field: 'department', headerName: 'Department', width: 130 },
//     { field: 'role', headerName: 'Role', width: 130 },
//   ];

//   return (
//     <div className={classes.container}>
//       <div className={classes.controlButtons}>
//         <Button variant="contained" color="secondary" onClick={handleClearLocalStorage}>
//           Clear Local Storage
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleApplyChanges}>
//           Apply
//         </Button>
//         <Button variant="contained" color="default" onClick={logLocalStorageData}>
//           View Local Storage Data
//         </Button>
//       </div>
//       <Tabs value={tabValue} onChange={handleTabChange} className={classes.tabs} centered>
//         <Tab label="Tab 1" />
//         <Tab label="Tab 2" />
//         <Tab label="Tab 3" />
//       </Tabs>
//       {/* <Box className={classes.table}> */}
//       <Box className={classes.table}>
//         <DataGrid
//           rows={dataSets[tabValue]}
//           columns={columns}
//           pageSize={pageSize}
//           rowsPerPageOptions={[10, 15, 20]}
//           page={page}
//           onPageChange={handlePageChange} // 페이지 변경 시 호출되는 함수
//           onPageSizeChange={handlePageSizeChange} // 페이지 크기 변경 시 호출되는 함수
//           disableSelectionOnClick
//         />
//       </Box>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { Tabs, Tab, Box, Button } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import generateData from './data';
// import { makeStyles } from '@mui/styles';

// // 스타일 정의
// const useStyles = makeStyles({
//   container: {
//     display: 'flex',
//     height: '100vh',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   table: {
//     width: '90%',
//     height: '70%',
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
//   const [tabValue, setTabValue] = useState(0); // 현재 선택된 탭을 추적하는 상태
//   const [page, setPage] = useState(0); // 현재 페이지 상태
//   const [pageSize, setPageSize] = useState(10); // 현재 페이지 크기 상태를 초기화

//   // 데이터 생성 함수
//   const generateCustomData = () => {
//     const generatedData = generateData(300); // 기본 데이터 생성

//     // 탭1: 모든 행의 colorState를 'red', buttonText를 'RISK'로 설정
//     const tab1Data = generatedData.slice(0, 100).map(row => ({
//       ...row,
//       colorState: 'red',
//       buttonText: 'RISK',
//     }));

//     // 탭2: 모든 행의 colorState를 'gray', buttonText를 'NO RISK'로 설정
//     const tab2Data = generatedData.slice(100, 200).map(row => ({
//       ...row,
//       colorState: 'gray',
//       buttonText: 'NO RISK',
//     }));

//     // 탭3: 기본 색상 및 버튼 내용으로 설정
//     const tab3Data = generatedData.slice(200, 300).map(row => ({
//     ...row,
//       colorState: 'gray',
//       buttonText: 'NO RISK',
//     }));

//     return [tab1Data, tab2Data, tab3Data];
//   };

//   // 로컬스토리지에서 데이터를 불러오거나, 없으면 새 데이터를 생성하는 함수
//   const loadData = () => {
//     const savedData = localStorage.getItem('dataSets');
//     if (savedData) {
//       console.log("로컬스토리지에서 데이터 로드 성공.");
//       return JSON.parse(savedData);
//     } else {
//       console.log("로컬스토리지에서 데이터가 없어 새 데이터를 생성합니다.");
//       return generateCustomData(); // 기본 데이터를 생성
//     }
//   };

//   // dataSets 상태를 로컬스토리지에서 불러온 데이터로 초기화
//   const [dataSets, setDataSets] = useState(loadData);

//   // 탭 변경 핸들러 함수
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue); // 현재 탭 상태 업데이트
//     setPage(0); // 탭 변경 시 페이지를 처음으로 초기화
//   };

//   // 현재 선택된 탭의 특정 행에 대해 색상 토글을 처리하는 함수
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

//   // "Apply" 버튼을 클릭하여 dataSets를 로컬스토리지에 저장하는 함수
//   const handleApplyChanges = () => {
//     localStorage.setItem('dataSets', JSON.stringify(dataSets));
//     console.log("로컬스토리지에 데이터 저장 완료.");
//     logLocalStorageData(); // 저장 후 데이터를 콘솔에 로그
//   };

//   // 로컬스토리지를 초기화하고 dataSets 상태를 초기 상태로 재설정하는 함수
//   const handleClearLocalStorage = () => {
//     localStorage.removeItem('dataSets');
//     console.log("로컬스토리지 데이터가 초기화되었습니다.");
//     setDataSets(generateCustomData()); // 기본 데이터를 다시 생성하여 초기화
//   };

//   // 로컬스토리지에 저장된 데이터를 한국어로 콘솔에 출력하는 함수
//   const logLocalStorageData = () => {
//     const data = localStorage.getItem('dataSets');
//     if (data) {
//       console.log("로컬스토리지에 저장된 데이터:", JSON.parse(data));
//     } else {
//       console.log("로컬스토리지에 저장된 데이터가 없습니다.");
//     }
//   };

//   // 페이지 변경을 처리하고 각 탭에 대한 현재 페이지를 저장하는 함수
//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   // 페이지 크기 변경 핸들러
//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//     setPage(0); // 페이지 크기 변경 시 첫 페이지로 초기화
//   };

//   const toggleAllColorStates = () => {
//     setDataSets((prevDataSets) => {
//       const updatedTabData = prevDataSets[tabValue].map((row) => ({
//         ...row,
//         colorState: row.colorState === 'red' ? 'gray' : 'red',
//         buttonText: row.buttonText === 'RISK' ? 'NO RISK' : 'RISK',
//       }));
//       const newDataSets = [...prevDataSets];
//       newDataSets[tabValue] = updatedTabData;
//       return newDataSets;
//     });
//   };

//   // Custom 컬럼 헤더에 버튼 추가
//   const CustomColumnHeader = (params) => (
//     <Box display="flex" alignItems="center" justifyContent="space-between">
//       <span>{params.colDef.headerName}</span>
//       <Button size="small" onClick={toggleAllColorStates} variant="contained" color="primary">
//         Toggle All
//       </Button>
//     </Box>
//   );

//   // 컬럼 정의
//   const columns = [
//     {
//       field: 'index',
//       headerName: '번호', // "번호" 컬럼 헤더명
//       width: 70,
//       sortable: false, // 정렬 비활성화
//       renderCell: (params) => {
//         // 현재 페이지 및 페이지 크기를 고려한 전역 행 번호 계산
//         const rowNumber = page * pageSize + params.rowIndex + 1;
//         return rowNumber;
//       },
//     },
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 130 },
//     { field: 'age', headerName: 'Age', type: 'number', width: 90 },
//     {
//       field: 'colorToggle',
//       headerName: 'Color Toggle',
//       width: 150,
//       sortable: false,
//       renderHeader: CustomColumnHeader, // 커스텀 컬럼 헤더 설정
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           style={{
//             backgroundColor: params.row.colorState,
//             color: 'white',
//           }}
//           onClick={() => handleColorToggle(params.row.id)}
//         >
//           {params.row.buttonText}
//         </Button>
//       ),
//     },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'address', headerName: 'Address', width: 150 },
//     { field: 'phone', headerName: 'Phone', width: 150 },
//     { field: 'company', headerName: 'Company', width: 150 },
//     { field: 'department', headerName: 'Department', width: 130 },
//     { field: 'role', headerName: 'Role', width: 130 },
//   ];

//   return (
//     <div className={classes.container}>
//       <div className={classes.controlButtons}>
//         <Button variant="contained" color="secondary" onClick={handleClearLocalStorage}>
//           Clear Local Storage
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleApplyChanges}>
//           Apply
//         </Button>
//         <Button variant="contained" color="default" onClick={logLocalStorageData}>
//           View Local Storage Data
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
  },
  tabs: {
    width: '100%',
  },
  controlButtons: {
    margin: '20px 0',
    display: 'flex',
    gap: '10px',
  },
});

export default function App() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // 데이터 생성 함수
  const generateCustomData = () => {
    const generatedData = generateData(300);

    const tab1Data = generatedData.slice(0, 100).map(row => ({
      ...row,
      colorState: 'red',
      buttonText: 'RISK',
    }));

    const tab2Data = generatedData.slice(100, 200).map(row => ({
      ...row,
      colorState: 'gray',
      buttonText: 'NO RISK',
    }));

    const tab3Data = generatedData.slice(200, 300).map(row => ({
      ...row,
      colorState: 'gray',
      buttonText: 'NO RISK',
    }));

    return [tab1Data, tab2Data, tab3Data];
  };

  // 로컬스토리지에서 데이터를 불러오거나, 없으면 새 데이터를 생성하는 함수
  const loadData = () => {
    const savedData = localStorage.getItem('dataSets');
    if (savedData) {
      console.log("로컬스토리지에서 데이터 로드 성공.");
      return JSON.parse(savedData);
    } else {
      console.log("로컬스토리지에서 데이터가 없어 새 데이터를 생성합니다.");
      return generateCustomData();
    }
  };

  // dataSets 상태를 로컬스토리지에서 불러온 데이터로 초기화
  const [dataSets, setDataSets] = useState(loadData);

  // dataSets가 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('dataSets', JSON.stringify(dataSets));
  }, [dataSets]);

  // 탭 변경 핸들러 함수
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };

  // 현재 선택된 탭의 특정 행에 대해 색상 토글을 처리하는 함수
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0);
  };

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

  const CustomColumnHeader = (params) => (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <span>{params.colDef.headerName}</span>
      <Button size="small" onClick={toggleAllColorStates} variant="contained" color="primary">
        Toggle All
      </Button>
    </Box>
  );

  const columns = [
    {
      field: 'index',
      headerName: '번호',
      width: 70,
      sortable: false,
      renderCell: (params) => {
        const rowNumber = page * pageSize + params.rowIndex + 1;
        return rowNumber;
      },
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    {
      field: 'colorToggle',
      headerName: 'Color Toggle',
      width: 150,
      sortable: false,
      renderHeader: CustomColumnHeader,
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
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'company', headerName: 'Company', width: 150 },
    { field: 'department', headerName: 'Department', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.controlButtons}>
        <Button variant="contained" color="secondary" onClick={() => localStorage.clear()}>
          Clear Local Storage
        </Button>
      </div>
      <Tabs value={tabValue} onChange={handleTabChange} className={classes.tabs} centered>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
      <Box className={classes.table}>
        <DataGrid
          rows={dataSets[tabValue]}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 15, 20]}
          page={page}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
}

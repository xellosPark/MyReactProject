// src/components/VirtualDataTable.js

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
// } from "@mui/material";
// import { faker } from "@faker-js/faker";

// export default function VirtualDataTable() {
//   const [data, setData] = useState([]);
//   const [columnWidths, setColumnWidths] = useState(Array(10).fill(150)); // 열 너비 초기 설정

//   // 100개의 가상 데이터 생성
//   useEffect(() => {
//     const generateData = () => {
//       const rows = [];
//       for (let i = 1; i <= 100; i++) {
//         rows.push({
//           id: i,
//           name: faker.person.fullName(),
//           email: faker.internet.email(),
//           age: faker.number.int({ min: 18, max: 80 }),
//           city: faker.location.city(),
//           phone: faker.phone.number(),
//           company: faker.company.name(),
//           jobTitle: faker.person.jobTitle(),
//           country: faker.location.country(),
//           department: faker.commerce.department(),
//         });
//       }
//       setData(rows);
//     };
//     generateData();
//   }, []);

//   // 마우스 드래그로 열 너비 조정 함수
//   const handleMouseDown = (index, event) => {
//     const startX = event.clientX;
//     const startWidth = columnWidths[index];

//     const handleMouseMove = (e) => {
//       const newWidth = startWidth + e.clientX - startX;
//       setColumnWidths((prevWidths) => {
//         const updatedWidths = [...prevWidths];
//         updatedWidths[index] = Math.max(newWidth, 50); // 최소 너비 설정
//         return updatedWidths;
//       });
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         가상 데이터 테이블 (10 컬럼, 100개 데이터)
//       </Typography>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {[
//                 "ID",
//                 "이름",
//                 "이메일",
//                 "나이",
//                 "도시",
//                 "전화번호",
//                 "회사",
//                 "직책",
//                 "국가",
//                 "부서",
//               ].map((header, index) => (
//                 <TableCell
//                   key={index}
//                   style={{ width: columnWidths[index], position: "relative" }}
//                 >
//                   {header}
//                   <div
//                     onMouseDown={(e) => handleMouseDown(index, e)}
//                     style={{
//                       position: "absolute",
//                       right: 0,
//                       top: 0,
//                       bottom: 0,
//                       width: "5px",
//                       cursor: "col-resize",
//                       zIndex: 1,
//                     }}
//                   />
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell style={{ width: columnWidths[0] }}>{row.id}</TableCell>
//                 <TableCell style={{ width: columnWidths[1] }}>{row.name}</TableCell>
//                 <TableCell style={{ width: columnWidths[2] }}>
//                   {row.email.length > 30 ? row.email.substring(0, 30) + "..." : row.email}
//                 </TableCell>
//                 <TableCell style={{ width: columnWidths[3] }}>{row.age}</TableCell>
//                 <TableCell style={{ width: columnWidths[4] }}>{row.city}</TableCell>
//                 <TableCell style={{ width: columnWidths[5] }}>{row.phone}</TableCell>
//                 <TableCell style={{ width: columnWidths[6] }}>{row.company}</TableCell>
//                 <TableCell style={{ width: columnWidths[7] }}>{row.jobTitle}</TableCell>
//                 <TableCell style={{ width: columnWidths[8] }}>{row.country}</TableCell>
//                 <TableCell style={{ width: columnWidths[9] }}>{row.department}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

///////////////////// 2번째

// src/components/VirtualDataGrid.js

// import React, { useState, useEffect } from "react";
// import { Paper, Typography } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { faker } from "@faker-js/faker";

// export default function VirtualDataGrid() {
//   const [rows, setRows] = useState([]);

//   // 100개의 가상 데이터 생성
//   useEffect(() => {
//     const generateData = () => {
//       const data = [];
//       for (let i = 1; i <= 100; i++) {
//         data.push({
//           id: i,
//           name: faker.person.fullName(),
//           email: faker.internet.email(),
//           age: faker.number.int({ min: 18, max: 80 }),
//           city: faker.location.city(),
//           phone: faker.phone.number(),
//           company: faker.company.name(),
//           jobTitle: faker.person.jobTitle(),
//           country: faker.location.country(),
//           department: faker.commerce.department(),
//         });
//       }
//       setRows(data);
//     };
//     generateData();
//   }, []);

//   // 열 정의
//   const columns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "name", headerName: "이름", width: 150, resizable: true },
//     { field: "email", headerName: "이메일", width: 200, resizable: true },
//     { field: "age", headerName: "나이", width: 80, resizable: true },
//     { field: "city", headerName: "도시", width: 120, resizable: true },
//     { field: "phone", headerName: "전화번호", width: 150, resizable: true },
//     { field: "company", headerName: "회사", width: 180, resizable: true },
//     { field: "jobTitle", headerName: "직책", width: 180, resizable: true },
//     { field: "country", headerName: "국가", width: 130, resizable: true },
//     { field: "department", headerName: "부서", width: 130, resizable: true },
//   ];

//   return (
//     <Paper sx={{ height: 400, width: "100%", padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         가상 데이터 그리드 (10 컬럼, 100개 데이터)
//       </Typography>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={10}
//         rowsPerPageOptions={[10, 20, 50, 100]}
//         disableColumnMenu // 컬럼 메뉴 비활성화 (열 너비 조정만 가능)
//         experimentalFeatures={{ newEditingApi: true }}
//         sx={{
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "#f5f5f5",
//           },
//         }}
//       />
//     </Paper>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Paper, Typography } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { faker } from "@faker-js/faker";

// export default function VirtualDataGrid() {
//   const [rows, setRows] = useState([]);

//   // 100개의 가상 데이터 생성
//   useEffect(() => {
//     const generateData = () => {
//       const data = [];
//       for (let i = 1; i <= 100; i++) {
//         data.push({
//           id: i,
//           name: faker.person.fullName(),
//           email: faker.internet.email(),
//           age: faker.number.int({ min: 18, max: 80 }),
//           city: faker.location.city(),
//           phone: faker.phone.number(),
//           company: faker.company.name(),
//           jobTitle: faker.person.jobTitle(),
//           country: faker.location.country(),
//           department: faker.commerce.department(),
//         });
//       }
//       setRows(data);
//     };
//     generateData();
//   }, []);

//   // 열 정의
//   const columns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "name", headerName: "이름", width: 150, resizable: true },
//     { field: "email", headerName: "이메일", width: 200, resizable: true },
//     { field: "age", headerName: "나이", width: 80, resizable: true },
//     { field: "city", headerName: "도시", width: 120, resizable: true },
//     { field: "phone", headerName: "전화번호", width: 150, resizable: true },
//     { field: "company", headerName: "회사", width: 180, resizable: true },
//     { field: "jobTitle", headerName: "직책", width: 180, resizable: true },
//     { field: "country", headerName: "국가", width: 130, resizable: true },
//     { field: "department", headerName: "부서", width: 130, resizable: true },
//   ];

//   return (
//     <Paper sx={{ width: "100%", padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         가상 데이터 그리드 (10 컬럼, 100개 데이터)
//       </Typography>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pagination={false} // 페이지 네이션 비활성화
//         autoHeight // 데이터에 맞게 높이 자동 조정
//         disableColumnMenu
//         hideFooter // 풋터(페이지 네이션 포함) 완전히 숨김
//         sx={{
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "#f5f5f5",
//           },
//         }}
//       />
//     </Paper>
//   );
// }
// 리사이즈 가능
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
// } from "@mui/material";
// import { faker } from "@faker-js/faker";

// export default function VirtualDataTable() {
//   const [data, setData] = useState([]);
//   const [columnWidths, setColumnWidths] = useState(Array(10).fill(150)); // 열 너비 초기 설정

//   // 100개의 가상 데이터 생성
//   useEffect(() => {
//     const generateData = () => {
//       const rows = [];
//       for (let i = 1; i <= 100; i++) {
//         rows.push({
//           id: i,
//           name: faker.person.fullName(),
//           email: faker.internet.email(),
//           age: faker.number.int({ min: 18, max: 80 }),
//           city: faker.location.city(),
//           phone: faker.phone.number(),
//           company: faker.company.name(),
//           jobTitle: faker.person.jobTitle(),
//           country: faker.location.country(),
//           department: faker.commerce.department(),
//         });
//       }
//       setData(rows);
//     };
//     generateData();
//   }, []);

//   // 마우스 드래그로 열 너비 조정 함수
//   const handleMouseDown = (index, event) => {
//     const startX = event.clientX;
//     const startWidth = columnWidths[index];

//     const handleMouseMove = (e) => {
//       const newWidth = startWidth + e.clientX - startX;
//       setColumnWidths((prevWidths) => {
//         const updatedWidths = [...prevWidths];
//         updatedWidths[index] = Math.max(newWidth, 50); // 최소 너비 설정
//         return updatedWidths;
//       });
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         가상 데이터 테이블 (10 컬럼, 100개 데이터)
//       </Typography>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {[
//                 "ID",
//                 "이름",
//                 "이메일",
//                 "나이",
//                 "도시",
//                 "전화번호",
//                 "회사",
//                 "직책",
//                 "국가",
//                 "부서",
//               ].map((header, index) => (
//                 <TableCell
//                   key={index}
//                   style={{
//                     width: columnWidths[index],
//                     position: "relative",
//                     borderRight: index < 9 ? "1px solid #ddd" : "none", // 구분선 추가, 마지막 셀 제외
//                   }}
//                 >
//                   {header}
//                   <div
//                     onMouseDown={(e) => handleMouseDown(index, e)}
//                     style={{
//                       position: "absolute",
//                       right: 0,
//                       top: 0,
//                       bottom: 0,
//                       width: "5px",
//                       cursor: "col-resize",
//                       zIndex: 1,
//                     }}
//                   />
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell style={{ width: columnWidths[0] }}>{row.id}</TableCell>
//                 <TableCell style={{ width: columnWidths[1] }}>{row.name}</TableCell>
//                 <TableCell style={{ width: columnWidths[2] }}>
//                   {row.email.length > 30 ? row.email.substring(0, 30) + "..." : row.email}
//                 </TableCell>
//                 <TableCell style={{ width: columnWidths[3] }}>{row.age}</TableCell>
//                 <TableCell style={{ width: columnWidths[4] }}>{row.city}</TableCell>
//                 <TableCell style={{ width: columnWidths[5] }}>{row.phone}</TableCell>
//                 <TableCell style={{ width: columnWidths[6] }}>{row.company}</TableCell>
//                 <TableCell style={{ width: columnWidths[7] }}>{row.jobTitle}</TableCell>
//                 <TableCell style={{ width: columnWidths[8] }}>{row.country}</TableCell>
//                 <TableCell style={{ width: columnWidths[9] }}>{row.department}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { faker } from "@faker-js/faker";

export default function VirtualDataTable() {
  const [data, setData] = useState([]);
  const [columnWidths] = useState(Array(10).fill(150)); // 열 너비 초기 설정

  // 100개의 가상 데이터 생성
  useEffect(() => {
    const generateData = () => {
      const rows = [];
      for (let i = 1; i <= 100; i++) {
        rows.push({
          id: i,
          name: faker.person.fullName(),
          email: faker.internet.email(),
          age: faker.number.int({ min: 18, max: 80 }),
          city: faker.location.city(),
          phone: faker.phone.number(),
          company: faker.company.name(),
          jobTitle: faker.person.jobTitle(),
          country: faker.location.country(),
          department: faker.commerce.department(),
        });
      }
      setData(rows);
    };
    generateData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        가상 데이터 테이블 (10 컬럼, 100개 데이터)
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "ID",
                "이름",
                "이메일",
                "나이",
                "도시",
                "전화번호",
                "회사",
                "직책",
                "국가",
                "부서",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  style={{
                    width: columnWidths[index],
                    borderRight: index < 9 ? "1px solid #ddd" : "none", // 구분선 추가, 마지막 셀 제외
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell style={{ width: columnWidths[0] }}>{row.id}</TableCell>
                <TableCell style={{ width: columnWidths[1] }}>{row.name}</TableCell>
                <TableCell style={{ width: columnWidths[2] }}>
                  {row.email.length > 30 ? row.email.substring(0, 30) + "..." : row.email}
                </TableCell>
                <TableCell style={{ width: columnWidths[3] }}>{row.age}</TableCell>
                <TableCell style={{ width: columnWidths[4] }}>{row.city}</TableCell>
                <TableCell style={{ width: columnWidths[5] }}>{row.phone}</TableCell>
                <TableCell style={{ width: columnWidths[6] }}>{row.company}</TableCell>
                <TableCell style={{ width: columnWidths[7] }}>{row.jobTitle}</TableCell>
                <TableCell style={{ width: columnWidths[8] }}>{row.country}</TableCell>
                <TableCell style={{ width: columnWidths[9] }}>{row.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
const express = require("express");
const XLSX = require("xlsx");
const app = express();
const PORT = 3001;
const cors = require("cors");
const ExcelJS = require("exceljs"); // ExcelJS 라이브러리 가져오기

// CORS 설정 추가
app.use(
  cors({
    origin: '*', // 필요한 경우 특정 도메인으로 제한할 수 있습니다. 예: 'http://example.com'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 허용되는 HTTP 메서드
  })
);

// 시트 이름 가져오기 라우트
app.get("/api/sheet-names", (req, res) => {
  try {
    // Excel 파일을 읽어옴 (경로는 필요에 따라 수정)
    const workbook = XLSX.readFile("D:/Date/xlsx/result_file_init.xlsx");
    const sheetNames = workbook.SheetNames;
    // 시트 이름을 JSON 형식으로 응답
    res.json({ sheetNames });
  } catch (error) {
    console.error("Excel 파일을 읽는 중 오류 발생:", error);
    res.status(500).json({ error: "시트 이름을 불러오는 데 실패했습니다" });
  }
});

// // 특정 시트의 데이터 가져오기 라우트
// app.get("/api/excel-Final", (req, res) => {
//   const sheetName = req.query.sheet;
//   if (!sheetName) {
//     // 시트 이름이 제공되지 않은 경우 오류 반환
//     return res.status(400).json({ error: "시트 이름이 필요합니다" });
//   }

//   try {
//     // Excel 파일을 읽어옴 (경로는 필요에 따라 수정)
//     const workbook = XLSX.readFile("D:/Date/xlsxres/result_file_user-evaluated.xlsx");
//     const worksheet = workbook.Sheets[sheetName];
//     if (!worksheet) {
//       // 요청한 시트가 없는 경우 오류 반환
//       return res.status(404).json({ error: "시트를 찾을 수 없습니다" });
//     }

//     // 워크시트를 JSON 형식으로 변환
//     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//     // 파싱된 데이터를 JSON으로 응답
//     res.json({
//       headers: jsonData[0], // 첫 번째 행은 헤더로 사용
//       rows: jsonData.slice(1), // 나머지 행은 데이터로 사용
//       sheetNames: workbook.SheetNames, // 필요한 경우 시트 이름 포함
//     });
//   } catch (error) {
//     console.error("Excel 파일을 읽는 중 오류 발생:", error);
//     res.status(500).json({ error: "Excel 데이터를 불러오는 데 실패했습니다" });
//   }
// });

app.get("/api/excel-Final", async (req, res) => {
  const sheetName = req.query.sheet;
  console.log('받은 sheet 값:', sheetName);
  


  // 시트 이름이 제공되지 않은 경우 에러 반환
  if (!sheetName) {
    console.log('받은 sheet 값: 111', sheetName);
    return res.status(400).json({ error: "Sheet name is required" });
  }

  try {
    // Excel 파일 읽기 (경로를 환경에 맞게 변경하세요)
    const filePath = "D:/Date/xlsxres/result_file_user-evaluated.xlsx";
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // 요청된 시트 가져오기
    const worksheet = workbook.getWorksheet(sheetName);

    if (!worksheet) {
      // 요청된 시트가 없을 경우 404 에러 반환
      
      return res.status(404).json({ error: "Sheet not found" });
    }

    const rowsData = []; // 각 행의 데이터를 저장할 배열


    // 행을 순회하며 데이터와 색상 정보를 수집
    worksheet.eachRow((row, rowNumber) => {
      // 각 행 데이터를 저장할 객체 생성
      const rowData = {
        rowNumber, // 행 번호
        values: [], // 각 열 데이터를 저장할 배열
        hasNonWhiteCell: false, // 비흰색 셀이 포함되었는지 여부
      };

      // 행 처리 시작 로그
      //console.log(`📋 행 ${rowNumber} 처리 시작`);

      // 각 열의 셀 데이터를 처리
      row.eachCell((cell, colNumber) => {
        // 셀의 채우기(fill) 정보 가져오기
        const fill = cell.fill;

        // 셀의 fill 정보 여부 확인 및 로그 출력
        if (fill) {
          //console.log(`🔍 셀(${rowNumber}행, ${colNumber}열): fill 정보 =`, fill);
        } else {
          //console.log(`🔍 셀(${rowNumber}행, ${colNumber}열): fill 정보 없음`);
        }

        let isWhite = true; // 기본적으로 흰색으로 초기화

        // 셀의 색상 정보가 있는 경우 처리
        if (
          fill &&
          fill.type === "pattern" && // 패턴 타입이 있는지 확인
          fill.pattern === "solid" && // 단색 패턴인지 확인
          fill.fgColor // 색상 정보가 있는지 확인
        ) {
          const cellColor = fill.fgColor.argb; // 셀 색상 정보 (ARGB 형식)
          isWhite = cellColor === "FFFFFFFF"; // 색상이 흰색인지 확인

          // 비흰색 셀 로그 출력
          if (!isWhite) {
            console.log(
              `셀(${rowNumber}행, ${colNumber}열): 색상 = ${cellColor}, 흰색 여부 = ${isWhite}`
            );
            rowData.hasNonWhiteCell = true; // 비흰색 셀이 포함되었음을 표시
          }
        }

        // 셀 데이터를 rowData 배열에 추가
        rowData.values.push({
          column: colNumber, // 열 번호
          value: cell.value, // 셀 값
          isWhite, // 흰색 여부
        });
      });

      // 행 데이터를 결과 배열에 추가
      rowsData.push(rowData);

      // 행 처리 완료 로그
      //console.log(`✅ 행 ${rowNumber} 처리 완료:`, rowData);
    });

    // 결과 데이터를 JSON 응답으로 반환
    res.json({
      sheetName,
      rows: rowsData,
    });
  } catch (error) {
    // 에러 처리
    console.error("Excel 파일 처리 중 오류 발생:", error);
    res.status(500).json({ error: "Failed to process Excel file" });
  }
});


// post 방식
// app.post("/api/excel-Final", (req, res) => {
//   const { sheet } = req.body || {};
//   console.log('받은 sheet 값:', sheet);

//   if (!sheet) {
//     console.error("400 오류: 'sheet' 값이 요청에서 누락되었습니다.");
//     return res.status(400).json({ error: "Sheet name is required." });
//   }

//   try {
//     console.log(`Sheet 요청 처리 중: ${sheet}`);
//     res.status(200).json({ message: `Sheet '${sheet}' 처리 완료.` });
//   } catch (error) {
//     console.error("500 오류: 내부 서버 오류.", error.message);
//     res.status(500).json({ error: "서버 오류가 발생했습니다." });
//   }
// });


// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
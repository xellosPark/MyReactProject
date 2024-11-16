const express = require("express");
const XLSX = require("xlsx");
const app = express();
const PORT = 3001;
const cors = require("cors");

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

// 특정 시트의 데이터 가져오기 라우트
app.get("/api/excel-Final", (req, res) => {
  const sheetName = req.query.sheet;
  if (!sheetName) {
    // 시트 이름이 제공되지 않은 경우 오류 반환
    return res.status(400).json({ error: "시트 이름이 필요합니다" });
  }

  try {
    // Excel 파일을 읽어옴 (경로는 필요에 따라 수정)
    const workbook = XLSX.readFile("D:/Date/xlsxres/result_file_user-evaluated.xlsx");
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      // 요청한 시트가 없는 경우 오류 반환
      return res.status(404).json({ error: "시트를 찾을 수 없습니다" });
    }

    // 워크시트를 JSON 형식으로 변환
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // 파싱된 데이터를 JSON으로 응답
    res.json({
      headers: jsonData[0], // 첫 번째 행은 헤더로 사용
      rows: jsonData.slice(1), // 나머지 행은 데이터로 사용
      sheetNames: workbook.SheetNames, // 필요한 경우 시트 이름 포함
    });
  } catch (error) {
    console.error("Excel 파일을 읽는 중 오류 발생:", error);
    res.status(500).json({ error: "Excel 데이터를 불러오는 데 실패했습니다" });
  }
});

// 특정 시트의 데이터 가져오기 라우트
app.get("/api/excel-data", (req, res) => {
  const sheetName = req.query.sheet;
  if (!sheetName) {
    // 시트 이름이 제공되지 않은 경우 오류 반환
    return res.status(400).json({ error: "시트 이름이 필요합니다" });
  }

  try {
    // Excel 파일을 읽어옴 (경로는 필요에 따라 수정)
    const workbook = XLSX.readFile("D:/Date/xlsx/result_file_init.xlsx");
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      // 요청한 시트가 없는 경우 오류 반환
      return res.status(404).json({ error: "시트를 찾을 수 없습니다" });
    }

    // 워크시트를 JSON 형식으로 변환
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // 파싱된 데이터를 JSON으로 응답
    res.json({
      headers: jsonData[0], // 첫 번째 행은 헤더로 사용
      rows: jsonData.slice(1), // 나머지 행은 데이터로 사용
      sheetNames: workbook.SheetNames, // 필요한 경우 시트 이름 포함
    });
  } catch (error) {
    console.error("Excel 파일을 읽는 중 오류 발생:", error);
    res.status(500).json({ error: "Excel 데이터를 불러오는 데 실패했습니다" });
  }
});


// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
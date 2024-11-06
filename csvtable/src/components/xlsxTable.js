// src/components/XlsxTable.js
import React, { useState, useRef } from "react";
import * as XLSX from "xlsx"; // XLSX 라이브러리 import

export default function XlsxTable() {
  const [excelData, setExcelData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const fileInputRef = useRef(null); // 파일 입력을 참조하기 위한 ref 생성

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file); // 파일 확인 로그

    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.name.endsWith(".xlsx"))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];              // 첫 번째 시트를 가져옴
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });    // JSON으로 변환

        console.log("Parsed Excel data:", jsonData); // 파싱된 데이터 확인 로그
        setHeaders(jsonData[0]); // 첫 번째 행을 헤더로 설정
        setExcelData(jsonData.slice(1)); // 나머지 데이터를 테이블로 설정
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please select a valid Excel (.xlsx) file.");
    }
  };

  // 파일 선택 버튼 클릭 시 파일 입력을 트리거하는 함수
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {/* 파일 선택 버튼 */}
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        ref={fileInputRef} // ref 연결
        style={{ display: "none" }}
      />
      <button onClick={handleButtonClick}>Select Excel File</button>

      {/* 엑셀 데이터를 테이블로 표시 */}
      {excelData.length > 0 && (
        <table border="1" cellPadding="5" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

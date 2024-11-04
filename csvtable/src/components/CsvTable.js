// src/components/CsvTable.js
import React, { useState, useRef } from "react";
import Papa from "papaparse";

export default function CsvTable() {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const fileInputRef = useRef(null); // 파일 입력을 참조하기 위한 ref 생성

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file); // 파일 확인 로그

    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        complete: (result) => {
          console.log("Parsed CSV data:", result.data); // 파싱된 데이터 확인 로그
          setHeaders(result.data[0]); // 첫 번째 행을 헤더로 설정
          setCsvData(result.data.slice(1)); // 나머지 데이터를 테이블로 설정
        },
        header: false,
        skipEmptyLines: true,
      });
    } else {
      alert("Please select a valid CSV file.");
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
        accept=".csv"
        onChange={handleFileChange}
        ref={fileInputRef} // ref 연결
        style={{ display: "none" }}
      />
      <button onClick={handleButtonClick}>Select CSV File</button>

      {/* CSV 데이터를 테이블로 표시 */}
      {csvData.length > 0 && (
        <table border="1" cellPadding="5" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
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

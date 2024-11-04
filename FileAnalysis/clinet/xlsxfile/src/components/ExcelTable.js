import React, { useState } from 'react';

export default function ExcelDataFetcher() {
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [data, setData] = useState({ headers: [], rows: [] });
  const [error, setError] = useState(null);

  // 버튼 클릭 시 시트 이름 가져오기
  const fetchSheetNames = async () => {
    try {
      console.log('Fetching sheet names from server...'); // 요청 전 로그
      const response = await fetch('http://localhost:3001/api/sheet-names');
      console.log('Response received:', response); // 응답 로그
      if (!response.ok) {
        throw new Error('시트 이름을 가져오는 데 실패했습니다');
      }
      const result = await response.json();
      console.log('Parsed JSON:', result); // 파싱된 JSON 로그
      setSheetNames(result.sheetNames);
    } catch (err) {
      setError(err.message);
    }
  };

  // 특정 시트의 데이터 가져오기
  const fetchSheetData = async () => {
    if (!selectedSheet) {
      setError('시트를 선택해 주세요');
      return;
    }

    try {
      console.log('Selected sheet:', selectedSheet); // 선택된 시트 로그 출력
      const response = await fetch(`http://localhost:3001/api/excel-data?sheet=${selectedSheet}`);
      if (!response.ok) {
        throw new Error('시트 데이터를 가져오는 데 실패했습니다');
      }
      const result = await response.json();
      setData({ headers: result.headers, rows: result.rows });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Excel 데이터 가져오기</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={fetchSheetNames} style={{ marginBottom: '10px' }}>
        시트 목록 가져오기
      </button>
      {sheetNames.length > 0 && (
        <div>
          <label htmlFor="sheet-select">시트 선택: </label>
          <select
            id="sheet-select"
            value={selectedSheet}
            onChange={(e) => setSelectedSheet(e.target.value)}
          >
            <option value="">시트 선택...</option>
            {sheetNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button onClick={fetchSheetData} style={{ marginLeft: '10px' }}>
            데이터 가져오기
          </button>
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        {data.headers.length > 0 && (
          <table border="1" cellPadding="5" style={{ width: '100%', marginTop: '20px' }}>
            <thead>
              <tr>
                {data.headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, rowIndex) => (
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
    </div>
  );
}
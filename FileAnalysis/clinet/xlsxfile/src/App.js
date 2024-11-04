import React from "react";
import ExcelTable from "./components/ExcelTable";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>서버에서 가져온 Excel 데이터 보기</h1>
      <ExcelTable />
    </div>
  );
}

export default App;
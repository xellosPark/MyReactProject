import React from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import scheduleData from "./data/scheduleData.json";

function App() {
  return (
    <div>
      <Header title="Project Schedule" />
      <Table data={scheduleData} />
    </div>
  );
}

export default App;
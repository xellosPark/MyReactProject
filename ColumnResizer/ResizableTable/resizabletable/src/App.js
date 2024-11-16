import React, { useState } from "react";
import ResizableTable from "./components/ResizableTable";

const initialColumnWidths = {
  Name: 150,
  Age: 100,
  Email: 200,
  Address: 150,
  Phone: 150,
};

const customList = ["Name", "Age", "Email", "Address", "Phone"];

const App = () => {
  const [columnWidths, setColumnWidths] = useState(initialColumnWidths);

  // Example data
  const customDisplayData = Array.from({ length: 10 }, (_, index) => ({
    Name: `Name ${index + 1}`,
    Age: 20 + index,
    Email: `user${index + 1}@example.com`,
    Address: `Address ${index + 1}`,
    Phone: `+1234567890`,
  }));

  const handleUpdateColumnWidth = (updatedWidths) => {
    setColumnWidths(updatedWidths.columnWidths);
  };

  return (
    <div>
      <h2>Resizable Table Example</h2>
      <ResizableTable
        customDisplayData={customDisplayData}
        totalRecordsCount={customDisplayData.length}
        customList={customList}
        columnWidths={columnWidths}
        onUpdateColumnWidth={handleUpdateColumnWidth}
      />
    </div>
  );
};

export default App;
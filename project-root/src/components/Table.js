import React from "react";
import TableRow from "./TableRow";

function Table({ data }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Category</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Task</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Planned Work</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actual Work</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Completion Date</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Progress</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} item={item} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
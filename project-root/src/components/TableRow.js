import React from "react";

function TableRow({ item }) {
  return (
    <tr>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.category}</td>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.task}</td>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.plan.plannedWork}</td>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.plan.actualWork}</td>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.plan.completionDate}</td>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.plan.progress}</td>
    </tr>
  );
}

export default TableRow;
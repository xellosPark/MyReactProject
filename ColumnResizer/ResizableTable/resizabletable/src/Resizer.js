// src/components/Resizer.js
import React from "react";

export default function Resizer({ column }) {
  return (
    <div
      {...column.getResizerProps()}
      style={{
        display: "inline-block",
        background: "#ddd",
        width: "5px",
        height: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        cursor: "col-resize",
        userSelect: "none",
      }}
    />
  );
}
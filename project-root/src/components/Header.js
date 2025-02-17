import React from "react";

function Header({ title }) {
  return (
    <header style={{ textAlign: "center", padding: "10px", backgroundColor: "#f0f0f0" }}>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
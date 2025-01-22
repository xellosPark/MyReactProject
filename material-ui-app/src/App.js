import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { data } from "./data";

const App = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name", // Uses the default width from defaultColumn prop
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        enableResizing: false, // Disable resizing for this column
      },
      {
        accessorKey: "email",
        header: "Email Address",
        size: 200, // Increase the width of this column
      },
      {
        accessorKey: "city",
        header: "City",
        size: 120, // Decrease the width of this column
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 100, // Decrease the width of this column
      },
    ],
    []
  );

  return (
    <div style={{ padding: "20px" }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        // Optionally override the default column widths
        defaultColumn={{
          maxSize: 1000,
          minSize: 80,
          size: 150, // Default size is usually 180
        }}
        enableColumnResizing
        columnResizeMode="onChange" // Default behavior
      />
    </div>
  );
};

export default App;
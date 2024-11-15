import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CenteredDataGrid = () => {
  // Sample data for the table
  const columns = [
    { field: 'title1', headerName: 'Title 1', width: 200, resizable: true, align: 'center', headerAlign: 'center' },
    { field: 'title2', headerName: 'Title 2', width: 200, resizable: true, align: 'center', headerAlign: 'center' },
    { field: 'title3', headerName: 'Title 3', width: 200, resizable: true, align: 'center', headerAlign: 'center' },
    { field: 'operations', headerName: 'Operations', width: 200, resizable: true, align: 'center', headerAlign: 'center' },
  ];

  const rows = [
    { id: 1, title1: '123', title2: '', title3: '', operations: 'Operations' },
    { id: 2, title1: 'cdd', title2: 'edd', title3: '', operations: 'Operations' },
    { id: 3, title1: '1333', title2: '', title3: 'eee', operations: 'Operations' },
  ];

  return (
    <div style={{ width: '1000px', margin: '0 auto' }}>
      <h2>Integrate with react-resizable</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        columnBuffer={4} // Ensure enough buffer for smoother resizing
        disableExtendRowFullWidth
        sx={{
          '& .MuiDataGrid-cell': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f9f9f9',
            border: '1px solid red',
          },
        }}
      />
    </div>
  );
};

export default CenteredDataGrid;
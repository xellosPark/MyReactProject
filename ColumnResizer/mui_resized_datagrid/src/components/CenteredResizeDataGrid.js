import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CenteredDataGrid = () => {
  // Define columns with flexible width using `flex`
  const columns = [
    { field: 'title1', headerName: 'Title 1', minWidth: 150, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'title2', headerName: 'Title 2', minWidth: 150, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'title3', headerName: 'Title 3', minWidth: 150, flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'operations', headerName: 'Operations', minWidth: 150, flex: 1, headerAlign: 'center', align: 'center' },
  ];

  // Sample data for the rows
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
        disableExtendRowFullWidth
        autoHeight
        hideFooterSelectedRowCount
        sx={{
          '& .MuiDataGrid-cell': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f9f9f9',
            borderBottom: '2px solid red',
          },
        }}
      />
    </div>
  );
};

export default CenteredDataGrid;
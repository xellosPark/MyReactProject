import React from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';

// 데이터 설정 - 예제 데이터를 생성
const data = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  age: 20 + (index % 30),
  department: `Dept ${index % 10}`,
  role: `Role ${index % 5}`,
}));

// 컬럼 정의 - 각 컬럼을 위한 설정을 정의합니다
const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    minSize: 50,
    maxSize: 100,
    enableResizing: true, // 크기 조절 가능 설정
  },
  {
    accessorKey: 'name',
    header: 'Name',
    minSize: 100,
    maxSize: 300,
    enableResizing: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    minSize: 200,
    maxSize: 400,
    enableResizing: true,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    minSize: 50,
    maxSize: 150,
    enableResizing: true,
  },
  {
    accessorKey: 'department',
    header: 'Department',
    minSize: 100,
    maxSize: 200,
    enableResizing: true,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    minSize: 100,
    maxSize: 200,
    enableResizing: true,
  },
];

// ResizableTable 컴포넌트 생성
const ResizableTable = () => {
  return (
    <Box style={{ width: '100%', padding: '20px' }}>
      <MaterialReactTable
        columns={columns} // 테이블에 표시할 컬럼 설정
        data={data} // 테이블에 표시할 데이터
        enableColumnResizing // 컬럼 크기 조절 기능 활성화
        columnResizeMode="onEnd" // 사용자가 크기 조절을 완료한 후에만 변경 적용
        enableRowActions={false} // 행 액션 기능 비활성화
        enableRowSelection={false} // 행 선택 기능 비활성화
        enableColumnOrdering={false} // 컬럼 순서 변경 비활성화
        enableColumnFilters={false} // 컬럼 필터링 비활성화
        enableGlobalFilter={false} // 전체 필터 비활성화
        renderTopToolbarCustomActions={() => (
          <button>Custom Action</button> // 사용자 정의 버튼 추가
        )}
        initialState={{ columnVisibility: { role: true } }} // role 컬럼을 기본으로 고정하여 표시
        defaultColumn={{ size: 150 }} // 각 컬럼의 기본 크기를 150으로 설정
      />
    </Box>
  );
};

export default ResizableTable;
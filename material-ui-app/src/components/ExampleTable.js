import React from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { makeStyles } from '@mui/styles';

// 예제 데이터 및 컬럼 정의
const columns = [
  { accessorKey: 'id', header: 'ID', minSize: 50, maxSize: 100, enableResizing: true },
  { accessorKey: 'name', header: '이름', minSize: 150, maxSize: 300, enableResizing: true },
  { accessorKey: 'age', header: '나이', minSize: 80, maxSize: 500, enableResizing: true },
  { accessorKey: 'email', header: '이메일', minSize: 200, maxSize: 600, enableResizing: true },
  { accessorKey: 'department', header: '부서', minSize: 120, maxSize: 200, enableResizing: true },
];

// 스타일 정의
const useStyles = makeStyles({
  tableContainer: {
    width: '100%', // 전체 폭 설정
    overflowX: 'auto', // 가로 스크롤 활성화
  },
  table: {
    minWidth: 800, // 테이블 최소 폭 설정
  },
});

// 예제 테이블 컴포넌트 정의
export default function ExampleTable() {
  const classes = useStyles();

  // 데이터를 사용하는 예제
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 30),
    email: `user${i + 1}@example.com`,
    department: `Dept ${i % 10}`,
  }));

  return (
    <div className={classes.tableContainer}> {/* 테이블을 담는 컨테이너 */}
  <MaterialReactTable
    columns={columns} // 테이블에 표시할 컬럼 설정
    data={data} // 테이블에 표시할 데이터
    defaultColumn={{ size: 500 }} // 기본 컬럼의 크기를 500으로 설정
    enableColumnFilterModes // 컬럼 필터링 모드를 활성화
    enableColumnOrdering // 컬럼의 순서 변경 기능을 활성화
    enableColumnResizing // 컬럼 크기 조절 기능을 활성화
    enableEditing // 테이블의 데이터 편집 기능을 활성화
    enableColumnPinning // 컬럼 고정 기능을 활성화 (좌우 고정 가능)
    enableRowActions // 각 행에 대한 액션 버튼 기능을 활성화
    enableRowSelection // 행 선택 기능을 활성화
    enableSelectAll={false} // 모든 행 선택 기능을 비활성화
  />
</div>
  );
}
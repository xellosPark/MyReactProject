import React from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_FA } from 'material-react-table/locales/fa';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { faIR } from '@mui/material/locale';

// Person 인터페이스 정의 - 데이터 타입을 명시
interface Person {
  firstName: string;
  lastName: string;
  age: number;
  colorState?: string; // 선택적인 컬러 상태 필드
  buttonText?: string; // 선택적인 버튼 텍스트 필드
}

// 데이터를 생성하는 함수 - 각 탭에 대해 서로 다른 데이터 생성
const generateCustomData = () => {
  // 300개의 데이터 생성
  const generatedData: Person[] = Array.from({ length: 300 }, (_, i) => ({
    firstName: `User${i + 1}`,
    lastName: `Surname${i + 1}`,
    age: Math.floor(Math.random() * 50) + 20, // 나이 필드에 무작위 값 할당
  }));

  // Tab1의 데이터 설정
  const tab1Data = generatedData.slice(0, 100).map(row => ({
    ...row,
    colorState: 'red', // Tab1 데이터의 컬러 상태를 'red'로 설정
    buttonText: 'RISK', // Tab1 데이터의 버튼 텍스트를 'RISK'로 설정
  }));

  // Tab2의 데이터 설정
  const tab2Data = generatedData.slice(100, 200).map(row => ({
    ...row,
    colorState: 'gray', // Tab2 데이터의 컬러 상태를 'gray'로 설정
    buttonText: 'NO RISK', // Tab2 데이터의 버튼 텍스트를 'NO RISK'로 설정
  }));

  // Tab3의 데이터 설정
  const tab3Data = generatedData.slice(200, 300).map(row => ({
    ...row,
    colorState: 'gray', // Tab3 데이터의 컬러 상태를 'gray'로 설정
    buttonText: 'NO RISK', // Tab3 데이터의 버튼 텍스트를 'NO RISK'로 설정
  }));

  return [tab1Data, tab2Data, tab3Data]; // 각 탭의 데이터 배열 반환
};

// Material React Table의 컬럼 정의
const columns: MRT_ColumnDef<Person>[] = [
  { accessorKey: 'firstName', header: '이름' }, // 이름 필드
  { accessorKey: 'lastName', header: '성', enableClickToCopy: true }, // 성 필드, 클릭 시 복사 가능
  { accessorKey: 'age', header: '나이' }, // 나이 필드
];

// 메인 예제 컴포넌트 정의
const ExampleComponent = () => {
  const theme = useTheme(); // MUI 테마 가져오기
  const [tabIndex, setTabIndex] = React.useState(0); // 현재 탭 인덱스 상태 정의
  const [tab1Data, tab2Data, tab3Data] = generateCustomData(); // 각 탭에 대한 데이터 생성

  // 현재 선택된 탭의 데이터 설정
  const data = tabIndex === 0 ? tab1Data : tabIndex === 1 ? tab2Data : tab3Data;

  return (
    <ThemeProvider theme={createTheme({ ...theme, direction: 'rtl' }, faIR)}>
      <div style={{ direction: 'rtl', padding: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          {/* 탭 선택 버튼들 */}
          <button onClick={() => setTabIndex(0)}>TAB 1</button>
          <button onClick={() => setTabIndex(1)}>TAB 2</button>
          <button onClick={() => setTabIndex(2)}>TAB 3</button>
        </div>

        {/* Material React Table 컴포넌트 */}
        <MaterialReactTable
          columns={columns}
          data={data}
          defaultColumn={{ size: 250 }} // 기본 컬럼 크기 설정
          columnResizeDirection="rtl" // 컬럼 리사이즈 방향을 오른쪽에서 왼쪽으로 설정
          enableColumnFilterModes // 컬럼 필터링 모드 활성화
          enableColumnOrdering // 컬럼 순서 변경 활성화
          enableColumnResizing // 컬럼 크기 조절 활성화
          enableEditing // 편집 모드 활성화
          enableColumnPinning // 컬럼 고정 활성화
          enableRowActions // 행 액션 활성화
          enableRowSelection // 행 선택 활성화
          enableSelectAll={false} // 모든 행 선택 비활성화
          initialState={{ showColumnFilters: true, showGlobalFilter: true }} // 초기 상태 설정
          localization={MRT_Localization_FA} // 로컬라이제이션 설정 (페르시아어)
        />
      </div>
    </ThemeProvider>
  );
};

export default ExampleComponent;
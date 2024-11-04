// src/App.js
import React from "react";
import ResizableVirtualizedTable from "./ResizableTable";

// 컬럼 정의
const columns = [
  {
    Header: "ID",
    accessor: "id",
    width: 100,
  },
  {
    Header: "이름",
    accessor: "name",
    width: 200,
  },
  {
    Header: "나이",
    accessor: "age",
    width: 100,
  },
  {
    Header: "직업",
    accessor: "job",
    width: 200,
  },
  {
    Header: "도시",
    accessor: "city",
    width: 150,
  },
];

// 데이터 생성 함수
const createData = (id, name, age, job, city) => {
  return { id, name, age, job, city };
};

// 샘플 데이터 생성
const data = [
  createData(1, "김철수", 29, "개발자", "서울"),
  createData(2, "이영희", 34, "디자이너", "부산"),
  createData(3, "박민수", 45, "PM", "인천"),
  createData(4, "정다인", 28, "마케터", "대구"),
  createData(5, "최성민", 31, "엔지니어", "광주"),
  // 필요한 만큼 데이터 추가
];

export default function App() {
  const loadMoreItems = (startIndex, stopIndex) => {
    console.log("Load more items from", startIndex, "to", stopIndex);
  };

  return (
    <ResizableVirtualizedTable
      columns={columns}
      data={data}
      loadMoreItems={loadMoreItems}
      itemCount={data.length}
    />
  );
}

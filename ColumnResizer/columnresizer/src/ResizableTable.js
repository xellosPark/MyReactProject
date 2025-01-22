import React, { useState, useRef } from "react";
import "./ResizableTable.css";

const ResizableTable = () => {
  const columnRefs = useRef({}); // 각 열의 참조 저장
  const resizingState = useRef(null); // 리사이징 상태 저장

  // 초기 열 너비 설정
  const [columnWidths, setColumnWidths] = useState({
    col1: 10,
    col2: 10,
    col3: 10,
    col4: 10,
    col5: 10,
    col6: 10,
    col7: 10,
    col8: 10,
    col9: 10,
    col10: 10,
    col11: 10,
    col12: 10,
    col13: 10,
    col14: 150,
  });

  // 가상 데이터 생성
  const data = Array.from({ length: 10 }, (_, i) => ({
    col1: `데이터 ${i + 1}-1`, col2: `데이터 ${i + 1}-2`, col3: `데이터 ${i + 1}-3`,
    col4: `데이터 ${i + 1}-4`, col5: `데이터 ${i + 1}-5`, col6: `데이터 ${i + 1}-6`,
    col7: `데이터 ${i + 1}-7`, col8: `데이터 ${i + 1}-8`, col9: `데이터 ${i + 1}-9`,
    col10: `데이터 ${i + 1}-10`, col11: `데이터 ${i + 1}-11`, col12: `데이터 ${i + 1}-12`,
    col13: `데이터 ${i + 1}-13`, col14: `데이터 ${i + 1}-14`,
  }));

  const getNextColumnKey = (currentColumnKey) => {
    const keys = Object.keys(columnWidths); // Get all column keys
    const currentIndex = keys.indexOf(currentColumnKey); // Find index of the current column
  
    // Return the next column key if it exists
    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
      return keys[currentIndex + 1];
    }
    return null; // No adjacent column
  };

  const startResizing = (e, columnKey) => {
    // 특정 열(col1, col13, col14)의 크기 조정을 비활성화
    if (["col1", "col13", "col14"].includes(columnKey)) {
        return; // 이 열은 크기 조정이 불가능합니다.
    }

    // 초기 테이블 전체 너비 계산
    const initialTableWidth = Object.values(columnWidths).reduce(
        (total, width) => total + width,
        0
    );

    // 현재 열 및 인접 열의 초기 너비 가져오기
    const startWidth = columnRefs.current[columnKey]?.offsetWidth || 0;
    const adjacentColumnKey = getNextColumnKey(columnKey); // 인접 열의 키 가져오기
    const adjacentStartWidth =
        columnRefs.current[adjacentColumnKey]?.offsetWidth || 0;

    // 마우스 시작 위치 저장
    const startX = e.clientX;

    // 초기 상태 저장
    resizingState.current = {
        startX,
        startWidth,
        adjacentStartWidth,
        initialTableWidth,
    };

    // 마우스 이동 이벤트 핸들러
    const onMouseMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - resizingState.current.startX; // 마우스 이동 거리 계산

        // 현재 열의 새로운 너비 계산 (최소 너비: 10px)
        let newWidth = Math.max(
            resizingState.current.startWidth + deltaX,
            10
        );
        // 인접 열의 새로운 너비 계산 (최소 너비: 10px)
        let adjacentNewWidth = Math.max(
            resizingState.current.adjacentStartWidth - deltaX,
            10
        );

        // 음수 값 방지
        if (newWidth < 10 || adjacentNewWidth < 10) {
            newWidth = Math.max(newWidth, 10);
            adjacentNewWidth = Math.max(adjacentNewWidth, 10);
        }

        // 현재 테이블 전체 너비 계산
        const currentTotalWidth = Object.values({
            ...columnWidths,
            [columnKey]: newWidth,
            [adjacentColumnKey]: adjacentNewWidth,
        }).reduce((total, width) => total + width, 0);

        // 테이블 전체 너비 고정 (초기 너비 유지)
        if (currentTotalWidth !== resizingState.current.initialTableWidth) {
            const adjustment =
                resizingState.current.initialTableWidth - currentTotalWidth;
            if (adjustment > 0) {
                // 너비 부족 -> 인접 열 너비 추가
                adjacentNewWidth += adjustment;
            } else {
                // 초과 너비 -> 현재 열 너비 감소
                newWidth += adjustment;
            }
        }

        // 최종 유효성 검사 (음수 값 방지)
        if (newWidth < 10 || adjacentNewWidth < 10) {
            console.error(
                "열 크기가 음수로 설정되었습니다. 조정을 중단합니다.",
                { newWidth, adjacentNewWidth }
            );
            return;
        }

        // 열 크기 업데이트
        setColumnWidths((prevWidths) => {
            const updatedWidths = { ...prevWidths };
            updatedWidths[columnKey] = newWidth; // 현재 열 크기 업데이트
            updatedWidths[adjacentColumnKey] = adjacentNewWidth; // 인접 열 크기 업데이트
            return updatedWidths;
        });
    };

    // 마우스 버튼 해제 이벤트 핸들러
    const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove); // 마우스 이동 이벤트 제거
        document.removeEventListener("mouseup", onMouseUp); // 마우스 버튼 해제 이벤트 제거
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousemove", onMouseMove); // 마우스 이동 이벤트 추가
    document.addEventListener("mouseup", onMouseUp); // 마우스 버튼 해제 이벤트 추가
};

// 버튼 클릭 시 실행되는 함수
const handleLogColumnSizes = () => {
    const totalWidth = Object.values(columnWidths).reduce(
        (total, width) => total + width,
        0
    );

    console.log("현재 테이블 전체 너비:", totalWidth); // 전체 열 너비 출력
    console.log("각 열의 현재 크기 상태:", columnWidths); // 각 열의 현재 크기 출력
};

  return (

    <div className="table-container">
              {/* 로그 출력 버튼 */}
      <button onClick={handleLogColumnSizes}>현재 열 크기 로그 출력</button>
      <table className="resizable-table">
        <thead>
          <tr>
            {Object.keys(columnWidths).map((key) => (
              <th
                key={key}
                ref={(el) => {
                  if (el) columnRefs.current[key] = el;
                }}
                style={{ width: `${columnWidths[key]}px` }}
              >
                {key}
                <div
                  className="resize-handle"
                  onMouseDown={(e) => startResizing(e, key)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key) => (
                <td key={key} style={{ width: `${columnWidths[key]}px` }}>
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResizableTable;

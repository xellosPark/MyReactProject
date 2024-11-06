// src/components/ResizableVirtualizedTable.js
import React, { useCallback } from "react";
import {
  useTable,
  useFlexLayout,
  useResizeColumns,
  useRowSelect,
} from "react-table";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Resizer from "./Resizer"; // Import the resizer component

function TableRow({ row, style, prepareRow }) {
  prepareRow(row);
  return (
    <tr {...row.getRowProps({ style })}>
      {row.cells.map((cell) => (
        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
      ))}
    </tr>
  );
}

export default function ResizableVirtualizedTable({ columns, data, loadMoreItems, itemCount }) {
  const defaultColumn = { width: 150 }; // 기본 컬럼 너비 설정

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    getTableBodyProps,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout,
    useResizeColumns,
    useRowSelect
  );

  // 행 렌더링 콜백 함수
  const renderRow = useCallback(
    (rows) =>
      ({ index, style }) => {
        const row = rows[index];
        return (
          <TableRow prepareRow={prepareRow} row={row} style={style} />
        );
      },
    [prepareRow]
  );

  return (
    <div
      style={{
        height: "calc(100vh - 152px)", // 전체 높이에서 152px를 뺀 높이
        overflowY: "hidden",
        overflowX: "auto",
      }}
    >
      <table
        {...getTableProps()}
        style={{
          height: "100%",
          overflow: "hidden",
          tableLayout: "fixed",
        }}
      >
        <thead style={{ overflow: "hidden" }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps({ style: { width: "100%" } })}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <Resizer column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} style={{ height: "100%", overflow: "hidden" }}>
          <AutoSizer disableWidth>
            {({ height }) => (
              <FixedSizeList
                height={height}
                itemCount={rows.length}
                itemSize={52}
                width="100%"
              >
                {renderRow(rows)}
              </FixedSizeList>
            )}
          </AutoSizer>
        </tbody>
      </table>
    </div>
  );
}
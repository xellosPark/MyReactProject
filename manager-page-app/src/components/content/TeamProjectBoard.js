import React from 'react';
import './TeamProjectBoard.css';

const TeamProjectBoard = () => {
  const data = [
    {
      sequence: 1,
      project: 'test1',
      status: 'Completed',
      personnel: 'Hong Gil-dong',
      proposalMM: '1.5MM',
      startWeek: 1,
      endWeek: 8,
      progress: 100, // 진행률 추가
      inCharge: 'Dooly',
      editDelete: 'Edit/Delete'
    },
    {
      sequence: 2,
      project: 'test2',
      status: 'In Progress',
      personnel: 'Gil-dong',
      proposalMM: '1.5MM',
      startWeek: 9,
      endWeek: 16,
      progress: 50, // 진행률 추가
      inCharge: 'Dooly',
      editDelete: 'Edit/Delete'
    }
    // Add more data as needed
  ];

  const renderProgressBar = (start, end, progress) => {
    const totalWeeks = end - start + 1;
    const progressBarWidth = (progress / 100) * 100; // Progress width in percentage
    return (
      <div className="progress-bar-container" style={{ width: '100%' }}>
        <div className="progress-bar" style={{ width: `${progressBarWidth}%` }}>
          {progress}%
        </div>
      </div>
    );
  };

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th rowSpan="2" style={{ width: '50px' }}>순번</th>
            <th rowSpan="2" style={{ width: '150px' }}>프로젝트명</th>
            <th rowSpan="2" style={{ width: '100px' }}>상태</th>
            <th rowSpan="2" style={{ width: '100px' }}>인원</th>
            <th rowSpan="2" style={{ width: '80px' }}>제안MM</th>
            {Array.from({ length: 12 }, (_, i) => (
              <th key={i} colSpan="4" className="month-header">{i + 1}월</th>
            ))}
            <th rowSpan="2" style={{ width: '100px' }}>담당자</th>
            <th rowSpan="2" style={{ width: '100px' }}>수정 / 삭제</th>
          </tr>
          <tr>
            {Array.from({ length: 12 * 4 }, (_, i) => (
              <th key={i} className={`week-cell ${(i % 4 === 0) ? 'thick-border' : ''}`}>{i % 4 + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.sequence}</td>
              <td>{item.project}</td>
              <td>{item.status}</td>
              <td>{item.personnel}</td>
              <td>{item.proposalMM}</td>
              {Array.from({ length: 48 }, (_, j) => {
                if (j === item.startWeek - 1) {
                  return (
                    <td key={j} colSpan={item.endWeek - item.startWeek + 1} style={{ padding: 2 }}>
                      {renderProgressBar(item.startWeek, item.endWeek, item.progress)}
                    </td>
                  );
                } else if (j >= item.startWeek && j < item.endWeek) {
                  return null;
                } else {
                  return <td key={j}></td>;
                }
              })}
              <td>{item.inCharge}</td>
              <td>{item.editDelete}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamProjectBoard;
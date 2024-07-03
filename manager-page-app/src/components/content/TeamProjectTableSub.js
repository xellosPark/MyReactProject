import React from 'react';
import './TeamProjectTableSub.css';

const TeamProjectTableSub = () => {
  const data = [
    {
      no: 1,
      projectName: "P8 ~ P8E ADR+ 개발",
      part: 1,
      status: "셋업",
      personnel: "김상준",
      offense: 2,
      defense: 3,
      months: 3, // 진행률 바가 표시될 개월 수
      progress: 80, // 진행률 백분율
      issues: "2021. 3분기에 비용 청구"
    },
    {
      no: 2,
      projectName: "AP4 MTO 셋업 및 ADJ 개발",
      part: 1,
      status: "제작 셋업",
      personnel: "김상준",
      offense: 8,
      defense: 10,
      months: 10, // 진행률 바가 표시될 개월 수
      progress: 80, // 진행률 백분율
      issues: ""
    },
    // 필요한 만큼 데이터를 추가하세요
  ];

  return (
    <div className="project-table-container">
      <table className="project-table">
        <thead>
          <tr className="project-table-header">
            <th className="project-table-header-cell">No</th>
            <th className="project-table-header-cell">프로젝트명</th>
            <th className="project-table-header-cell">파트</th>
            <th className="project-table-header-cell">상태</th>
            <th className="project-table-header-cell">투입인원</th>
            <th className="project-table-header-cell">진행개월</th>
            <th className="project-table-header-cell">1월</th>
            <th className="project-table-header-cell">2월</th>
            <th className="project-table-header-cell">3월</th>
            <th className="project-table-header-cell">4월</th>
            <th className="project-table-header-cell">5월</th>
            <th className="project-table-header-cell">6월</th>
            <th className="project-table-header-cell">7월</th>
            <th className="project-table-header-cell">8월</th>
            <th className="project-table-header-cell">9월</th>
            <th className="project-table-header-cell">10월</th>
            <th className="project-table-header-cell">11월</th>
            <th className="project-table-header-cell">12월</th>
            <th className="project-table-header-cell">이슈 및 비교</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="project-table-row">
              <td className="project-table-cell">{row.no}</td>
              <td className="project-table-cell">{row.projectName}</td>
              <td className="project-table-cell">{row.part}</td>
              <td className="project-table-cell">{row.status}</td>
              <td className="project-table-cell">{row.personnel}</td>
              <td className="project-table-cell">{row.offense}/{row.defense}</td>
              <td className="project-table-cell" colSpan={row.months}>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${row.progress}%` }}>
                    {row.progress}%
                  </div>
                </div>
              </td>
              {[...Array(12 - row.months)].map((_, idx) => (
                <td key={idx} className="project-table-cell"></td>
              ))}
              <td className="project-table-cell">{row.issues}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamProjectTableSub;
import React, { useState } from 'react';
import './TeamProjectTableSub.css';

const TeamProjectTableSub = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const data = [
    {
      no: 1,
      projectName: "P8 ~ P8E ADR+ Development",
      part: 1,
      status: "Setup",
      personnel: "Gildong",
      offense: 2,
      defense: 3,
      months: 3, // 진행률 바가 표시될 개월 수
      progress: 80, // 진행률 백분율
      issues: "2021년 3분기에 청구 예정"
    },
    {
      no: 2,
      projectName: "AP4 MTO setup and ADJ development",
      part: 1,
      status: "Production Setup",
      personnel: "Hong Ki-dong",
      offense: 8,
      defense: 10,
      months: 10, // 진행률 바가 표시될 개월 수
      progress: 80, // 진행률 백분율
      issues: ""
    },
    {
      no: 3,
      projectName: "XYZ Project Phase 1",
      part: 2,
      status: "Initiation",
      personnel: "Kim Yuna",
      offense: 5,
      defense: 4,
      months: 4, // 진행률 바가 표시될 개월 수
      progress: 60, // 진행률 백분율
      issues: "승인 대기 중"
    },
    {
      no: 4,
      projectName: "Alpha Beta Gamma Integration",
      part: 3,
      status: "Development",
      personnel: "Lee Minho",
      offense: 7,
      defense: 6,
      months: 6, // 진행률 바가 표시될 개월 수
      progress: 50, // 진행률 백분율
      issues: "모듈 B에서 기술적 문제 발생"
    },
    {
      no: 5,
      projectName: "Data Migration for XYZ Corp",
      part: 1,
      status: "Planning",
      personnel: "Park Jisoo",
      offense: 3,
      defense: 5,
      months: 5, // 진행률 바가 표시될 개월 수
      progress: 30, // 진행률 백분율
      issues: "자원 할당 필요"
    },
    {
      no: 6,
      projectName: "Mobile App Launch",
      part: 2,
      status: "Testing",
      personnel: "Choi Sooyoung",
      offense: 6,
      defense: 7,
      months: 7, // 진행률 바가 표시될 개월 수
      progress: 90, // 진행률 백분율
      issues: "버그 수정 진행 중"
    },
    {
      no: 7,
      projectName: "Cloud Infrastructure Setup",
      part: 3,
      status: "Deployment",
      personnel: "Kim Taehyung",
      offense: 6,
      defense: 8,
      months: 8, // 진행률 바가 표시될 개월 수
      progress: 75, // 진행률 백분율
      issues: "보안 검토 대기 중"
    }
  ]

  const handleCheckboxChange = (index) => {
    setSelectedRow(index);
  };

  return (
    <div className="project-table-container">
      <table className="project-table">
        <thead>
          <tr className="project-table-header">
            <th className="project-table-header-cell">#</th>
            <th className="project-table-header-cell">프로젝트명</th>
            <th className="project-table-header-cell">파트</th>
            <th className="project-table-header-cell">상태</th>
            <th className="project-table-header-cell">투입인원</th>
            <th className="project-table-header-cell">공격/수비</th>
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
              <td className="project-table-cell">
                <input
                  type="checkbox"
                  checked={selectedRow === index}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
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
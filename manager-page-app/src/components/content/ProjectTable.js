import React, { useState } from 'react';
import './ProjectTable.css';

const ProjectTable = ({ projects }) => {
  const [viewStates, setViewStates] = useState(projects.map(() => false));

  const handleToggle = (index) => {
    setViewStates((prevStates) => 
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleEdit = (project) => {
    alert(`Editing project: ${project.name}`);
  };

  const handleCreate = () => {
    alert('Creating new project');
  };

  return (
    <div className="project-container">
      <div className="table-counter">
        <span>총 프로젝트: {projects.length}</span>
        <button className="create-button" onClick={handleCreate}>
          프로젝트 생성
        </button>
      </div>
      <div className="project-table">
        <table>
          <thead>
            <tr>
              <th>프로젝트명</th>
              <th>유형</th>
              <th>PM</th>
              <th>인원</th>
              <th>부서</th>
              <th>상태</th>
              <th>시작일</th>
              <th>완료일</th>
              <th>View</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                <td>{project.type}</td>
                <td>{project.pm}</td>
                <td>
                  <div className="personnel-list">
                    {project.personnel.join(', ')}
                  </div>
                </td>
                <td>{project.department}</td>
                <td>{project.status}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={viewStates[index]}
                      onChange={() => handleToggle(index)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(project)}
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
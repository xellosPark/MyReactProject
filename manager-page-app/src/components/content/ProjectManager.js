import React from 'react';
import ProjectTable from './ProjectTable';

const ProjectManager = () => {
  const projects = [
    {
      name: 'ELA',
      type: '1파트',
      pm: '홍길동',
      personnel: ['홍길동', '이순신', '강감찬', '유관순', '세종대왕'],
      department: '자동화 사업부',
      status: '시작전',
      startDate: '2018-09-21',
      endDate: '2019-12-28',
      View: true,
      // progress: 100,
    },
    {
      name: '패턴',
      type: '2파트',
      pm: 'sysadmin',
      personnel: ['까치', '둘리', '루피'],
      department: '자동화 사업부',
      status: '시작전',
      startDate: '2019-07-23',
      endDate: '2021-03-08',
      View: true,
      // progress: 72,
    },
  ];

  return (
    <div>
      <ProjectTable projects={projects} />
    </div>
  );
};

export default ProjectManager;
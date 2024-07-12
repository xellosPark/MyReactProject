import React from 'react';
import TeamProjectTableSub from './TeamProjectTableSub'
import TeamprojectsData from "./TeamprojectsData"; 
import TeamProjectBoard from './TeamProjectBoard';

const TeamProjectTable = () => {
  return (
    <div>
        {/* <TeamProjectTableSub posts={TeamprojectsData} /> */}
        <TeamProjectBoard posts={TeamprojectsData} />
    </div>
  );
};

export default TeamProjectTable;
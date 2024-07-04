import React from 'react';
import TeamProjectTableSub from './TeamProjectTableSub'
import TeamprojectsData from "./TeamprojectsData"; 

const TeamProjectTable = () => {
  return (
    <div>
        <TeamProjectTableSub posts={TeamprojectsData} />
    </div>
  );
};

export default TeamProjectTable;
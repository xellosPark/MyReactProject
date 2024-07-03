import React from 'react';
import './ProjectProgress.css';

const ProjectProgress = ({ name, progress, score }) => {
  return (
    <div className="project-progress">
      <span className="progress-label">{name} {score}</span>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
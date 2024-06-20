import React from 'react';
import './Sider.css';

const Sider = ({ isCollapsed, onToggle, onItemClick }) => {
  return (
    <div className={`sider ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sider-item" onClick={() => onItemClick('TeamTodoList')}>
        <i className="fas fa-desktop"></i> {!isCollapsed && 'Team TodoList'}
      </div>
      <div className="sider-item" onClick={() => onItemClick('ProjectManager')}>
        <i className="fas fa-chart-pie"></i> {!isCollapsed && 'Project Manager'}
      </div>
      <div className="sider-item" onClick={() => onItemClick('UserProfile')}>
        <i className="fas fa-user"></i> {!isCollapsed && 'User'}
      </div>
      <div className="sider-item" onClick={() => onItemClick('Team')}>
        <i className="fas fa-users"></i> {!isCollapsed && 'Team'}
      </div>
      <div className="sider-item" onClick={() => onItemClick('Files')}>
        <i className="fas fa-file"></i> {!isCollapsed && 'Files'}
      </div>
      <div className="sider-item" onClick={onToggle}>
        <i className={`fas fa-arrow-${isCollapsed ? 'right' : 'left'}`}></i> {!isCollapsed && '최소화'}
      </div>
    </div>
  );
};

export default Sider;
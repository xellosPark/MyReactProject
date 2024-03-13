import React, { useState } from 'react';

const TabBar = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('첫화면');

  const tabBarStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    background: 'linear-gradient(to bottom, #f5f5f5 0%,#e8e8e8 100%)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '5px',
    maxWidth: '600px',
    margin: 'auto'
  };

  const tabStyle = {
    flex: '1',
    textAlign: 'center',
    padding: '10px 0',
    margin: '0 2px',
    backgroundColor: '#CCCCFF', // Default tab color
    borderRadius: '5px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.3s',
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: '#CCFFCC', // Active tab color
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)',
  };

  // Handler to change active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Function to apply the correct style based on the active tab
  const getTabStyle = (tabName) => {
    return tabName === activeTab ? activeTabStyle : tabStyle;
  };

  return (
    <div style={tabBarStyle}>
      <div style={getTabStyle('첫화면')} onClick={() => handleTabClick('첫화면')}>첫화면</div>
      <div style={getTabStyle('공략')} onClick={() => handleTabClick('공략')}>공략</div>
      <div style={getTabStyle('요원')} onClick={() => handleTabClick('요원')}>요원</div>
      <div style={getTabStyle('맵리')} onClick={() => handleTabClick('맵리')}>맵리</div>
      <div style={getTabStyle('채소')} onClick={() => handleTabClick('채소')}>채소</div>
    </div>
  );
}

export default TabBar;
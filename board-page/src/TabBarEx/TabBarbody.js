import React, { useState, useEffect } from 'react';

const TabBarbody = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(Math.floor(Math.random() * tabs.length));

  useEffect(() => {
    setActiveTab(Math.floor(Math.random() * tabs.length));
  }, [tabs]);

  const tabWidth = 120; // Fixed width for each tab
  const tabMargin = 5; // Margin for each tab
  const tabBarPadding = 10; // Padding on each side of the tab bar
  // Calculate the total width of the tab bar
  const tabBarWidth = tabs.length * (tabWidth + tabMargin * 2) + tabBarPadding * 2;

  const tabBarStyle = {
    display: 'flex',
    justifyContent: 'center',
    background: '#e1ecf4',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '5px',
    width: `${tabBarWidth}px`, // Use calculated width
    margin: '20px auto'
  };

  const tabStyle = {
    textAlign: 'center',
    padding: '10px',
    margin: '0 5px',
    backgroundColor: '#A4EFA9',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.3s',
    width: '120px',
    height: '50px',
    lineHeight: '50px',
    borderRadius: '10px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: '#97caeb',
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const getTabStyle = (index) => {
    return index === activeTab ? activeTabStyle : tabStyle;
  };

  return (
    <div style={tabBarStyle}>
      {tabs.map((tab, index) => (
        <div key={index} style={getTabStyle(index)} onClick={() => handleTabClick(index)}>
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabBarbody;
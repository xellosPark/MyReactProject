import React, { useState, useEffect } from 'react';

function TabBarbody2( { tabs } ) {
    const [activeTab, setActiveTab] = useState(Math.floor(Math.random() * tabs.length));

    useEffect(() => {
      setActiveTab(Math.floor(Math.random() * tabs.length)); // Random active tab on mount
    }, [tabs]);
  
    const tabBarStyle = {
      display: 'flex',
      justifyContent: 'center',
      background: '#FBCB90', // Assuming the background color of the bar should be like the picture
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '5px',
      width: '400px', // The width will automatically adjust to the content
      margin: '20px auto'
    };
  
    // Different background colors for each tab as seen in the picture
    const tabBackgrounds = ['#A4EFA9', '#A2D2FF', '#FBCB90']; // Replace with actual colors from the picture
  
    const tabStyle = (index) => ({
      textAlign: 'center',
      padding: '10px 20px',
      margin: '0 5px',
      backgroundColor:  tabBackgrounds[index], // Apply the background color based on index
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'background-color 0.3s',
      width: '120px', // Fixed width
      height: '50px', // Fixed height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px', // Assuming rounded corners for each tab
      fontSize: '16px',
      boxShadow: activeTab === index ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none', // Shadow to highlight the active tab
    });
  
    const handleTabClick = (index) => {
      setActiveTab(index);
    };
  
    return (
      <div style={tabBarStyle}>
        {tabs.map((tab, index) => (
          <div 
            key={index} 
            style={tabStyle(index)} 
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </div>
        ))}
      </div>
    );
  };

export default TabBarbody2
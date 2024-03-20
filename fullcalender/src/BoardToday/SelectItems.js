// SelectItems.js
import React from 'react';
import './SelectItems.css';

function SelectItems({ selectedSports, setSelectedSports }) {
  const sportsOptions = [
    { name: '전 체', color: '#CCFFCC' },
    { name: '대 기', color: '#CCCCFF' },
    { name: '진행중', color: '#FFFFCC' },
    { name: '완 료', color: '#CCFFFF' },
    { name: '이 슈', color: '#FFCCFF' },
  ];

  const handleSelectSport = (sport) => {
    setSelectedSports((prevSelectedSports) => {
      const updatedSelectedSports = new Set(prevSelectedSports);
      
      if (sport === '전 체') {
        if (updatedSelectedSports.has(sport)) {
          updatedSelectedSports.clear();
        } else {
          updatedSelectedSports.clear();
          updatedSelectedSports.add(sport);
        }
      } else {
        updatedSelectedSports.delete('전 체');
        if (updatedSelectedSports.has(sport)) {
          updatedSelectedSports.delete(sport);
        } else {
          updatedSelectedSports.add(sport);
        }
      }
       // Log the updated selected sports before the state is updated
    console.log('Updated selected sports:', Array.from(updatedSelectedSports));
      return updatedSelectedSports;
    });
  };

  return (
    <div className="sports-container">
      <h2>Choose your sports</h2>
      <div className="sports-grid">
        {sportsOptions.map((sport) => (
          <div
            key={sport.name}
            className={`sports-item ${selectedSports.has(sport.name) ? 'selected' : ''}`}
            style={{ backgroundColor: sport.color }}
            onClick={() => handleSelectSport(sport.name)}
          >
            {sport.name}
            <span className="checkmark">
              {selectedSports.has(sport.name) ? '✓' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectItems;
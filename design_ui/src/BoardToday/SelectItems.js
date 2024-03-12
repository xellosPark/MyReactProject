
import React, { useState } from 'react';
import './SelectItems.css'

function SelectItems() {
    const sportsOptions = [
        { name: 'Volleyball', selected: false, color: '#FFCCCC' },
        { name: 'Swimming',   selected: false, color: '#CCFFCC' },
        { name: 'Surfing',    selected: false, color: '#CCCCFF' },
        { name: 'Running',    selected: false, color: '#FFFFCC' },
        { name: 'Cycling',    selected: false, color: '#CCFFFF' },
        { name: 'Yoga',       selected: false, color: '#FFCCFF' },
      ];
      const [selectedSports, setSelectedSports] = useState(new Set());

      const handleSelectSport = (sport) => {
        setSelectedSports((prevSelectedSports) => {
          const updatedSelectedSports = new Set(prevSelectedSports);
          if (updatedSelectedSports.has(sport)) {
            updatedSelectedSports.delete(sport);
          } else {
            updatedSelectedSports.add(sport);
          }
          return updatedSelectedSports;
        });
      };
  return (
    <div className="app">
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
    </div>
  )
}

export default SelectItems
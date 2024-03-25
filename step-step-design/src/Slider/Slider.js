
import React, { useState } from 'react';
import './Slider.css'; // Make sure to create a CSS file with the name Slider.css


const Slider = () => {

const marks = {
    0: '지원자 확인',
    1: '면접 요청',
    2: '합격자 발표',
    3: '근로계약',
    };      
    const [value, setValue] = useState(0);
    const handleChange = (event) => {
    setValue(event.target.value);
    };

return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="3"
        value={value}
        onChange={handleChange}
        className="slider"
      />
      <div className="slider-marks">
        {Object.entries(marks).map(([key, mark]) => (
          <button key={key} className={`mark${value === key ? ' active' : ''}`}>
            {mark}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
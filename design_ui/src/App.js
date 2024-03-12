import React from 'react';
import './App.css';
import FullCalendarComponent from "./BoardToday/FullCalendarComponent"
import Today from "./BoardToday/Today"
import SelectItems from "./BoardToday/SelectItems"

// Define a single item component
const Item = ({name , number, additionalClass }) => {
  return (
    <div className={`item ${additionalClass}`}>
      {name} {number}
    </div>
  );
};

// Main App component that composes the screen
const App = () => {
  return (
    <div className="container">
      <div className="left-column">
        <div className="top-row">
          <Item name="이름" additionalClass="item-blue" />
          <Item name="팀/파트"  additionalClass="item-green" />
        </div>
        
        {/* <div className="middle-row">
          <Item number={4} additionalClass="item-gray" />
          <Item number={5} additionalClass="item-gray" />
        </div> */}
        <div className="top-row">
          <Item name="이수정" additionalClass="item-White" />
          <Item name="1팀 2파트" additionalClass="item-White" />
        </div>
        <SelectItems className="bbb" />
        <Today className="item-normal" />
      </div>
      <div className="right-column">
        <FullCalendarComponent className="item-extra-large" />
      </div>
    </div>
  );
};

export default App;
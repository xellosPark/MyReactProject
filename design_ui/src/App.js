import React, { useState } from 'react';
import './App.css';
import FullCalendarComponent from "./BoardToday/FullCalendarComponent"
import Today from "./BoardToday/Today"
import SelectItems from "./BoardToday/SelectItems"

const Item = ({ name, number, additionalClass }) => {
  return (
    <div className={`item ${additionalClass}`}>
      {name} {number}
    </div>
  );
};

const App = () => {
  // 초기 상태로 '전 체'를 지정합니다.
  const [selectedSports, setSelectedSports] = useState(new Set());

  return (
    <div className="container">
      <div className="left-column">
        <div className="top-row">
          <Item name="이름" additionalClass="item-blue" />
          <Item name="팀/파트" additionalClass="item-green" />
        </div>
        <div className="top-row">
          <Item name="이수정" additionalClass="item-White" />
          <Item name="1팀 2파트" additionalClass="item-White" />
        </div>
        
        {/* 선택 항목 컴포넌트에 현재 선택된 항목과 선택을 변경하는 함수를 전달합니다. */}
        <SelectItems selectedSports={selectedSports} setSelectedSports={setSelectedSports} />
        <Today className="item-normal" />
      </div>
      <div className="right-column">
        {/* 달력 컴포넌트에 현재 선택된 항목을 전달합니다. */}
        <FullCalendarComponent className="item-extra-large" selectedCategory={selectedSports}/>
      </div>
    </div>
  );
};

export default App;
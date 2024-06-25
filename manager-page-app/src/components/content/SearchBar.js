// src/components/SearchBar.js
import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchBar.css';
import ko from 'date-fns/locale/ko'; // 한국어 로케일을 임포트합니다.
registerLocale('ko', ko); // datepicker에 로케일을 등록합니다.

const SearchBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="search-bar">
      <div>기간 검색</div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Start Date"
        className="date-picker"
      />
      <span>-</span>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="End Date"
        className="date-picker"
      />
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="dropdown"
      >
        <option value="">선택</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <input type="text" placeholder="내용입력" className="input-field" />
      <button className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
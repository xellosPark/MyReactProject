import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './CustomDatePicker.css';

const CustomDatePicker = () => {
    // 오늘 날짜를 구합니다.
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(new Date(today));


    // 이번 달의 마지막 날을 구합니다.
    //const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // 다음 달의 마지막 날을 구합니다.
    //const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 0, 0);

    // 오늘 날짜의 다음 날을 구합니다.
    // const tomorrow = new Date(today);
    // tomorrow.setDate(tomorrow.getDate() + 1);

    // 드롭박스에서 선택한 기간에 따라 endDate를 계산합니다.
    const handleSelectChange = (e) => {
        const value = e.target.value;
        const newEndDate = new Date(startDate);

        if (value === '1Day') {
            newEndDate.setDate(newEndDate.getDate());
        } else if (value === '7Day') {
            newEndDate.setDate(newEndDate.getDate() + 7);
        } else if (value === '1months') {
            newEndDate.setMonth(newEndDate.getMonth() + 1);
        } else if (value === '3months') {
            newEndDate.setMonth(newEndDate.getMonth() + 3);
        } else if (value === '6months') {
            newEndDate.setMonth(newEndDate.getMonth() + 6);
        } else if (value === '1year') {
            newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        }

        setEndDate(newEndDate);
    };

    return (
        <div className="custom-date-picker">
            <select 
                className="date-range-selector"
                onChange={handleSelectChange} // 이벤트 핸들러를 변경합니다.
            >
                <option value="1Day">현재</option>
                <option value="7Day">7일</option>
                <option value="1months">1개월</option>
                <option value="3months">3개월</option>
                <option value="6months">6개월</option>
                <option value="1year">1년</option>
            </select>
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy/MM/dd"
            />
            <span>-</span>
            <DatePicker
                selected={endDate}
                dateFormat="yyyy/MM/dd"
                readOnly // 끝 날짜는 드롭박스 선택에 의해 결정되므로 readOnly로 설정합니다.
            />
            <button className="search-button">검색</button>
        </div>
    );
};

export default CustomDatePicker;
import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './CustomDatePicker.css';
import ko from 'date-fns/locale/ko'; // 한국어 로케일을 임포트합니다.

registerLocale('ko', ko); // datepicker에 로케일을 등록합니다.


const CustomDatePicker = () => {
    // 오늘 날짜를 구합니다.
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(new Date(today));
    const [searchResults, setSearchResults] = useState(""); // 검색 결과를 저장할 상태 변수


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
        const newDate = new Date(); // This creates a new date object for the current date
    
        setStartDate(newDate); // Sets startDate to today's date
        if (value === '1Day') {
            
            setEndDate(newDate);   // Sets endDate to today's date as well
        } else {
            // Calculate the new end date based on the selected period from the current startDate
            const newEndDate = new Date(startDate);
    
            if (value === '7Day') {
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
    
            setEndDate(newEndDate); // Update the endDate state with the new value
        }
    };

    const handleDateChangeRaw = (e) => {
        e.preventDefault();
      };

         // 검색 버튼 클릭 이벤트 핸들러
    const handleSearchClick = () => {
        // 날짜 포맷을 'yyyy/MM/dd' 형태로 지정
        const start = startDate.toLocaleDateString('ko-KR').replaceAll('. ', '/').replaceAll('.', '');
        const end = endDate.toLocaleDateString('ko-KR').replaceAll('. ', '/').replaceAll('.', '');

        // 결과를 상태 변수에 설정
        setSearchResults(`input1: ${start}, input2: ${end}`);
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
                locale="ko" // locale 속성을 'ko'로 설정합니다.
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy/MM/dd"
            />
            <span>-</span>
            <DatePicker
                locale="ko" // locale 속성을 'ko'로 설정합니다.
                selected={endDate}
                onChange={date => setEndDate(date)}
                onChangeRaw={handleDateChangeRaw}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy/MM/dd"
            />
            <button className="search-button" onClick={handleSearchClick} >검색</button>
              {/* 검색 결과를 보여주는 부분 */}
             <br></br>
            
             {searchResults && <div className="search-results">{searchResults}</div>}
        </div>
    );
};

export default CustomDatePicker;
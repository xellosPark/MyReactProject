import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './DatePickerBack.css';
import ko from 'date-fns/locale/ko'; // 한국어 로케일을 임포트합니다.

registerLocale('ko', ko); // datepicker에 로케일을 등록합니다.


const DatePickerBack = () => {
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
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (e) => {
        console.log("여기당",e.target.value);
        const value = e.target.value;
        setSelectedOption(value); // Set the selected option in the state
        const today = new Date();
        
        if (value === '1Day') {
            setStartDate(today);
            setEndDate(today);
        } else {
            let newStartDate = new Date(today);
    
            switch (value) {
                case '7Day':
                    newStartDate.setDate(today.getDate() - 7);
                    break;
                case '1months':
                    newStartDate.setMonth(today.getMonth() - 1);
                    break;
                case '3months':
                    newStartDate.setMonth(today.getMonth() - 3);
                    break;
                case '6months':
                    newStartDate.setMonth(today.getMonth() - 6);
                    break;
                case '1year':
                    newStartDate.setFullYear(today.getFullYear() - 1);
                    break;
                default:
                    newStartDate = today;
            }
    
            setStartDate(newStartDate);
            setEndDate(today); // Keep the end date as today for all options
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
                onChange={handleSelectChange}
                value={selectedOption}
            >
                <option value="1Day"    disabled={selectedOption === "1Day"}>현재</option>
                <option value="7Day"    disabled={selectedOption === "7Day"}>7일</option>
                <option value="1months" disabled={selectedOption === "1months"}>1개월</option>
                <option value="3months" disabled={selectedOption === "3months"}>3개월</option>
                <option value="6months" disabled={selectedOption === "6months"}>6개월</option>
                <option value="1year"   disabled={selectedOption === "1year"}>1년</option>
            </select>

            {/* End Date Picker now comes first */}
            <DatePicker
                locale="ko"
                selected={endDate}
                onChange={date => setEndDate(date)}
                onChangeRaw={handleDateChangeRaw}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy/MM/dd"
            />
            <span>-</span>
            {/* Start Date Picker now comes second */}
            <DatePicker
                locale="ko"
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date()} // this will disable future dates
                dateFormat="yyyy/MM/dd"
            />

            <button className="search-button" onClick={handleSearchClick}>검색</button>

            {/* 검색 결과를 보여주는 부분 */}
            <br></br>
            {searchResults && <div className="search-results">{searchResults}</div>}
        </div>
    );
};

export default DatePickerBack;
import { useState, useEffect } from "react";
import './App.css';

function App() {

  const [weeks, setWeeks] = useState(Array.from({ length: 52 }, (_, i) => i + 1)); // 1~52주 배열 생성
  const [currentWeek, setCurrentWeek] = useState(null); // 현재 주차 저장
  const [previousWeek, setPreviousWeek] = useState(null); // 이전 주차 저장
  const [recentWeeks, setRecentWeeks] = useState([]); // 최근 6주 저장

  // 현재 날짜 기준으로 주차를 계산하는 함수
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

    // 첫 번째 월요일 찾기
    const firstMonday = new Date(firstDayOfYear);
    firstMonday.setDate(firstDayOfYear.getDate() + ((1 - firstDayOfYear.getDay() + 7) % 7));

    // 현재 날짜와 첫 번째 월요일 사이의 차이를 밀리초 단위로 계산
    const diff = date - firstMonday;

    // 1주일(7일)을 기준으로 몇 번째 주인지 계산
    return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
  };

  // 특정 주차가 몇 월 몇 주인지 계산하는 함수
  const getMonthWeekLabel = (weekNumber) => {
    // 1월 1일부터 주차를 나누어 월을 계산
    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
    const targetDate = new Date(firstDayOfYear);
    targetDate.setDate(firstDayOfYear.getDate() + (weekNumber - 1) * 7);

    const month = targetDate.getMonth() + 1; // 월 (0부터 시작이므로 +1)
    const weekOfMonth = Math.ceil(targetDate.getDate() / 7); // 해당 월의 몇 번째 주인지 계산

    return `${month}월 ${weekOfMonth}주차`;
  };

  useEffect(() => {
    const weekNow = getWeekNumber(new Date()); // 현재 주차 계산
    setCurrentWeek(weekNow);
    setPreviousWeek(weekNow > 1 ? weekNow - 1 : null); // 이전 주차 설정 (1주차일 경우 제외)

    // 현재 주차 기준으로 최근 6주 주차를 배열에서 가져오기
    const last6Weeks = weeks
      .filter((week) => week <= weekNow) // 현재 주차 이하만 필터링
      .slice(-6); // 최근 6주만 선택

    // 드론박스를 마지막에 추가한 리스트 생성
    setRecentWeeks([...last6Weeks, "드론박스"]);
  }, [weeks]);

  return (
    <div>
      <h2>오늘은 {currentWeek}째 주입니다! ({getMonthWeekLabel(currentWeek)})</h2>
      {previousWeek && `지난주는 ${previousWeek}째 주였습니다! (${getMonthWeekLabel(previousWeek)})`}
      <ul>
        {recentWeeks.map((week, index) => (
          <li
            key={index}
            style={{
              fontWeight: week === currentWeek ? "bold" : "normal", // 현재 주차 강조 (볼드)
              color: week === currentWeek ? "red" : "black", // 현재 주차 빨간색 표시
            }}
          >
            {typeof week === "number"
              ? `${week}주 (${getMonthWeekLabel(week)})`
              : week} {/* 드론박스는 그대로 출력 */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [weeks] = useState(Array.from({ length: 52 }, (_, i) => i + 1)); // 1~52주 배열 생성
  const [currentWeek, setCurrentWeek] = useState(null); // 현재 주차 저장
  const [previousWeek, setPreviousWeek] = useState(null); // 이전 주차 저장
  const [nextWeek, setNextWeek] = useState(null); // 다음 주차 저장
  const [recentWeeks, setRecentWeeks] = useState([]); // 최근 6주 저장
  const [selectedWeek, setSelectedWeek] = useState(null); // 선택한 주차 저장
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // 현재 연도 저장

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
    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
    const targetDate = new Date(firstDayOfYear);
    targetDate.setDate(firstDayOfYear.getDate() + (weekNumber - 1) * 7);

    const month = targetDate.getMonth() + 1; // 월 (0부터 시작이므로 +1)
    const weekOfMonth = Math.ceil(targetDate.getDate() / 7); // 해당 월의 몇 번째 주인지 계산

    return `${month}월 ${weekOfMonth}주차`;
  };

  useEffect(() => {
    const dateNow = new Date();
    const weekNow = getWeekNumber(dateNow);
    const yearNow = dateNow.getFullYear();

    if (yearNow !== currentYear) {
      // 연도가 변경되면 48~52주차 + 새로운 1주차 유지
      setCurrentYear(yearNow);
      setRecentWeeks([48, 49, 50, 51, 52, 1]);
    } else {
      // 기존 로직: 현재 주차 기준 최근 6주 유지
      const last6Weeks = [];
      for (let i = 5; i >= 0; i--) {
        let weekNum = weekNow - i;
        if (weekNum <= 0) weekNum += 52; // 1주차 이전이면 52주차로 변환 (이전 연도 처리)
        last6Weeks.push(weekNum);
      }
      setRecentWeeks(last6Weeks);
    }

    setCurrentWeek(weekNow);
    setSelectedWeek(weekNow);
  }, []);

  // 🔹 `selectedWeek`가 변경될 때 `previousWeek`, `nextWeek` 업데이트
  useEffect(() => {
    if (selectedWeek !== null) {
      setPreviousWeek(selectedWeek > 1 ? selectedWeek - 1 : 52); // 1주차일 경우 52주차로 설정
      setNextWeek(selectedWeek < 52 ? selectedWeek + 1 : 1); // 52주차일 경우 1주차로 설정
    }
  }, [selectedWeek]);

  return (
    <div>
      <h2>
        선택된 주: {selectedWeek}째 주입니다! ({selectedWeek && getMonthWeekLabel(selectedWeek)})
      </h2>
      {previousWeek && (
        <p>지난주는 {previousWeek}째 주였습니다! ({getMonthWeekLabel(previousWeek)})</p>
      )}
      {nextWeek && (
        <p>다음주는 {nextWeek}째 주입니다! ({getMonthWeekLabel(nextWeek)})</p>
      )}

      <select
        value={selectedWeek || ""}
        onChange={(e) => setSelectedWeek(Number(e.target.value))}
        style={{ fontSize: "16px", padding: "5px" }}
      >
        {recentWeeks.map((week, index) => (
          <option key={index} value={week}>
            {`${week}주 (${getMonthWeekLabel(week)})`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
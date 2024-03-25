import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 locale import
import './FullCalendarComponent.css';

export default function FullCalendarComponent({ selectedCategory }) {

  const allEvents = [
    { title: '이벤트 1', date: '2024-03-22', category: 'comp', backgroundColor: '#ff9f89', borderColor: '#ff9f89', textColor: '#333' },
    { title: '이벤트 2', date: '2024-03-22', category: 'comp', backgroundColor: '#ffc0cb', borderColor: '#ffc0cb', textColor: '#333' },
    { title: '이벤트 3', date: '2024-03-22', category: 'issue', backgroundColor: '#ffdfba', borderColor: '#ffdfba', textColor: '#333' },
    { title: '이벤트 4', date: '2024-03-22', category: 'issue', backgroundColor: '#ffffba', borderColor: '#ffffba', textColor: '#333' },
    { title: '이벤트 5', date: '2024-03-22', category: 'comp', backgroundColor: '#baffc9', borderColor: '#baffc9', textColor: '#333' },
    { title: '이벤트 6', date: '2024-03-22', category: 'issue', backgroundColor: '#bae1ff', borderColor: '#bae1ff', textColor: '#333' },
    { title: '이벤트 7', date: '2024-03-22', category: 'issue', backgroundColor: '#bae1ff', borderColor: '#bae1ff', textColor: '#333' },
    { title: '이벤트 8', date: '2024-03-22', category: 'issue', backgroundColor: '#bae1ff', borderColor: '#bae1ff', textColor: '#333' },
    { title: '이벤트 9', date: '2024-03-17', category: 'issue', backgroundColor: '#bae1ff', borderColor: '#bae1ff', textColor: '#333' },
    { title: '이벤트 10', date: '2024-03-17', category: 'issue', backgroundColor: '#bae1ff', borderColor: '#bae1ff', textColor: '#333' },
    { title: '이벤트 11', date: '2024-03-17', category: 'issue', backgroundColor: '#bae1ff', borderColor: '#bae1ff', textColor: '#333' },
  ];

  const [filteredEvents, setFilteredEvents] = useState(allEvents);

   // 날짜 셀의 내용을 조정하는 함수
   const handleDayCellContent = (args) => {
    // 'args.dayNumberText'에는 날짜 숫자와 '일' 문자가 포함되어 있습니다.
    // 이를 사용자 정의 포맷으로 바꿔줍니다.
    return { html: args.dayNumberText.replace('일', '') };
  };

  const handleEventClick = (clickInfo) => {
    // clickInfo is an object containing event information and more
    console.log("Event clicked: ", clickInfo.event.title);
    // Perform actions like opening an event detail view or an edit form
  };

  useEffect(() => {
    if (selectedCategory && selectedCategory.has('전 체')) {
      // If '전 체' is selected, show all events
      setFilteredEvents(allEvents);
    } else if (selectedCategory && selectedCategory.has('이 슈')) {
      // If '이 슈' is selected, filter and show only events with the category 'issue'
      const issueEvents = allEvents.filter(event => event.category === 'issue');
      setFilteredEvents(issueEvents);
    } else {
      // You can add more conditions for other categories as needed
      setFilteredEvents([]);
    }
  }, [selectedCategory]);


  return (
    
    <div className="calendar-parent" >
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev',
        center: 'title',
        right: 'next,today'
      }}
      locale={koLocale}
      events={filteredEvents}
      dayCellContent={handleDayCellContent}
      eventClick={handleEventClick}
      height="97%"
    />
  </div>
 
  );
}
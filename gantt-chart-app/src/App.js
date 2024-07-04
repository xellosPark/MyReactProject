import React, { useEffect, useRef } from 'react';
import GSTC from 'gantt-schedule-timeline-calendar';
import 'gantt-schedule-timeline-calendar/dist/style.css';

const App = () => {
  const gstcRef = useRef(null);

  useEffect(() => {
    const today = new Date();

    const state = GSTC.api.stateFromConfig({
      licenseKey: 'YOUR_LICENSE_KEY_HERE', // Replace with your license key if you have one
      columns: {
        data: {
          label: {
            id: 'label',
            data: 'label',
            expander: false,
          },
        },
      },
      list: {
        rows: [
          {
            id: 'gstcid-1',
            label: '작업 1',
          },
          {
            id: 'gstcid-2',
            label: '작업 2',
          },
          {
            id: 'gstcid-3',
            label: '작업 3',
          },
        ],
      },
      chart: {
        items: [
          {
            id: '1',
            label: '작업 1',
            rowId: 'gstcid-1',
            time: {
              start: GSTC.api.date(today).startOf('day').valueOf(),
              end: GSTC.api.date(today).add(3, 'day').endOf('day').valueOf(),
            },
          },
          {
            id: '2',
            label: '작업 2',
            rowId: 'gstcid-2',
            time: {
              start: GSTC.api.date(today).add(3, 'day').startOf('day').valueOf(),
              end: GSTC.api.date(today).add(5, 'day').endOf('day').valueOf(),
            },
          },
          {
            id: '3',
            label: '작업 3',
            rowId: 'gstcid-3',
            time: {
              start: GSTC.api.date(today).add(6, 'day').startOf('day').valueOf(),
              end: GSTC.api.date(today).add(7, 'day').endOf('day').valueOf(),
            },
          },
        ],
      },
      locale: {
        name: 'ko',
        weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
        weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      },
      date: {
        start: GSTC.api.date(today).startOf('month').valueOf(),
        end: GSTC.api.date(today).endOf('month').valueOf(),
      },
    });

    const gstc = GSTC({
      element: gstcRef.current,
      state,
    });

    return () => gstc.destroy();
  }, []);

  return (
    <div>
      <h1>간단한 React 간트 차트</h1>
      <div ref={gstcRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default App;

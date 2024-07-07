import React, { useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';
import './ProjectGanttChartView.css'; // Import the CSS file
import ganttLocale from './ganttLocale'; // 새로운 locale 설정 파일을 import

const ProjectGanttChartView = ({ data, onDataUpdate }) => {
    const ganttContainer = useRef(null);

    useEffect(() => {
        // locale 설정 적용
        gantt.locale = ganttLocale;

        // 스케일 구성 설정
        gantt.config.scales = [
            { unit: "month", step: 1, format: "%F, %Y" },
            { unit: "day", step: 1, format: "%d", css: function(date) { 
                if (date.getDay() === 0 || date.getDay() === 6) {
                    return "week-end"; 
                } else {
                    return "week-day";
                }
            }}
        ];

        gantt.config.inherit_scale_class = true;

        // 헤더 높이 설정
        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 18; // 최소 컬럼 너비

        // 링크 선 비활성화
        gantt.config.show_links = false;

        // 세로 간격 설정
        gantt.config.row_height = 25; // 행 높이 조절
        gantt.config.bar_height = 17; // 막대 높이 조절

        gantt.templates.task_class = function (start, end, task) {
            return "gantt-bar";
        };

        gantt.init(ganttContainer.current);

        gantt.parse(data); // props로 받은 데이터 사용

        // 이벤트 핸들러 등록
        const handleTaskUpdate = () => {
            onDataUpdate({
                data: gantt.serialize().data,
                links: gantt.serialize().links
            });
        };

        gantt.attachEvent("onAfterTaskAdd", handleTaskUpdate);
        gantt.attachEvent("onAfterTaskUpdate", handleTaskUpdate);
        gantt.attachEvent("onAfterTaskDelete", handleTaskUpdate);

        // Cleanup on unmount
        return () => {
            gantt.clearAll();
        };
    }, [data, onDataUpdate]);

    return (
       <div className="gantt-chart">
            <div ref={ganttContainer} className="gantt-container"></div>
        </div>
    );
};

export default ProjectGanttChartView;

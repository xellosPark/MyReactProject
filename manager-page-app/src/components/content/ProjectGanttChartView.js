import React, { useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';
import './ProjectGanttChartView.css'; // Import the CSS file

const ProjectGanttChartView = () => {
    const ganttContainer = useRef(null);

    useEffect(() => {
        // 한국어 로케일 정의
        gantt.locale = {
            date: {
                month_full: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                month_short: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                day_full: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
                day_short: ["일", "월", "화", "수", "목", "금", "토"]
            },
            labels: {
                new_task: "새 작업",
                icon_save: "저장",
                icon_cancel: "취소",
                icon_details: "세부 사항",
                icon_edit: "편집",
                icon_delete: "삭제",
                confirm_closing: "", // 변경 사항이 손실됩니다. 계속하시겠습니까?
                confirm_deleting: "작업이 삭제됩니다. 계속하시겠습니까?",
                section_description: "설명",
                section_time: "기간",
                column_text: "작업명",
                column_start_date: "시작일",
                column_duration: "기간",
                column_add: "",
                link: "링크",
                confirm_link_deleting: "삭제됩니다.",
                link_start: " (시작)",
                link_end: " (끝)",
                type_task: "작업",
                type_project: "프로젝트",
                type_milestone: "마일스톤",
                minutes: "분",
                hours: "시간",
                days: "일",
                weeks: "주",
                months: "개월",
                years: "년",
                message_ok: "확인",
                message_cancel: "취소"
            }
        };

        // 스케일 구성 설정
        gantt.config.scales = [
            { unit: "year", step: 1, format: "%Y" },
            { unit: "month", step: 1, format: "%F" },
            { unit: "day", step: 1, format: gantt.date.date_to_str("%d") }
        ];

        // 헤더 높이 설정
        gantt.config.scale_height = 60;
        
        gantt.config.min_column_width = 20; // 최소 컬럼 너비

        // 링크 선 비활성화
        gantt.config.show_links = false;

        // 세로 간격 설정
        gantt.config.row_height = 25; // Adjust row height
        gantt.config.bar_height = 20; // Adjust bar height

        gantt.init(ganttContainer.current);

        gantt.parse({
            data: [
                { id: 1, text: "계획", start_date: "03-03-2024", duration: 5, progress: 1 },
                { id: 2, text: "분석", start_date: "10-03-2024", duration: 7, progress: 0.6 },
                { id: 3, text: "설계", start_date: "17-03-2024", duration: 5, progress: 0.5 },
                { id: 4, text: "개발", start_date: "22-03-2024", duration: 10, progress: 0.3 },
                { id: 5, text: "테스트", start_date: "05-04-2024", duration: 7, progress: 0.2 },
                { id: 6, text: "배포", start_date: "15-04-2024", duration: 3, progress: 0 }
            ],
            links: [
                { id: 1, source: 1, target: 2, type: "0" },
                { id: 2, source: 2, target: 3, type: "0" },
                { id: 3, source: 3, target: 4, type: "0" },
                { id: 4, source: 4, target: 5, type: "0" },
                { id: 5, source: 5, target: 6, type: "0" }
            ]
        });
    }, []);

    return (
        <div className="gantt-chart">
            <div ref={ganttContainer} className="gantt-container"></div>
        </div>
    );
};

export default ProjectGanttChartView;
import React, { useState } from 'react';
import GanttChartView from './ProjectGanttChartView';
import './ProjectGanttChartMain.css'; // 새로운 CSS 파일을 import
import * as XLSX from 'xlsx';

const ProjectGanttChartMain = () => {
    // 초기 프로젝트 데이터 설정
    const initialProjects = {
        project1: {
            name: "프로젝트 1",
            data: [
                { id: 1, text: "계획", start_date: "03-03-2024", duration: 5, parent:0, open: true, progress: 1},
                { id: 2, text: "문석 파악", start_date: "05-03-2024", duration: 5, parent:1, progress: 0.6},
                { id: 3, text: "분석", start_date: "10-03-2024", duration: 7, parent:0, progress: 0.6, },
                { id: 4, text: "설계", start_date: "17-03-2024", duration: 5,parent:0, progress: 0.5, },
                { id: 5, text: "개발", start_date: "22-03-2024", duration: 10,parent:0, progress: 0.3,},
                { id: 6, text: "테스트", start_date: "05-04-2024", duration: 7,parent:0, open: true, progress: 0.2, },
                { id: 7, text: "Test", start_date: "15-04-2024", duration: 3,parent:6, progress: 0,},
                { id: 8, text: "배포", start_date: "15-04-2024", duration: 3,parent:0,open: true, progress: 0,},
                { id: 9, text: "모니터링", start_date: "15-04-2024", duration: 3,parent:8, progress: 0,},
            ]
        },
        project2: {
            name: "프로젝트 2",
            data: [
                { id: 1, text: "계획", start_date: "03-03-2024", duration: 5, parent:0, open: true, progress: 1},
                { id: 2, text: "분석", start_date: "10-03-2024", duration: 7, parent:0, progress: 0.6, },
                { id: 3, text: "설계", start_date: "17-03-2024", duration: 5,parent:0, progress: 0.5, },
                { id: 4, text: "개발", start_date: "22-03-2024", duration: 10,parent:0, progress: 0.3,},
                { id: 5, text: "테스트", start_date: "05-04-2024", duration: 7,parent:0, open: true, progress: 0.2, },
                { id: 6, text: "배포", start_date: "15-04-2024", duration: 3,parent:0,open: true, progress: 0,},
            ]
        },
        project3: {
            name: "프로젝트 3",
            data: [
                { id: 1, text: "계획", start_date: "03-03-2024", duration: 5, parent:0, open: true, progress: 1},
                { id: 2, text: "분석", start_date: "10-03-2024", duration: 7, parent:0, open: true,progress: 0.6, },
                { id: 3, text: "설계", start_date: "17-03-2024", duration: 5,parent:0, open: true,progress: 0.5, },
                { id: 4, text: "개발", start_date: "22-03-2024", duration: 10,parent:0, open: true,progress: 0.3,},
                { id: 5, text: "테스트", start_date: "05-04-2024", duration: 7,parent:0, open: true, progress: 0.2, },
                { id: 6, text: "배포", start_date: "15-04-2024", duration: 3,parent:0,open: true, progress: 0,},
            ]
        },
    };

    const [projects, setProjects] = useState(initialProjects);
    const [selectedProject, setSelectedProject] = useState('project1');

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
    };

    const handleDataUpdate = (newData) => {
        setProjects({
            ...projects,
            [selectedProject]: {
                ...projects[selectedProject],
                data: newData.data,
            }
        });
    };

    // 종료 날짜 계산 함수
    const calculateEndDate = (startDate, duration) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + duration - 1);
        return date.toISOString().split('T')[0];
    };

    // 프로젝트 종료 날짜 계산 함수
    const calculateProjectEndDate = (projectData) => {
        return projectData.reduce((maxDate, task) => {
            const taskEndDate = new Date(task.start_date);
            taskEndDate.setDate(taskEndDate.getDate() + task.duration - 1);
            return taskEndDate > maxDate ? taskEndDate : maxDate;
        }, new Date('1970-01-01'));
    };

// 엑셀로 내보내기 함수
const exportToExcel = () => {
    const project = projects[selectedProject];
    const data = project.data.map(task => ({
        ID: task.id,
        Task: `${task.parent > 0 ? 'L ' : ''}${task.text}`, // indent 설정
        StartDate: task.start_date,
        EndDate: calculateEndDate(task.start_date, task.duration),
        Duration: task.duration,
        Progress: task.progress,
        Parent: task.parent
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, project.name);

    // 프로젝트 제목 추가
    XLSX.utils.sheet_add_aoa(worksheet, [['프로젝트'], [project.name]], { origin: 'A1' });

      // 프로젝트의 가장 이른 시작 날짜를 계산
      const earliestStartDate = new Date(Math.min(...project.data.map(task => new Date(task.start_date))));

      const endDate = calculateProjectEndDate(project.data);  // 프로젝트의 최대 종료 날짜 계산
      const dateRange = [];
      for (let d = new Date(earliestStartDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          dateRange.push(new Date(d));
      }

    const headerRow1 = ['Task'];
    const headerRow2 = [''];
    let currentMonth = '';
    let mergeRanges = [];
    let monthStartIndex = 1;

    dateRange.forEach((date, index) => {
        const month = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
        if (month !== currentMonth) {
            if (currentMonth !== '') {
                mergeRanges.push({
                    s: { r: 2, c: monthStartIndex },
                    e: { r: 2, c: headerRow1.length - 1 }
                });
                monthStartIndex = headerRow1.length;
            }
            headerRow1.push(month);
            currentMonth = month;
        } else {
            headerRow1.push('');
        }
        headerRow2.push(date.getDate());
    });

    // 마지막 월 병합 범위 추가
    if (currentMonth !== '') {
        mergeRanges.push({
            s: { r: 2, c: monthStartIndex },
            e: { r: 2, c: headerRow1.length - 1 }
        });
    }

    const ganttData = project.data.map(task => {
        const taskStartDate = new Date(task.start_date);
        const taskEndDate = new Date(task.start_date);
        taskEndDate.setDate(taskEndDate.getDate() + task.duration);
        const row = new Array(dateRange.length).fill('');
        dateRange.forEach((date, index) => {
            if (date >= taskStartDate && date <= taskEndDate) {
                row[index] = '■';
            }
        });
        return [task.parent > 0 ? ` L ${task.text}` : task.text, ...row]; // Use task.text for the Task column with indent
    });

    XLSX.utils.sheet_add_aoa(worksheet, [headerRow1], { origin: 'A3' });
    XLSX.utils.sheet_add_aoa(worksheet, [headerRow2], { origin: 'A4' });
    XLSX.utils.sheet_add_aoa(worksheet, ganttData, { origin: 'A5' });

    // Merge the cells for the month and align center
    worksheet['!merges'] = mergeRanges;
    mergeRanges.forEach(merge => {
        const startCell = XLSX.utils.encode_cell({ r: merge.s.r, c: merge.s.c });
        if (!worksheet[startCell].s) worksheet[startCell].s = {};
        worksheet[startCell].s.alignment = { horizontal: 'center', vertical: 'center' };
    });

    worksheet['!cols'] = [
        { wch: 15 }, // Task column
        ...dateRange.map(() => ({ wch: 3 })) // Date columns
    ];

    XLSX.writeFile(workbook, `${project.name}.xlsx`);
};

    return (
        <div className="main-container">
            <div className="project-selection">
                <label htmlFor="projectSelect">프로젝트 선택:</label>
                <select id="projectSelect" value={selectedProject} onChange={handleProjectChange}>
                    {Object.keys(projects).map(key => (
                        <option key={key} value={key}>{projects[key].name}</option>
                    ))}
                </select>
                <button onClick={exportToExcel} className="export-button">엑셀로 저장</button>
            </div>
            <GanttChartView data={projects[selectedProject]} onDataUpdate={handleDataUpdate} />
        </div>
    );
};

export default ProjectGanttChartMain;

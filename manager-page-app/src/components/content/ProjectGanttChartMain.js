import React, { useState } from 'react';
import GanttChartView from './ProjectGanttChartView';
import './ProjectGanttChartMain.css';
import XLSX from 'xlsx-js-style';

const ProjectGanttChartMain = () => {
  const initialProjects = {
    project1: {
      name: "프로젝트 1",
      data: [
        {
          id: 1,
          text: "계획",
          start_date: "03-07-2024",
          duration: 5,
          parent: 0,
          open: true,
          progress: 1,
        },
        {
          id: 2,
          text: "문석 파악",
          start_date: "05-07-2024",
          duration: 5,
          parent: 1,
          progress: 0.6,
        },
        {
          id: 3,
          text: "분석",
          start_date: "10-07-2024",
          duration: 7,
          parent: 0,
          progress: 0.6,
        },
        {
          id: 4,
          text: "설계",
          start_date: "17-07-2024",
          duration: 5,
          parent: 0,
          progress: 0.5,
        },
        {
          id: 5,
          text: "개발",
          start_date: "22-07-2024",
          duration: 10,
          parent: 0,
          progress: 0.3,
        },
        {
          id: 6,
          text: "테스트",
          start_date: "05-08-2024",
          duration: 7,
          parent: 0,
          open: true,
          progress: 0.2,
        },
        {
          id: 7,
          text: "Test",
          start_date: "15-08-2024",
          duration: 3,
          parent: 6,
          progress: 0,
        },
        {
          id: 8,
          text: "배포",
          start_date: "15-08-2024",
          duration: 3,
          parent: 0,
          open: true,
          progress: 0,
        },
        {
          id: 9,
          text: "모니터링",
          start_date: "15-08-2024",
          duration: 3,
          parent: 8,
          progress: 0,
        },
      ],
    },
    project2: {
      name: "프로젝트 2",
      data: [
        {
          id: 1,
          text: "계획",
          start_date: "03-07-2024",
          duration: 5,
          parent: 0,
          open: true,
          progress: 1,
        },
        {
          id: 2,
          text: "분석",
          start_date: "10-07-2024",
          duration: 7,
          parent: 0,
          progress: 0.6,
        },
        {
          id: 3,
          text: "설계",
          start_date: "17-07-2024",
          duration: 5,
          parent: 0,
          progress: 0.5,
        },
        {
          id: 4,
          text: "개발",
          start_date: "22-07-2024",
          duration: 10,
          parent: 0,
          progress: 0.3,
        },
        {
          id: 5,
          text: "테스트",
          start_date: "05-08-2024",
          duration: 7,
          parent: 0,
          open: true,
          progress: 0.2,
        },
        {
          id: 6,
          text: "배포",
          start_date: "15-08-2024",
          duration: 3,
          parent: 0,
          open: true,
          progress: 0,
        },
      ],
    },
    project3: {
      name: "프로젝트 3",
      data: [
        {
          id: 1,
          text: "계획",
          start_date: "03-07-2024",
          duration: 5,
          parent: 0,
          open: true,
          progress: 1,
        },
        {
          id: 2,
          text: "분석",
          start_date: "10-07-2024",
          duration: 7,
          parent: 0,
          open: true,
          progress: 0.6,
        },
        {
          id: 3,
          text: "설계",
          start_date: "17-07-2024",
          duration: 5,
          parent: 0,
          open: true,
          progress: 0.5,
        },
        {
          id: 4,
          text: "개발",
          start_date: "22-07-2024",
          duration: 10,
          parent: 0,
          open: true,
          progress: 0.3,
        },
        {
          id: 5,
          text: "테스트",
          start_date: "05-08-2024",
          duration: 7,
          parent: 0,
          open: true,
          progress: 0.2,
        },
        {
          id: 6,
          text: "배포",
          start_date: "15-08-2024",
          duration: 3,
          parent: 0,
          open: true,
          progress: 0,
        },
      ],
    },
  };

  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState("project1");

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleDataUpdate = (newData) => {
    setProjects({
      ...projects,
      [selectedProject]: {
        ...projects[selectedProject],
        data: newData.data,
      },
    });
  };

  const calculateEndDate = (startDate, duration) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + duration - 1);
    return date.toISOString().split("T")[0];
  };

  const calculateProjectEndDate = (projectData) => {
    return projectData.reduce((maxDate, task) => {
      const taskEndDate = new Date(task.start_date);
      taskEndDate.setDate(taskEndDate.getDate() + task.duration - 1);
      return taskEndDate > maxDate ? taskEndDate : maxDate;
    }, new Date("1970-01-01"));
  };

  const exportToExcel = () => {
    const project = projects[selectedProject];
    const data = project.data.map((task) => ({
      ID: task.id,
      Task: `${task.parent > 0 ? "" : ""}${task.text}`,
      StartDate: task.start_date,
      EndDate: calculateEndDate(task.start_date, task.duration),
      Duration: task.duration,
      Progress: task.progress,
      Parent: task.parent,
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, project.name);

    XLSX.utils.sheet_add_aoa(worksheet, [["프로젝트"], [project.name]], {
      origin: "A1",
    });

    const earliestStartDate = new Date(
      Math.min(...project.data.map((task) => new Date(task.start_date)))
    );

    const endDate = calculateProjectEndDate(project.data);
    const dateRange = [];
    for (
      let d = new Date(earliestStartDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      dateRange.push(new Date(d));
    }

    const headerRow1 = ["Task"];
    const headerRow2 = [""];
    let currentMonth = "";
    let mergeRanges = [];
    let monthStartIndex = 1;

    dateRange.forEach((date, index) => {
      const month = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
      if (month !== currentMonth) {
        if (currentMonth !== "") {
          mergeRanges.push({
            s: { r: 2, c: monthStartIndex },
            e: { r: 2, c: headerRow1.length - 1 },
          });
          monthStartIndex = headerRow1.length;
        }
        headerRow1.push(month);
        currentMonth = month;
      } else {
        headerRow1.push("");
      }
      headerRow2.push(date.getDate());
    });

    if (currentMonth !== "") {
      mergeRanges.push({
        s: { r: 2, c: monthStartIndex },
        e: { r: 2, c: headerRow1.length - 1 },
      });
    }

    const ganttData = project.data.map((task) => {
      const taskStartDate = new Date(task.start_date);
      const taskEndDate = new Date(task.start_date);
      taskEndDate.setDate(taskEndDate.getDate() + task.duration);
      const row = new Array(dateRange.length).fill("");
      dateRange.forEach((date, index) => {
        let fillColor = "#7FBF7F"; // Future date (default)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison

        if (date < today) {
          fillColor = "#299CB4"; // Past date
        } else if (date.getTime() === today.getTime()) {
          fillColor = "#CAB5F8"; // Present date
        }

        if (date >= taskStartDate && date <= taskEndDate) {
          row[index] = {
            v: "",
            s: {
              fill: {
                fgColor: { rgb: fillColor.replace("#", "") }, // set background color based on date
              },
            },
          };
        }
      });

      // 작업 계층에 따른 접두사 결정
      let prefix = "";
      const taskIdStr = task.id.toString(); // task.id를 문자열로 변환
      const underscoreCount = (taskIdStr.match(/_/g) || []).length; // 문자열에서 _의 개수 세기
      console.log("underscoreCount", underscoreCount);
      if (underscoreCount > 0) {
        prefix = " —+—".repeat(underscoreCount); // underscoreCount 만큼 '*'을 접두사로 설정
      }

      const taskIdWithCount = prefix;

      //console.log(`Task ID: ${task.id},p:${task.parent} 갯수: ${taskIdWithCount} Data: ${task.text}`); // 각 작업의 ID와 데이터를 로그로 출력
      // task.parent 값이 문자열인 경우 처음 숫자만 확인
      let parentNumber = parseInt(task.parent.toString().split("_")[0], 10);
      if (isNaN(parentNumber)) {
        parentNumber = task.parent; // 숫자가 아닌 경우 원래 값 사용
      }

      return [
        parentNumber > 0 ? `${taskIdWithCount} ${task.text}` : task.text,
        ...row,
      ];
    });

    XLSX.utils.sheet_add_aoa(worksheet, [headerRow1], { origin: "A3" });
    XLSX.utils.sheet_add_aoa(worksheet, [headerRow2], { origin: "A4" });
    XLSX.utils.sheet_add_aoa(worksheet, ganttData, { origin: "A5" });

    worksheet["!merges"] = mergeRanges;
    mergeRanges.forEach((merge) => {
      const startCell = XLSX.utils.encode_cell({ r: merge.s.r, c: merge.s.c });
      if (!worksheet[startCell].s) worksheet[startCell].s = {};
      worksheet[startCell].s.alignment = {
        horizontal: "center",
        vertical: "center",
      };
    });

    worksheet["!cols"] = [
      { wch: 15, alignment: { vertical: "center" } },
      ...dateRange.map(() => ({ wch: 3 })),
    ];

    XLSX.writeFile(workbook, `${project.name}.xlsx`);
  };

  // JSON 파일로 저장하는 함수
  const saveAsJson = (filename, data) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 현재 프로젝트 데이터를 JSON 파일로 저장하는 함수
  const dayProJectSave = () => {
    const projectData = projects[selectedProject].data;
    saveAsJson(`${projects[selectedProject].name}.json`, projectData);
  };

  return (
    <div className="main-container">
      <div className="project-selection">
        <label htmlFor="projectSelect">프로젝트 선택:</label>
        <select
          id="projectSelect"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          {Object.keys(projects).map((key) => (
            <option key={key} value={key}>
              {projects[key].name}
            </option>
          ))}
        </select>
        <button onClick={exportToExcel} className="export-button"> 엑셀로 저장 </button>
        <button onClick={dayProJectSave} className="export-button"> 저장 </button>
        
      </div>
      <GanttChartView data={projects[selectedProject]} onDataUpdate={handleDataUpdate}
      />
    </div>
  );
};

export default ProjectGanttChartMain;

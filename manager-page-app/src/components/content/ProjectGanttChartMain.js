import React, { useState } from 'react';
import GanttChartView from './ProjectGanttChartView';
import './ProjectGanttChartMain.css'; // 새로운 CSS 파일을 import

const ProjectGanttChartMain = () => {
    const initialProjects = {
        project1: {
            name: "프로젝트 1",
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
        },
        project2: {
            name: "프로젝트 2",
            data: [
                { id: 1, text: "기획", start_date: "01-01-2024", duration: 4, progress: 0.8 },
                { id: 2, text: "분석", start_date: "05-01-2024", duration: 6, progress: 0.4 },
                { id: 3, text: "설계", start_date: "12-01-2024", duration: 7, progress: 0.2 },
                { id: 4, text: "개발", start_date: "20-01-2024", duration: 8, progress: 0.1 },
                { id: 5, text: "테스트", start_date: "28-01-2024", duration: 5, progress: 0.05 },
                { id: 6, text: "배포", start_date: "03-02-2024", duration: 2, progress: 0 }
            ],
            links: [
                { id: 1, source: 1, target: 2, type: "0" },
                { id: 2, source: 2, target: 3, type: "0" },
                { id: 3, source: 3, target: 4, type: "0" },
                { id: 4, source: 4, target: 5, type: "0" },
                { id: 5, source: 5, target: 6, type: "0" }
            ]
        },
        project3: {
            name: "프로젝트 3",
            data: [
                { id: 1, text: "계획", start_date: "15-05-2024", duration: 3, progress: 1 },
                { id: 2, text: "분석", start_date: "18-05-2024", duration: 4, progress: 0.7 },
                { id: 3, text: "설계", start_date: "23-05-2024", duration: 6, progress: 0.4 },
                { id: 4, text: "개발", start_date: "30-05-2024", duration: 9, progress: 0.2 },
                { id: 5, text: "테스트", start_date: "09-06-2024", duration: 6, progress: 0.1 },
                { id: 6, text: "배포", start_date: "17-06-2024", duration: 3, progress: 0 }
            ],
            links: [
                { id: 1, source: 1, target: 2, type: "0" },
                { id: 2, source: 2, target: 3, type: "0" },
                { id: 3, source: 3, target: 4, type: "0" },
                { id: 4, source: 4, target: 5, type: "0" },
                { id: 5, source: 5, target: 6, type: "0" }
            ]
        }
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
                links: newData.links
            }
        });
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
            </div>
            <h3>프로젝트 명 : {projects[selectedProject].name}</h3>
            <GanttChartView data={projects[selectedProject]} onDataUpdate={handleDataUpdate} />
        </div>
    );
};

export default ProjectGanttChartMain;

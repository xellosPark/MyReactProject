import React from 'react';
import { Gantt, Task } from 'react-virtual-gantt';
import './App.css';

const tasks = [
  {
    id: '1',
    name: '작업 1',
    start: new Date().getTime(),
    end: new Date().setDate(new Date().getDate() + 3),
    progress: 25,
  },
  {
    id: '2',
    name: '작업 2',
    start: new Date().setDate(new Date().getDate() + 3),
    end: new Date().setDate(new Date().getDate() + 5),
    progress: 50,
  },
  {
    id: '3',
    name: '작업 3',
    start: new Date().setDate(new Date().getDate() + 6),
    end: new Date().setDate(new Date().getDate() + 7),
    progress: 75,
  },
];

const App = () => {
  return (
    <div>
      <h1>간단한 React 간트 차트</h1>
      <div className="gantt-container">
        <Gantt
          tasks={tasks}
          locale="ko"
          columnWidth={60}
          rowHeight={40}
          timeStep={60 * 60 * 1000} // 1 hour
          renderTask={(task) => (
            <div className="gantt-task" style={{ width: task.width }}>
              <div className="gantt-task-progress" style={{ width: `${task.progress}%` }}>
                {task.name}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default App;
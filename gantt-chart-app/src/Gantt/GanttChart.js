// GanttChart.js
import React from 'react';
import './GanttChart.css';

const getMonthDiff = (startDate, endDate) => {
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();
  return months <= 0 ? 0 : months;
};

const getPosition = (startDate, monthStart) => {
  let months = (startDate.getFullYear() - monthStart.getFullYear()) * 12;
  months += startDate.getMonth();
  months -= monthStart.getMonth();
  return months < 0 ? 0 : months;
};

const GanttChart = ({ tasks, monthStart }) => {
  // Ensure monthStart is the first day of the month
  monthStart = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1);

  return (
    <div className="gantt-chart">
      <div className="gantt-header">
        <div className="gantt-column task-name">Tasks</div>
        <div className="gantt-column task-duration">Duration (hours)</div>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
          <div key={month} className="gantt-column">{month}</div>
        ))}
      </div>
      {tasks.map(task => {
        const monthDiff = getMonthDiff(task.startDate, task.endDate) + 1; // +1 to include the end month
        const position = getPosition(task.startDate, monthStart);

        return (
          <div key={task.id} className="gantt-row">
            <div className="gantt-cell task-name">{task.name}</div>
            <div className="gantt-cell task-duration">{task.duration}</div>
            <div className="gantt-bars">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="gantt-bar-container">
                  {index >= position && index < position + monthDiff && (
                    <div
                      className="gantt-bar"
                      style={{
                        width: `${100 / monthDiff}%`,
                        marginLeft: `${(index - position) * (100 / monthDiff)}%`
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GanttChart;
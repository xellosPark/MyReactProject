import './App.css';
import GanttChart from './Gantt/GanttChart';

function App() {

  const tasks = [
    {
      id: 1,
      name: 'PRD & User Stories',
      duration: '1416',
      startDate: new Date(2019, 0, 1), // Months are 0-indexed in JavaScript (0 = January)
      endDate: new Date(2019, 1, 28),
    },
    {
      id: 2,
      name: 'Persona & Journey',
      duration: '149',
      startDate: new Date(2019, 1, 1),
      endDate: new Date(2019, 2, 31),
    },
    {
      id: 3,
      name: 'Architecture',
      duration: '640',
      startDate: new Date(2019, 2, 1),
      endDate: new Date(2019, 4, 30),
    },
    // Add more tasks as needed...
  ];

  const monthStart = new Date(2019, 0, 1); // Start of the year for the Gantt chart


  return (
    <>
       <GanttChart tasks={tasks} monthStart={monthStart} />
    </>
  );
}

export default App;

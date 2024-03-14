import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 'task-1', text: 'Learn React', status: 'issue' },
    { id: 'task-2', text: 'Read a book', status: 'issue' },
    { id: 'task-3', text: 'Write an essay', status: 'complete' },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow for dropping.
  };

  const handleDrop = (e, status) => {
    e.preventDefault();

    // Determine position where item is dropped.
    const updatedTasks = [...tasks];
    const draggedIndex = tasks.findIndex(task => task.id === draggedItem.id);

    // Remove item from original position.
    updatedTasks.splice(draggedIndex, 1);

    // Find drop target index.
    const dropTarget = e.target.closest('.task-item');
    const dropTargetId = dropTarget ? dropTarget.getAttribute('data-id') : null;
    const dropIndex = dropTargetId ? tasks.findIndex(task => task.id === dropTargetId) : tasks.length;

    // Adjust for items dropped in the same list towards the end.
    const finalIndex = dropIndex > draggedIndex ? dropIndex - 1 : dropIndex;

    // Insert item in new position.
    updatedTasks.splice(finalIndex, 0, { ...draggedItem, status: status });

    setTasks(updatedTasks);
    setDraggedItem(null);
  };

  const addNewTask = () => {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      text: newTaskText,
      status: 'issue',
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setNewTaskText('');
  };

  return (
    <div className="App">
      <div className="task-input-area">
        <input
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Enter new task"
          className="new-task-input"
        />
        <button onClick={addNewTask} className="add-task-btn">Add Task</button>
      </div>
      {['issue', 'complete'].map(status => (
        <div
          key={status}
          className={`task-column ${status}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
          {tasks.filter(task => task.status === status).map((task, index) => (
            <div
              key={task.id}
              data-id={task.id}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, task)}
              className="task-item"
            >
              {task.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
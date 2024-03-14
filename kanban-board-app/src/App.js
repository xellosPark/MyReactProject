import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 'task-1', text: 'Learn React', status: 'issue' },
    { id: 'task-2', text: 'Read a book', status: 'issue' },
    { id: 'task-3', text: 'Write an essay', status: 'complete' },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const onDragStart = (event, taskId) => {
    event.dataTransfer.setData('taskId', taskId);
  };

  const onDrop = (event, newStatus) => {
    const taskId = event.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.status = newStatus;
      }
      return task;
    });
    setTasks(updatedTasks);
    setSelectedTaskId(null); // Clear selected task upon successful drop to avoid stale selection
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const addNewTask = () => {
    if (!newTaskText.trim()) return; // Avoid adding empty tasks
    const newTask = {
      id: `task-${Date.now()}`, // Generate a unique ID based on the current timestamp
      text: newTaskText,
      status: 'issue',
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setNewTaskText('');
    setSelectedTaskId(null); // Clear selected task upon adding a new task to avoid confusion
  };

  const deleteSelectedTask = () => {
    setTasks(tasks.filter(task => task.id !== selectedTaskId));
    setSelectedTaskId(null); // Clear selection upon deletion
  };

  const selectTask = (taskId) => {
    // Toggle selection state to allow deselecting a task
    if (taskId === selectedTaskId) {
      setSelectedTaskId(null);
    } else {
      setSelectedTaskId(taskId);
    }
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
          <button onClick={deleteSelectedTask} disabled={!selectedTaskId} className="delete-task-btn">Delete Selected Task</button>
        </div>
        <div 
          onDrop={e => onDrop(e, 'issue')}
          onDragOver={onDragOver}
          className="task-column issues"
        >
          <h3>Issues</h3>
          {tasks
            .filter(task => task.status === 'issue')
            .map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={e => onDragStart(e, task.id)}
                onClick={() => selectTask(task.id)}
                className={`task-item ${task.id === selectedTaskId ? 'selected' : ''}`}
              >
                {task.text}
              </div>
            ))}
        </div>
        <div 
          onDrop={e => onDrop(e, 'complete')}
          onDragOver={onDragOver}
          className="task-column completed"
        >
          <h3>Completed</h3>
          {tasks
            .filter(task => task.status === 'complete')
            .map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={e => onDragStart(e, task.id)}
                onClick={() => selectTask(task.id)}
                className="task-item"
              >
                {task.text}
              </div>
            ))}
        </div>
      </div>
  );
}

export default App;
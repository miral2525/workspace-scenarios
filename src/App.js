

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { name: newTask, completed: false };
    setTasks(prevTasks => [...prevTasks, newTaskObj]);
    setNewTask('');
  };


  const handleToggleTask = useCallback((index) => {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);


  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'Completed':
        return tasks.filter(task => task.completed);
      case 'Active':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="App">
      <h1 className='welcome-message'>Welcome to our page :)</h1>
      <h1>Task Manager</h1>

      {/* Add Task */}
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(index)}
            />
            {task.name}
          </li>
        ))}
      </ul>

      {/* Filter Options */}
      <div className="filters">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Active')}>Active</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
      </div>
    </div>
  );
}

export default App;

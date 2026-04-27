import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoCard from './components/TodoCard';
import FilterTabs from './components/FilterTabs';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks'));
    if (saved) setTasks(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  return (
    <div className="container">
      <h1>✨ My Tasks</h1>

      <TodoInput onAdd={addTask} />
      <FilterTabs filter={filter} setFilter={setFilter} />

      <div>
        {filtered.map(task => (
          <TodoCard
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>

      <p>{tasks.filter(t => !t.done).length} tasks left</p>
    </div>
  );
}

export default App;
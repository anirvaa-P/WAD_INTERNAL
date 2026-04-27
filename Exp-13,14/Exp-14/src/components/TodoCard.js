import React from 'react';

function TodoCard({ task, onToggle, onDelete }) {
  return (
    <div className={`card ${task.done ? 'done' : ''}`}>

      <span
        onClick={() => onToggle(task.id)}
        style={{ cursor: 'pointer' }}
      >
        {task.done ? "✅" : "⬜"} {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>🗑</button>

    </div>
  );
}

export default TodoCard;
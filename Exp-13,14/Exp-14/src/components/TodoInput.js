import React, { useState } from 'react';

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const submit = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <div className="input-box">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      />
      <button onClick={submit}>+</button>
    </div>
  );
}

export default TodoInput;
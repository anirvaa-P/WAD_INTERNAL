import React from 'react';

function FilterTabs({ filter, setFilter }) {
  return (
    <div className="tabs">
      {['all', 'active', 'done'].map(f => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
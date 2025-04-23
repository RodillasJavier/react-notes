import React, { useState } from 'react';

function TitleBar(props) {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (props.handleAdd && title.trim()) {
      const newNote = {
        title,
        text: '',
        x: '20',
        y: '20',
        zIndex: '0',
      };

      const newID = Date.now().toString();

      props.handleAdd(newID, newNote);

      setTitle('');
    }
  };

  return (
    <div className="masthead">
      <input
        type="text"
        placeholder="Enter title for a new note here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAdd();
          }
        }}
      />
      <i
        className="fa-solid fa-plus icon"
        onClick={handleAdd}
        role="button"
        tabIndex={0}
        aria-label="Add Note Button"
      />
    </div>
  );
}

export default TitleBar;

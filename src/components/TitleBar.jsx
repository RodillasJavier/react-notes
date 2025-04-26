import React, { useState } from 'react';

function TitleBar(props) {
  const [title, setTitle] = useState('');

  //  Function to add a new note to the application
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
      <form className="noteinput"
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <input
          type="text"
          placeholder="Enter title for a new note here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <i
        className="fa-solid fa-plus icon"
        onClick={handleAdd}
        role="button"
        tabIndex={0}
        aria-label="add"
      />
    </div>
  );
}

export default TitleBar;

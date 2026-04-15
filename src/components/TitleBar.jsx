import React, { useState } from 'react';

/* Props: addNote */
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
          placeholder="New note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <i
          className="fa-solid fa-plus icon"
          onClick={handleAdd}
          role="button"
          tabIndex={0}
          aria-label="add"
        />

      </form>

      <div id="page-header">
        <h1 id="page-title">React Notes V.2.4</h1>
        <h2 id="page-subtitle">By Javier A. Rodillas</h2>
      </div>

    </div>
  );
}

export default TitleBar;

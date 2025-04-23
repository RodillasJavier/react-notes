import React, { useRef } from 'react';
import Draggable from 'react-draggable';

function Note(props) {
  const nodeRef = useRef(null);

  // Handle 'dragging' around the screen
  const handleDrag = (e, data) => {
    if (props.handleDrag) {
      props.handleDrag(props.id, data.x, data.y);
    }
  };

  // Handle 'deleting' a note
  const handleDelete = () => {
    if (props.handleDelete) {
      props.handleDelete(props.id);
    }
  };

  return (
    // Each note is 'draggable'
    <Draggable
      nodeRef={nodeRef}
      handle=".drag-handle"
      defaultPosition={{ x: 20, y: 20 }} // if no position given
      position={{ x: parseInt(props.note.x, 10), y: parseInt(props.note.y, 10) }}
      onStart={handleDrag}
      onDrag={handleDrag}
    >

      {/* Our note element */}
      <div ref={nodeRef} id={props.id} className="note-item" style={{ zIndex: props.note.zIndex }}>

        {/* Toolbar to contain our controls for the notes */}
        <div className="toolbar">
          <i className="fa-solid fa-grip icon drag-handle" />
          <i
            onClick={handleDelete}
            className="fa-solid fa-trash icon"
            role="button"
            tabIndex="0"
            aria-label="delete note"
          />
        </div>

        <div className="content">
          <h1 className="title">{props.note.title}</h1>
          <p className="text">{props.note.text}</p>
        </div>

      </div>

    </Draggable>
  );
}

export default Note;

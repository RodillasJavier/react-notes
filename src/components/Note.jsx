import React, { useRef } from 'react';
import Draggable from 'react-draggable';

function Note(props) {
  const nodeRef = useRef(null);

  // Handle 'clicking' on an element to bring it to the front
  const handleStart = (e, data) => {
    if (props.handleDrag) {
      props.handleDrag(props.id, data.x, data.y);
    }
  };

  // Handle 'dragging' around the screen
  const handleDrag = (e, data) => {
    if (props.handleDrag) {
      props.handleDrag(props.id, data.x, data.y);
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

      <div ref={nodeRef} id={props.id} className="note-item" style={{ zIndex: props.note.zIndex }}>
        <div className="drag-handle">
          <h1 className="title">{props.note.title}</h1>
        </div>
        <p className="text">{props.note.text}</p>
      </div>

    </Draggable>
  );
}

export default Note;

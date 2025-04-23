import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Markdown from 'react-markdown';

function Note(props) {
  const nodeRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState({
    title: props.note.title,
    text: props.note.text,
  });

  const renderContentSection = () => {
    if (isEditing) {
      return (
        <div className="content">
          <input
            type="text"
            className="title"
            value={noteContent.title}
            onChange={(e) => setNoteContent({ ...noteContent, title: e.target.value })}
          />
          <textarea
            className="text"
            value={noteContent.text}
            onChange={(e) => setNoteContent({ ...noteContent, text: e.target.value })}
          />
        </div>
      );
    } else {
      return (
        <div className="content">
          <h1 className="title">{props.note.title}</h1>
          <Markdown>{props.note.text}</Markdown>
          {/* <p className="text">{props.note.text}</p> */}
        </div>
      );
    }
  };

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

  // Handle switching modes + saving content whenever edit buttons are pressed
  const handleEditToggle = () => {
    // If we are in editing mode, save content before switching out
    if (isEditing) {
      if (props.handleEdit) {
        props.handleEdit(props.id, noteContent);
      }
    }

    // Flip the boolean to change modes
    setIsEditing(!isEditing);
  };

  // Update the edit icon based on the mode that we are in
  const renderEditIcon = () => {
    if (!isEditing) {
      return (
        <i
          onClick={handleEditToggle}
          className="fa-solid fa-pen icon"
          role="button"
          tabIndex="0"
          aria-label="Edit Icon"
        />
      );
    } else {
      return (
        <i
          onClick={handleEditToggle}
          className="fa-solid fa-floppy-disk icon"
          role="button"
          tabIndex="0"
          aria-label="Save Icon"
        />
      );
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
          <i
            onClick={handleDelete}
            className="fa-solid fa-trash icon"
            role="button"
            tabIndex="0"
            aria-label="delete note"
          />
          <i className="fa-solid fa-grip-lines icon drag-handle" />
          {renderEditIcon()}
        </div>

        {/* Display our content */}
        {renderContentSection()}

      </div>

    </Draggable>
  );
}

export default Note;

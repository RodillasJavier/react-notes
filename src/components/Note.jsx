import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Markdown from 'react-markdown';
import NoteMenu from './NoteMenu';

function Note(props) {
  const nodeRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          <Markdown>{props.note.text}</Markdown>
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

  return (
    // Each note is 'draggable'
    <Draggable
      nodeRef={nodeRef}
      handle=".note-header"
      defaultPosition={{ x: 20, y: 20 }} // if no position given
      position={{ x: parseInt(props.note.x, 10), y: parseInt(props.note.y, 10) }}
      onStart={handleDrag}
      onDrag={handleDrag}
    >

      {/* Our note element */}
      <div ref={nodeRef} id={props.id} className="note" style={{ zIndex: props.note.zIndex }}>

        {/* Header to include tool menu + Title */}
        <div className="note-header">
          <h1 className="title">{props.note.title}</h1>

          <div className="kebab-menu">
            {/* Menu Icon */}
            <i className="fa-solid fa-ellipsis-vertical icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              role="button"
              tabIndex={0}
              aria-label="menu"
            />

            {/* Note Menu Element */}
            <NoteMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onEdit={handleEditToggle}
              onDelete={handleDelete}
              isEditing={isEditing}
            />
          </div>

        </div>

        {/* Display our content */}
        {renderContentSection()}

      </div>

    </Draggable>
  );
}

export default Note;

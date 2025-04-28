import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Markdown from 'react-markdown';
import NoteMenu from './NoteMenu';

function Note(props) {
  const nodeRef = useRef(null);
  const [size, setSize] = useState({ width: 250, height: 200 });
  const [isResizing, setIsResizing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [noteContent, setNoteContent] = useState({
    title: props.note.title,
    text: props.note.text,
  });

  // Handle resize functionality
  const handleResize = (e) => {
    if (!isResizing) return;

    const dx = e.movementX;
    const dy = e.movementY;

    setSize((prevSize) => ({
      width: Math.max(250, prevSize.width + dx),
      height: Math.max(100, prevSize.height + dy),
    }));
  };

  // Mouseup handler to save final size
  const handleResizeEnd = () => {
    setIsResizing(false);
    // Ensure final size is saved
    if (props.handleEdit) {
      props.handleEdit(props.id, {
        ...props.note,
        width: size.width,
        height: size.height,
      });
    }
  };

  // Add double click handler for edit mode
  const handleDoubleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  // Render our content to display in the note
  const renderContentSection = () => {
    // Editing mode
    if (isEditing) {
      return (
        <div className="content editing">
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

    // Out of editing mode
    } else {
      return (
        <div className="content viewing">
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

  // Resizing
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, size]);

  // Updating size
  useEffect(() => {
    // Initialize size from props when note loads
    if (props.note.width && props.note.height) {
      setSize({
        width: parseInt(props.note.width, 10),
        height: parseInt(props.note.height, 10),
      });
    }
  }, [props.note.width, props.note.height]);

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
      <div
        ref={nodeRef}
        id={props.id}
        className="note"
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex: props.note.zIndex,
        }}
        onDoubleClick={handleDoubleClick}
      >

        {/* Header to include tool menu + Title */}
        <div className="note-header">
          <h1 className="title">{props.note.title}</h1>

          <div className="kebab-menu">
            {/* Kebab Icon */}
            <i className="fa-solid fa-ellipsis-vertical icon"
              onClick={() => { setIsMenuOpen(!isMenuOpen); }}
              role="button"
              tabIndex={0}
              aria-label="menu"
            />

            {/* Note Menu Element */}
            <NoteMenu
              isMenuOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onEdit={handleEditToggle}
              onDelete={handleDelete}
              isEditing={isEditing}
            />
          </div>

        </div>

        {/* Display our content */}
        {renderContentSection()}

        {/* Resize Handle */}
        <div
          className="resize-handle"
          onMouseDown={() => {
            setIsResizing(true);
          }}
          role="button"
          tabIndex={0}
          aria-label="resize"
        >
          <i className="fa-solid fa-arrows-up-down-left-right" />
        </div>

      </div>

    </Draggable>
  );
}

export default Note;

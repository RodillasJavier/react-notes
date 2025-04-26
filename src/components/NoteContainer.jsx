import React from 'react';
import Note from './Note';

function NoteContainer(props) {
  // Null checking to prevent type errors
  if (!props.notes) {
    return <div className="note-container" />;
  }

  return (
    <div className="note-container">
      {/* Render each note in our list of notes */}
      {Object.entries(props.notes).map(([id, note]) => {
        return (
          <Note
            id={id}
            note={note}
            handleDrag={props.handleDrag}
            handleDelete={props.handleDelete}
            handleEdit={props.handleEdit}
            key={id}
          />
        );
      })}
    </div>
  );
}

export default NoteContainer;

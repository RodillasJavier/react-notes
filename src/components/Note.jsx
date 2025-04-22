import React from 'react';

/**
 * Note Component
 *
 * Display  title
 *          content
 * Is   draggable
 *      editable
 *      deletable
 */

function Note(props) {
  return (
    <div id={props.Note.id}>{props.Note.text}</div>
  );
}

export default Note;

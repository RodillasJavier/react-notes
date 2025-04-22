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
    <div id={props.id} className="">{props.text}</div>
  );
}

export default Note;

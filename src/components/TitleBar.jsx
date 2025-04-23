import React from 'react';

function TitleBar(props) {
  return (
    <div className="masthead">
      <input type="text" placeholder="Enter title for a new note here..." />
      <i className="fa-solid fa-plus icon" />
    </div>
  );
}

export default TitleBar;

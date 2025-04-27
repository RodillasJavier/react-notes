import React from 'react';

function MenuItem(props) {
  // Props: icon, label, onClick, tabIndex
  return (
    <div
      className="menu-item-wrapper"
      onClick={props.onClick}
      role="button"
      tabIndex={props.tabIndex}
      aria-label={props.label.toLowerCase()}
    >
      <i className={`fa-solid ${props.icon} icon`} />
      <p className="icon-label">{props.label}</p>
    </div>
  );
}

export default MenuItem;

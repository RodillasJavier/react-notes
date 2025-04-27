import React from 'react';

/* Props: icon, label, onClick, tabIndex */
function MenuItem(props) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (props.onClick) {
      props.onClick();
    }
  };

  /* Menu Item element */
  return (
    <div
      className="menu-item-wrapper"
      onClick={handleClick}
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

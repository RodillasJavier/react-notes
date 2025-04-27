import React, { useEffect, useRef } from 'react';
import MenuItem from './MenuItem';

/* Props: isMenuOpen, onClose, onEdit, onDelete, isEditing */
function NoteMenu(props) {
  const menuRef = useRef(null);

  // Closing menu when clicking outside
  useEffect(() => {
    // Function to detect and handle when we not clicking in menu
    const handleClickOutside = (e) => {
      if (menuRef.current
          && !menuRef.current.contains(e.target)
          && !e.target.closest('.fa-ellipsis-vertical')) {
        props.onClose();
      }
    };

    // Add an event listener whenever we open our menu
    if (props.isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup and remove listener when the menu is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props.isMenuOpen, props.onClose]);

  // Nothing to display if the note menu isnt opened up
  if (!props.isMenuOpen) { return null; }

  // Function to close automatically after a button is clicked
  const handleMenuItemClick = (action) => {
    if (action) { action(); }
    props.onClose();
  };

  /* Note Menu element */
  return (
    <div className="menu-items" ref={menuRef}>

      {/* Editing Icon */}
      <MenuItem
        icon={props.isEditing ? 'fa-floppy-disk' : 'fa-pen'}
        label={props.isEditing ? 'Save' : 'Edit'}
        onClick={() => handleMenuItemClick(props.onEdit)}
      />

      {/* Delete Icon */}
      <MenuItem
        icon="fa-trash"
        label="Delete"
        onClick={() => handleMenuItemClick(props.onDelete)}
        tabIndex={-1}
      />

    </div>
  );
}

export default NoteMenu;

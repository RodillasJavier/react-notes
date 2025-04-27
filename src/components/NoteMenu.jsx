import React from 'react';
import MenuItem from './MenuItem';

function NoteMenu(props) {
  // Props: isMenuOpen, onClose, onEdit, onDelete, isEditing
  if (!props.isOpen) { return null; }

  return (
    <div className="menu-items">

      {/* Editing Icon */}
      <MenuItem
        icon={props.isEditing ? 'fa-floppy-disk' : 'fa-pen'}
        label={props.isEditing ? 'Save' : 'Edit'}
        onClick={props.onEdit}
      />

      {/* Delete Icon */}
      <MenuItem
        icon="fa-trash"
        label="Delete"
        onClick={props.onDelete}
        tabIndex={-1}
      />

      {/* Close Menu Icon */}
      <MenuItem
        icon="fa-xmark"
        label="Close Menu"
        onClick={props.onClose}
        tabIndex={-2}
      />

    </div>
  );
}

export default NoteMenu;

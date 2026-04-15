// Set the configuration for our app
import React, { useEffect, useState } from 'react';
import Note from './Note';
import NoteContainer from './NoteContainer';
import TitleBar from './TitleBar';
import {
  onNotesValueChange, createNote, removeNote, updateNoteContent, updateNotePosition,
} from '../services/datastore';

function App() {
  const [maxZ, setMaxZ] = useState(0);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);

  // 'Add Note' function
  const addNote = (noteID, newNote) => {
    createNote(newNote);
  };

  // 'Delete Note' function
  const deleteNote = (noteID) => {
    removeNote(noteID);
  };

  // 'Edit Note' function
  const editNote = (noteID, newContent) => {
    updateNoteContent(noteID, newContent);
  };

  // 'Move Note' function
  const moveNote = (noteID, newX, newY) => {
    setMaxZ((prevMaxZ) => prevMaxZ + 1);
    updateNotePosition(noteID, newX, newY, maxZ);
  };

  useEffect(() => {
    const unsubscribe = onNotesValueChange((newNotes) => {
      setNotes(newNotes);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return <div id="loading-screen">Loading...</div>;
  }

  return (
    <div>
      <TitleBar handleAdd={addNote} />
      <NoteContainer
        className="note-container"
        notes={notes}
        handleEdit={editNote}
        handleDrag={moveNote}
        handleDelete={deleteNote}
      />
    </div>
  );
}

export default App;

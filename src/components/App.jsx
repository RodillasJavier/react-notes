// Set the configuration for our app
import React, { useEffect, useState } from 'react';
import Note from './Note';
import TitleBar from './TitleBar';
import {
  onNotesValueChange, createNote, removeNote, updateNoteContent, updateNotePosition,
} from '../services/datastore';

function App() {
  const [maxZ, setMaxZ] = useState(0);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);

  // 'Delete Note' function
  const deleteNote = (noteID) => {
    removeNote(noteID);
  };

  // 'Add Note' function
  const addNote = (noteID, newNote) => {
    createNote(newNote);
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
      <div className="note-container">
        {/* Render each note in our list of notes */}
        {Object.entries(notes).map(([id, note]) => {
          return (
            <Note
              id={id}
              note={note}
              handleDrag={moveNote}
              handleDelete={deleteNote}
              handleEdit={editNote}
              key={id}
            />
          );
        })}
      </div>

    </div>
  );
}

export default App;

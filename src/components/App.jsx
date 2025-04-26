import React, { useEffect, useState } from 'react';
import { produce } from 'immer';
import firebase from 'firebase/compat/app';
import Note from './Note';
import TitleBar from './TitleBar';
import {
  onNotesValueChange, createNote, removeNote, updateNoteContent, updateNotePosition,
} from '../services/datastore';

// Set the configuration for our app
const config = {
  apiKey: 'AIzaSyDWHxa9msjplvlmLWP5mUK65KsQalsB_D4',
  authDomain: 'firenotes-1a896.firebaseapp.com',
  databaseURL: 'https://firenotes-1a896-default-rtdb.firebaseio.com',
  storageBucket: 'firenotes-1a896.firebasestorage.app',
  projectId: 'firenotes-1a896',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

function App() {
  const [maxZ, setMaxZ] = useState(0);
  const [notes, setNotes] = useState({});

  // 'Update Notes' function
  const updateNotes = (noteID, fields) => {
    setNotes(
      produce((draft) => {
        draft[noteID] = { ...draft[noteID], ...fields };
      }),
    );
  };

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
    return () => {
      onNotesValueChange((newNotes) => {
        setNotes(newNotes);
      });
    };
  }, []);

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

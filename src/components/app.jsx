import React, { useState } from 'react';
import { produce } from 'immer';

function App(props) {
  const [notes, setNotes] = useState({
    // For testing
    1: {
      title: 'testing',
      text: 'I is a note',
      x: '400',
      y: '12',
      zIndex: '26',
    },
    2: {
      title: 'title',
      text: 'text',
      x: '1',
      y: '1',
      zIndex: '1',
    },
  });

  // 'Update Notes' function
  const updateNotes = (noteID, fields) => {
    setNotes(
      produce((draft) => {
        draft.noteID = { ...draft.notes.noteID, ...fields };
      }),
    );
  };

  // 'Delete Note' function
  const deleteNote = (noteID) => {
    setNotes(
      produce((draft) => {
        delete draft[noteID];
      }),
    );
  };

  // 'Add Note' function
  const addNote = (noteID, newNote) => {
    setNotes(
      produce((draft) => {
        draft[noteID] = newNote;
      }),
    );
  };

  return (
    <div>Bruh Moment</div>
  );
}

export default App;

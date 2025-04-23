import React, { useEffect, useState } from 'react';
import { produce } from 'immer';
import Note from './Note';
import TitleBar from './TitleBar';

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

  // 'Edit Note' function
  const editNote = (noteID, newContent) => {
    setNotes(
      produce((draft) => {
        draft[noteID].title = newContent.title;
        draft[noteID].text = newContent.text;
      }),
    );
  };

  // 'Move Note' function
  const moveNote = (noteID, newX, newY) => {
    setMaxZ((prevMaxZ) => prevMaxZ + 1);
    setNotes(
      produce((draft) => {
        draft[noteID].x = newX;
        draft[noteID].y = newY;
        draft[noteID].zIndex = maxZ + 1;
      }),
    );
  };

  useEffect(() => {
    console.log(notes);
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

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Set the configuration for our app
const config = {
  apiKey: 'AIzaSyDWHxa9msjplvlmLWP5mUK65KsQalsB_D4',
  authDomain: 'firenotes-1a896.firebaseapp.com',
  databaseURL: 'https://firenotes-1a896-default-rtdb.firebaseio.com',
  storageBucket: 'firenotes-1a896.firebasestorage.app',
  projectId: 'firenotes-1a896',
};
firebase.initializeApp(config);

const database = firebase.database();
const notesRef = database.ref('notes');

export function onNotesValueChange(callback) {
  notesRef.on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });

  return () => {
    notesRef.off('value');
  };
}

// Creating a new note
export function createNote(note) {
  return notesRef.push(note).key;
}

// Update an existing note
export function updateNoteContent(id, data) {
  return notesRef.child(id).update(data);
}

// Delete a note
export function removeNote(id) {
  return notesRef.child(id).remove();
}

// Move a note
export function updateNotePosition(id, x, y, zIndex) {
  return notesRef.child(id).update({ x, y, zIndex });
}

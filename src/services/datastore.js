import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
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

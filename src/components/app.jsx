import React, { useState } from 'react';

function App(props) {
  const [notes, setNotes] = useState([{
    title: 'testing',
    text: 'I is a note',
    x: '400',
    y: '12',
    zIndex: '26',
  }, {
    title: 'title',
    text: 'text',
    x: '1',
    y: '1',
    zIndex: '1',
  }]);
  return (
    <div>Bruh Moment</div>
  );
}

export default App;

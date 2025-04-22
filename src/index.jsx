import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import App from './components/app';

// Instantiate a react root instance + attaching it to #main element
const root = createRoot(document.getElementById('main'));
root.render(<App />);

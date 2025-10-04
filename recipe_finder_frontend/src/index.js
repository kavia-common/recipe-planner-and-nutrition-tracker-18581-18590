import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Entry point remains for CRA. App.tsx is authored in TSX-like patterns but compiled via JS here.
// We keep this as is to mount the new App which includes the Neon Cyber UI and Context.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

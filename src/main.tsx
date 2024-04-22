import React from 'react';
import ReactDOM from 'react-dom/client';
import './style-reset.scss';
import App from './App.tsx';
import { UserProvider } from './contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

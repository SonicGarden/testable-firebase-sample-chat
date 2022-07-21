import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import 'virtual:windi.css';
import '@/lib/firebase';
import { AuthProvider } from './contexts/AuthContext';
import { UsersProvider } from './contexts/UsersContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>
);

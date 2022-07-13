import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import 'virtual:windi.css';
import '@/lib/firebase';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

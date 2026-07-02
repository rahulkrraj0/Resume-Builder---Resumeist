import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './hooks/useTheme.jsx';
import { ResumeProvider } from './context/ResumeContext.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

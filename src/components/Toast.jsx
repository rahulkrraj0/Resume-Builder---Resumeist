import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme.jsx';

export default function Toast() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: isDark ? '#1F222A' : '#FFFFFF',
          color: isDark ? '#FAF8F3' : '#14171F',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(20,23,31,0.08)',
          borderRadius: '14px',
          fontSize: '14px',
          fontFamily: '"Source Sans 3", sans-serif',
          boxShadow: '0 8px 24px -8px rgba(20,23,31,0.25)'
        },
        success: { iconTheme: { primary: '#1F8A70', secondary: '#FFFFFF' } },
        error: { iconTheme: { primary: '#C1473A', secondary: '#FFFFFF' } }
      }}
    />
  );
}

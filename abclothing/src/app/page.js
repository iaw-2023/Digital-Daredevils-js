import dynamic from 'next/dynamic';
import React from 'react';
// Load the App component dynamically
const App = dynamic(() => import('./pages/App'), { ssr : false});

export default function Home() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
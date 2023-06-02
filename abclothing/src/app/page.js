import dynamic from 'next/dynamic';
import React from 'react';
import Head from 'next/head';
const App = dynamic(() => import('./pages/App'), { ssr : false});

export default function Home() {
  return (
    <React.StrictMode>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </React.StrictMode>
  );
}
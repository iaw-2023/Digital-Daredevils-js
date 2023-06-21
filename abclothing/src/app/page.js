"use client";

import React from 'react';
import Head from 'next/head';
import { Shop } from './shop/shop';
export default function Home() {
  return (
    <React.StrictMode>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shop />
    </React.StrictMode>
  );
}
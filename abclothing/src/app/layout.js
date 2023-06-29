import React from 'react';
import './globals.css'
import ClientSideLayout from './clientSideLayout';

export const metadata = {
  title: 'AB Clothing Store',
  description: 'made by Digital Daredevils.',
  icon: <link rel="icon" href="/favicon.ico" />,
}

export default function RootLayout({ children }) {
  const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
  const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
  const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
  return (
    <ClientSideLayout
      AUTH0_DOMAIN={AUTH0_DOMAIN}
      AUTH0_CLIENT_ID={AUTH0_CLIENT_ID}
      MERCADOPAGO_ACCESS_TOKEN={MERCADOPAGO_ACCESS_TOKEN}
    >
      {children}
    </ClientSideLayout>
  )
}
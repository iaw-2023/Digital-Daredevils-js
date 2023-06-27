"use client";

import { Inter } from 'next/font/google'
import { Navbar } from './components/navBar/navBar';
import Link from 'next/link';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { Auth0Provider } from '@auth0/auth0-react';
import { Box, Text } from '@chakra-ui/react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import "react-toastify/dist/ReactToastify.css";
import './globals.css'
import dynamic from 'next/dynamic';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AB Clothing Store',
  description: 'made by Digital Daredevils.',
  icon: <link rel="icon" href="/favicon.ico" />,
}

initMercadoPago('TEST-c0a7a684-e012-4148-befc-577a9878a3de'); // aca deberia tomarlo del .env cuando se digne a tomarlo

const domain = "dev-isj4pwd0ownme8e8.us.auth0.com" // aca deberia tomarlo del .env cuando se digne a tomarlo
const clientId = "B9scjNlVuJcq5rlgxdLfxCnFzcFQAxxX"; // aca deberia tomarlo del .env cuando se digne a tomarlo

const ShopContextProvider = dynamic(() => import('./components/context/shop-context').then(mod => mod.ShopContextProvider), {
  ssr: false
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Auth0Provider domain={domain} clientId={clientId}
            authorizationParams={{
              redirect_uri: "http://localhost:3000",
              audience:"https://digital-daredevils-laravel-digitaldaredevils.vercel.app/restApi/",
              scope:"openid profile email"
            }}  
          >
            <ChakraProvider>
              <ShopContextProvider>
                <ToastContainer
                  position="bottom-left"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <Navbar />
                <Box minHeight="100vh" display="flex" flexDirection="column">
                  <Box flexGrow={1}>{children}</Box>
                  <Box as="footer" p={4} textAlign="center">
                    <Link href="https://github.com/iaw-2023/Digital-Daredevils-js/" textDecoration="underline">
                      <Text fontSize={["sm", "md", "lg"]}>
                        Created by Digital Daredevils ®
                      </Text>
                    </Link>
                  </Box>
                </Box>
              </ShopContextProvider>
            </ChakraProvider>
          </Auth0Provider>
      </body>
    </html>
  )
}
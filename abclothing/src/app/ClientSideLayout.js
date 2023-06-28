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

const ShopContextProvider = dynamic(() => import('./components/context/shop-context').then(mod => mod.ShopContextProvider), {
  ssr: false
});

export default function ClientSideLayout({ children , AUTH0_DOMAIN, AUTH0_CLIENT_ID, MERCADOPAGO_ACCESS_TOKEN}) {
    initMercadoPago(MERCADOPAGO_ACCESS_TOKEN); 
    const redirectUri = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

    return (
        <html lang="en">
            <body className={inter.className}>
                <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}
                    authorizationParams={{
                        redirect_uri: redirectUri,
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
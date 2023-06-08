"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from '../components/navBar/navBar';
import { Shop } from './shop/shop';
import { Contacto } from './contacto/contacto';
import { Carrito } from './carrito/carrito';
import { ChakraProvider } from '@chakra-ui/react';
import { ProductDetails } from './productDetails/productDetails';
import { ShopCategoria } from './shop/shopCategoria';
import { ShopContextProvider } from '../context/shop-context';
import { ShopSearch } from './shop/shopSearch';
import { DetallesPedido } from './detallesPedido/DetallesPedidoView';
import { MisPedidos } from './misPedidos/misPedidos';
import { ToastContainer } from 'react-toastify';
import { Auth0Provider } from '@auth0/auth0-react';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
const domain = "dev-isj4pwd0ownme8e8.us.auth0.com" // aca deberia tomarlo del .env cuando se digne a tomarlo
const clientId = "B9scjNlVuJcq5rlgxdLfxCnFzcFQAxxX"; // aca deberia tomarlo del .env cuando se digne a tomarlo
function App() {

  return (
    <>
      <Router>
        <Auth0Provider domain={domain} clientId={clientId}
          authorizationParams={{
            redirect_uri: "https://digital-daredevils-70dsrgwih-digitaldaredevils.vercel.app/"
          }}
        >
          <div className="App">
            <ChakraProvider>
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
              <ShopContextProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Shop />} />
                  <Route path="/shopSearch" element={<ShopSearch />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/carrito" element={<Carrito />} />
                  <Route path="/misPedidos" element={<MisPedidos />} />
                  <Route path="/productos/:id" element={<ProductDetails />} />
                  <Route path="/categorias/:id/:nombre" element={<ShopCategoria />} />
                  <Route path="/detallesPedido/:id" element={<DetallesPedido />} />
                </Routes>
                <footer>
                  <Link to="https://github.com/iaw-2023/Digital-Daredevils-js/">
                    <p>Created by Digital Daredevils ®</p>
                  </Link>
                </footer>
              </ShopContextProvider>
            </ChakraProvider>
          </div>
        </Auth0Provider>
      </Router>
    </>
  );
}

export default App;
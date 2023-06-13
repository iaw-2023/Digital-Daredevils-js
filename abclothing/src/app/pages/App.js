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
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App">
        <Router>
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
        </Router>
      </div>
    </>
  );
}

export default App;
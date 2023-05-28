"use client";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "../components/navBar";
import { Shop } from "./shop/shop";
import { Contacto } from "./contacto";
import { Carrito } from "./carrito/carrito";
import { ChakraProvider } from "@chakra-ui/react";
import { ProductDetails } from "./productDetails/productDetails";
import { ShopContextProvider } from "../context/shop-context";
import { ShopSearch } from "./shop/shopSearch";

function App(){
  return (
    <div className="App">
      <Router>
        <ChakraProvider>
          <ShopContextProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/shopSearch" element={<ShopSearch />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/productos/:id" element={<ProductDetails />} />
            </Routes>
            <footer>
              <a href="https://github.com/iaw-2023/Digital-Daredevils-js/">
              <p>Created by Digital Daredevils</p>
              </a>
            </footer>
          </ShopContextProvider>
        </ChakraProvider>
      </Router>
    </div>
  );
}

export default App;
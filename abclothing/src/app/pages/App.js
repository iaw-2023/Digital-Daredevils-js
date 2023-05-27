"use client";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Shop } from "./shop/shop";
import { Contacto } from "./contacto";
import { Carrito } from "./carrito/carrito";
import { ProductDetails } from "./productDetails/productDetails";
import { ShopContextProvider } from "../context/shop-context";
import Image from 'next/image';

function App(){
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
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
      </Router>
    </div>
  );
}

export default App;
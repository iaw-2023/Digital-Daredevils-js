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
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/productos/:id" element={<ProductDetails />} />
          </Routes>
          <footer>
            <p>Created by Digital Daredevils</p>
            <a href="https://github.com/iaw-2023/Digital-Daredevils-js/">
            <Image
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub logo"
              className="github-logo"
              width={500}
              height={500}
            />
            </a>
          </footer>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
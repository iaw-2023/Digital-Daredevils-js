import React from "react";
import Burger from './Burger';
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import SearchBar from "./searchBar";
import "./navbar.css";
export const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">

      <div className="logo">
        <Link to="/" id="NavTitle">
          AB Clothing 
        </Link>
      </div>
      <div className="Link-Menu">
        <div className="links">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
              Shop
          </Link>
          
        </div>
        <div className="links">
        <Link to="/contacto" className={location.pathname === "/contacto" ? "active-link" : ""}>
            Contacto
          </Link>
        </div>
        <SearchBar />
        <div className="carrito">
          <Link to="/carrito" className={location.pathname === "/carrito" ? "active-link" : ""}>
            <ShoppingCart size={32} />
          </Link>
        </div>
      </div>
        <Burger />
      </div>

  );
};

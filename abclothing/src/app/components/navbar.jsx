import React from "react";
import Burger from './Burger';
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
export const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      
      <div className="links">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
            Shop
        </Link>
        <Link
          to="/contacto"
          className={location.pathname === "/contacto" ? "active-link" : ""}
        >
          Contact
        </Link>
      </div>

      <div className="logo">
        <Link to="/" id="NavTitle">
          AB Clothing 
        </Link>
      </div>

      <div className="carrito">
        <Link to="/carrito" id="cartlink" className={location.pathname === "/carrito" ? "active-link" : ""}>
          <ShoppingCart size={32} />
        </Link>
       
      </div>
      <Burger />
    </div>
  );
};

"use client";

import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import { useNavigate } from "react-router-dom";
import "./carrito.css";

export const Carrito = () => {
  const { productosCarrito, getTotalCarrito, checkout } = useContext(ShopContext);
  const navigate = useNavigate();

  const [totalCarrito, setTotalCarrito] = useState(0);
  const [totalCarritoLoading, setTotalCarritoLoading] = useState(true);

  useEffect(() => {
    const fetchTotalCarrito = async () => {
      setTotalCarritoLoading(true);
      const total = await getTotalCarrito();
      setTotalCarrito(total);
      setTotalCarritoLoading(false);
    };

    fetchTotalCarrito();
  }, [productosCarrito]);

  if (totalCarritoLoading) {
    return (
      <div className="carrito">
        <div className="loading-carrito">
          Loading...
        </div>
      </div>
    );
  } else {
    return (
      <div className="carrito">
        <div className="title">
          Prendas en el carrito
        </div>
        {!productosCarrito ? null :
          Object.values(productosCarrito).map((producto) => {
            if (producto.amount !== 0) {
              return <ItemCarrito data={producto} key={producto.id} />;
            }
            return null;
          })
        }
        {totalCarrito > 0 ? (
          <div className="checkout">
            <div className="subtotal">
              <h2>Subtotal: ${totalCarrito.toLocaleString()}</h2>
            </div>
            <div className="buttons">
              <button onClick={() => navigate("/")}>Seguir comprando</button>
              <button
                onClick={() => {
                  checkout();
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <h1>Tu carrito está vacío</h1>
        )}
      </div>
    );
  }
};
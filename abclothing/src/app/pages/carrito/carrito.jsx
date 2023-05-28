"use client";

import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import { useNavigate } from "react-router-dom";
import { LISTAPRODUCTOS } from '../../components/Productos';
import "./carrito.css";

export const Carrito = () => {
  const { loadingCarrito, itemsCarrito, getTotalCarrito, checkout } = useContext(ShopContext);
  const navigate = useNavigate();

  const [productos, setProductos] = useState(null);
  const [productosLoading, setProductosLoading] = useState(true);
  const [totalCarrito, setTotalCarrito] = useState(0); // Initialize with 0
  const [totalCarritoLoading, setTotalCarritoLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductosLoading(true);
        const response = await LISTAPRODUCTOS();
        setProductos(response.data);
        setProductosLoading(false);

        setTotalCarritoLoading(true);
        const total = await getTotalCarrito();
        setTotalCarrito(total);
        setTotalCarritoLoading(false);
      } catch (error) {
        setProductosLoading(false);
        setTotalCarritoLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [itemsCarrito]); 

  if (productosLoading || totalCarritoLoading) {
    return (
      <div className="carrito">
        <div className="loading-carrito">
          Loading...
        </div>
      </div>  
      );
  }
  else {
    return (
      <div className="carrito">
          <div className="carrito">
          <div className="title">
            Prendas en el carrito
          </div>
            {!loadingCarrito && itemsCarrito !== undefined ?
              productos.map((producto) => {
                if (itemsCarrito[producto.id] != 0) {
                  return <ItemCarrito data={producto} key={producto.id} />;
                }
            }) : null}
          </div>

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

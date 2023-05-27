"use client";

import { createContext, useState, useEffect } from "react";
import { LISTAPRODUCTOS } from "../components/Productos";
import { PRODUCTOBYID } from "../components/Productos";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [loadingCarrito, setLoadingCarrito] = useState(true);
  const [itemsCarrito, setItemsCarrito] = useState({});
  const carrito = {};
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoadingCarrito(true);
        const response = await LISTAPRODUCTOS();
        const productos = response.data;
        for (let i = 1; i <= productos.length + 1; i++) {
          carrito[i] = 0;
        }
        setItemsCarrito(carrito);
        setLoadingCarrito(false);
      } catch (error) {
        setLoadingCarrito(false);
        console.error(error);
      }
    };

    fetchProductos();
  }, []);
  
  const getTotalCarrito = async () => {
    let cantidadTotal = 0;
    if (!loadingCarrito && itemsCarrito !== undefined){
      for (const item in itemsCarrito) {
        if (itemsCarrito[item] > 0) {
          const producto = await PRODUCTOBYID(parseInt(item));
          if (producto) {
            cantidadTotal += itemsCarrito[item] * producto.precio;
          }
        }
      }
    }
    return cantidadTotal;
  };

  const agregarAlCarrito = (itemId) => {
    if (!loadingCarrito && itemsCarrito !== undefined){
      setItemsCarrito((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const quitarDelCarrito = (itemId) => {
    if (!loadingCarrito && itemsCarrito !== undefined){
      setItemsCarrito((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const actualizarCantidadItemsCarrito = (nuevaCantidad, itemId) => {
    if (!loadingCarrito && itemsCarrito !== undefined){
      setItemsCarrito((prev) => ({ ...prev, [itemId]: nuevaCantidad }));
    }
  };

  const checkout = () => {
    if (!loadingCarrito && itemsCarrito !== undefined){
      // TODO:
      //setItemsCarrito(itemsCarrito);
    }
  };

  const contextValue = {
    itemsCarrito,
    loadingCarrito,
    agregarAlCarrito,
    actualizarCantidadItemsCarrito,
    quitarDelCarrito,
    getTotalCarrito,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
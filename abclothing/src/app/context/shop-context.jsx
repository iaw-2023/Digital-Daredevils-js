"use client";
import { createContext, useState } from "react";
import { LISTAPRODUCTOS } from "../components/Productos";

export const ShopContext = createContext(null);

const getCarritoDefault = () => {
  let carrito = {};
  for (let i = 1; i < LISTAPRODUCTOS.length + 1; i++) {
    carrito[i] = 0;
  }
  return carrito;
};

export const ShopContextProvider = (props) => {
  const [itemsCarrito, setItemsCarrito] = useState(getCarritoDefault());

  const getTotalCarrito = () => {
    let cantidadTotal = 0;
    for (const item in itemsCarrito) {
      if (itemsCarrito[item] > 0) {
        let infoItem = LISTAPRODUCTOS.find((product) => product.id === Number(item));
        cantidadTotal += itemsCarrito[item] * infoItem.price;
      }
    }
    return cantidadTotal;
  };

  const agregarAlCarrito = (itemId) => {
    setItemsCarrito((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const quitarDelCarrito = (itemId) => {
    setItemsCarrito((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const actualizarCantidadItemsCarrito = (nuevaCantidad, itemId) => {
    setItemsCarrito((prev) => ({ ...prev, [itemId]: nuevaCantidad }));
  };

  const checkout = () => {
    setItemsCarrito(getCarritoDefault());
  };

  const contextValue = {
    itemsCarrito,
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
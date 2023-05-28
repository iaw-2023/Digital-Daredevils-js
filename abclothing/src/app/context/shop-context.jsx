"use client";

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LISTAPRODUCTOS } from "../components/Productos";
import { PRODUCTOBYID } from "../components/Productos";
import { GENERARPEDIDO } from "../components/Pedidos";

export const ShopContext = createContext(null);

export const inicializarItemsAfectados = (carrito, productos) => {
  for (const producto of productos) {
    carrito[producto.id] = 0;
  }
  return carrito;
};


export const ShopContextProvider = (props) => {
  const navigate = useNavigate();
  const [loadingCarrito, setLoadingCarrito] = useState(true);
  const [itemsCarrito, setItemsCarrito] = useState({});
  const carrito = {};
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoadingCarrito(true);
        const response = await LISTAPRODUCTOS();
        const productos = response.data;
        inicializarItemsAfectados(carrito, productos);
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

  const checkout = async () => {
    if (!loadingCarrito && itemsCarrito !== undefined) {
      const pedidoRequest = {
        cliente: "juancito@gmail.com",
        fecha: new Date().toISOString(),
        productos: Object.entries(itemsCarrito)
          .filter(([itemId, quantity]) => quantity > 0)
          .map(([itemId, quantity]) => ({ id: parseInt(itemId), cantidad: quantity })),
      };
      try {
        const pedidoResponse = await GENERARPEDIDO(pedidoRequest);
        resetCart();
        navigate("/");
        // agregar feedback alert pedido creado (toast? :D)
      } catch (error) {
        console.error("Error creating pedido:", error.message);
        // agregar feedback alert pedido fallido (toast? :D)
      }
    }
  };

  const resetCart = () => {
    const nuevoCarrito = Object.assign({}, itemsCarrito);
    for (const item in itemsCarrito) {
      nuevoCarrito[item] = 0;
    }
    setItemsCarrito(nuevoCarrito);
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
"use client";
import { createContext, useState, useEffect } from "react";
import { LISTAPRODUCTOS } from "../components/Productos";
import { PRODUCTOBYID } from "../components/Productos";

export const ShopContext = createContext(null);

const getCarritoDefault = () => {
  const { loading, productos } = LISTAPRODUCTOS();
  const carrito = {};

  if (loading) {
    console.log("cargando en carritoDefault");
  }
  else {
    for (let i = 1; i < productos.length + 1; i++) {
      carrito[i] = 0;
    }
  }
  return carrito;
};

export const ShopContextProvider = (props) => {
  const [itemsCarrito, setItemsCarrito] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemsCarrito = async () => {
      const carritoDefault = await getCarritoDefault();
      setItemsCarrito(carritoDefault);
      setLoading(false);
    };

    fetchItemsCarrito();
  }, []);

  const getTotalCarrito = () => {
    let cantidadTotal = 0;

    for (const item in itemsCarrito) {
      if (itemsCarrito[item] > 0) {
        const { loadingProductoById, infoItem } = PRODUCTOBYID(parseInt(item));
        if (loadingProductoById) {
          console.log("LOADING PRODUCTOBYID en shop-context");
        }
        else {
          console.log('Respuesta de la API en shop-context:', infoItem);
          if (infoItem && infoItem.precio) {
            cantidadTotal += itemsCarrito[item] * infoItem.precio;
          }
        }
      }
    }
    return cantidadTotal;
  };

  const agregarAlCarrito = (itemId) => {
    if (itemsCarrito){
      setItemsCarrito((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    else {
      setItemsCarrito((prev) => ({ ...prev, [itemId]: 1 }));
    }
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
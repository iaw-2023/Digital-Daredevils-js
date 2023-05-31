"use client";

import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GENERARPEDIDO } from "../components/Pedidos";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [productosCarrito, setProductosCarrito] = useState({});


  const getTotalCarrito = async () => {
    let cantidadTotal = 0;
    if (productosCarrito !== undefined){
      for (const itemId in productosCarrito) {
        const { amount, precio } = productosCarrito[itemId];
        cantidadTotal += amount * precio;
      }
    }
    return cantidadTotal;
  };

  const agregarAlCarrito = (producto) => {
    const { id } = producto;
    if (productosCarrito !== undefined) {
      setProductosCarrito((prev) => ({
        ...prev,
        [id]: { ...producto, amount: prev[id]?.amount + 1 || 1 },
      }));
    }
  };

 

  const quitarDelCarrito = (producto) => {
    const nuevaCantidad = producto.amount - 1;
    actualizarCantidadItemsCarrito(nuevaCantidad, producto.id);
  };
  
  
  const actualizarCantidadItemsCarrito = (nuevaCantidad, itemId) => {
    if (productosCarrito !== undefined) {
      setProductosCarrito((prev) => {
        const updatedCarrito = { ...prev };
        updatedCarrito[itemId].amount = nuevaCantidad;
        return updatedCarrito;
      });
    }
  };


  const checkout = async (email) => {
    setEmail(email);
    if (productosCarrito !== undefined) {
      const pedidoRequest = {
        cliente: email,
        fecha: new Date().toISOString(),
        productos: Object.entries(productosCarrito)
          .filter(([itemId, producto]) => producto.amount > 0)
          .map(([itemId, producto]) => ({
            id: parseInt(itemId),
            cantidad: producto.amount,
          })),
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
    setProductosCarrito({});
  };  

  const contextValue = {
    productosCarrito,
    agregarAlCarrito,
    actualizarCantidadItemsCarrito,
    quitarDelCarrito,
    getTotalCarrito,
    checkout,
    email,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
"use client";

import { createContext, useState } from "react";
import { useRouter } from 'next/navigation';
import { GENERARPEDIDO } from "../components/pedidos/PedidosFetch";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { showSuccessMessage, showFailureMessage } from "../components/alerts/alerts";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [productosCarrito, setProductosCarrito] = useState({});
  const [loading, setLoading] = useState(false);

  const getTotalCarrito = () => {
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
        setLoading(true);
        await GENERARPEDIDO(pedidoRequest);
        resetCart();
        showSuccessMessage('Pedido efectuado con éxito, muchas gracias!');
      } catch (error) {
        showFailureMessage('Hubo un problema al realizar el pedido, lo lamentamos!');
      }
      finally {
        setLoading(false);
        router.push("/");
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
      {loading ? <LoadingSpinner /> : props.children}
    </ShopContext.Provider>
  );
};
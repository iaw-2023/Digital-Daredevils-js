"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { GENERARPEDIDO } from "../pedidos/PedidosFetch";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { FETCH_DOLAR_API } from "../dolarApi/DolarFetch";
import { showSuccessMessage, showFailureMessage } from "../alerts/alerts";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const router = useRouter();
  const [productosCarrito, setProductosCarrito] = useState({});
  const [loading, setLoading] = useState(false);

  const [dolarBlue, setDolarBlueValue] = useState(1);
 
  useEffect(() => {
    const fetchDolarBlue = async () => {
      try {
        const fetchDolarApi = await FETCH_DOLAR_API();
        setDolarBlueValue(fetchDolarApi.blue.value_avg);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDolarBlue();
  }, []);

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

  const checkout = async (accessToken, mercadopagoPaymentId) => {
    if (productosCarrito !== undefined) {
      const pedidoRequest = {
        fecha: new Date().toISOString(),
        productos: Object.entries(productosCarrito)
          .filter(([itemId, producto]) => producto.amount > 0)
          .map(([itemId, producto]) => ({
            id: parseInt(itemId),
            cantidad: producto.amount,
          })),
        mercadopagoPaymentId : mercadopagoPaymentId,
      };
      try {
        setLoading(true);
        await GENERARPEDIDO(accessToken, pedidoRequest);
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
    dolarBlue,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {loading ? <LoadingSpinner /> : props.children}
    </ShopContext.Provider>
  );
};
"use client";

import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GENERARPEDIDO } from "../components/pedidos/Pedidos";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

export const ShopContext = createContext(null);

const showSuccessMessage = () =>{
  toast.success('Pedido efectuado con éxito, muchas gracias!', {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
const showFailureMessage = () =>{
  toast.error('Hubo un problema al realizar el pedido, lo lamentamos!', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}


export const ShopContextProvider = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [productosCarrito, setProductosCarrito] = useState({});
  const [loading, setLoading] = useState(false);


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
        setLoading(true);
        await GENERARPEDIDO(pedidoRequest);
        resetCart();
        showSuccessMessage();
      } catch (error) {
        showFailureMessage();
      }
      finally {
        setLoading(false);
        navigate("/");
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
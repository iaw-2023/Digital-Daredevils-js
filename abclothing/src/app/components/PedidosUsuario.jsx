"use client";

import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { PEDIDOS } from "./Pedidos";
import { Pedido } from "./Pedido";
import "../pages/shop/shop.css";

export const PedidosUsuario = () => {
  const { email } = useContext(ShopContext);
  const [pedidos, setPedidos] = useState(null);
  const [loading, setLoading] = useState(true);
  if (email){
    useEffect(() => {
      const fetchPedidos = async () => {
        try {
          setLoading(true);
          const response = await PEDIDOS(email);
          setPedidos(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      };
  
      fetchPedidos();
    }, [email]);
  
    return (
      <div className="shop">
        
        {loading ? (
          <div className="loading-shop">Loading pedidos...</div>
        ) : (
          <div className="shopContent">
            <div className="shopTitle">
              <h1>Mis pedidos</h1>
            </div>
            <div className="pedidos">
              {Object.values(pedidos).length === 0 ? (
                <h1>No se encontraron pedidos asociados al cliente o el email era incorrecto.</h1>
              ) : (
                Object.values(pedidos).map((pedido) => (
                  <Pedido data={pedido} key={pedido.id} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  else {
    return <div className="loading-shop">Debe ingresar un email primero (ingrese al menos un pedido)</div>
  }
};

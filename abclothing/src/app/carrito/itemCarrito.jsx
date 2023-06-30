"use client";

import React, { useContext } from "react";
import { ShopContext } from "../components/context/shop-context";
import Image from 'next/image';

export const ItemCarrito = (props) => {
  const { id, modelo, talle, precio, imagen_ruta } = props.data;
  const { productosCarrito, agregarAlCarrito, quitarDelCarrito, actualizarCantidadItemsCarrito } = useContext(ShopContext);

  return (
    <div className="itemCarrito">
      <Image
              src={imagen_ruta}
              alt={modelo}
              width={350}
              height={420}
      />
      <div className="description">
        <p>
          <b>{modelo}</b>
        </p>
        <p> Precio: ${precio ? precio.toLocaleString() : null}</p>
        <p> Talle: {talle}</p>
        <div className="contador">
          <button onClick={() => quitarDelCarrito(props.data)}> - </button>
          <input
            value={productosCarrito[id].amount}
            onChange={(e) => actualizarCantidadItemsCarrito(Number(e.target.value), id)}
          />
          <button onClick={() => agregarAlCarrito(props.data)}> + </button>
        </div>
      </div>
    </div>
  );
};
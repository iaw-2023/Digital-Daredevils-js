"use client";

import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import Image from 'next/image';

export const Producto = (props) => {
  const { id, modelo, precio, imagen_ruta } = props.data;
  const { loadingCarrito, agregarAlCarrito, itemsCarrito } = useContext(ShopContext);
  let cantidadItemsCarrito = 0;

  if (!loadingCarrito && itemsCarrito !== undefined) {
    cantidadItemsCarrito = itemsCarrito[id];
  }

  return (
    <div className="producto">
      <Link to={`/productos/${id}`} className="product-link">
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
          <p> ${precio}</p>
        </div>
      </Link>
      <button className="agregarAlCarritoBttn" onClick={() => agregarAlCarrito(id)}>
        Agregar al carrito {cantidadItemsCarrito > 0 && <> ({cantidadItemsCarrito})</>}
      </button>
    </div>
  );
};

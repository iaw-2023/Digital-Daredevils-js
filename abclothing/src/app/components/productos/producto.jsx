"use client";

import React, { useContext } from "react";
import Link from 'next/link';
import { ShopContext } from "../../context/shop-context";
import Image from 'next/image';

export const Producto = (props) => {
  const { id, modelo, precio, talle, imagen_ruta } = props.data;
  const { productosCarrito, agregarAlCarrito } = useContext(ShopContext);
  let cantidadItemsCarrito = 0;

  if (productosCarrito && productosCarrito[id]) {
    cantidadItemsCarrito = productosCarrito[id].amount;
  }

  return (
    <div className="producto">
      <Link href={`/productos/${id}`} className="product-link">
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
          <p><b>Precio:</b> ${precio}</p>
          <p><b>Talle:</b> {talle}</p>
        </div>
      </Link>
      <button className="agregarAlCarritoBttn" onClick={() => agregarAlCarrito(props.data)}>
        Agregar al carrito {cantidadItemsCarrito > 0 && <> ({cantidadItemsCarrito})</>}
      </button>
    </div>
  );
};
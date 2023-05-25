"use client";

import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTOBYID } from '../../components/Productos';
import Image from 'next/image';
import "./productDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const { agregarAlCarrito, itemsCarrito } = useContext(ShopContext);
  let cantidadItemsCarrito = 0;
  if (itemsCarrito){
    cantidadItemsCarrito = itemsCarrito[id];
  }

  const { loading, producto } = PRODUCTOBYID(id);
  if (loading) {
    return <p>Loading in productDetails.jsx...</p>;
  }
  else {
    if (!producto) {
      return <div>Producto no encontrado</div>;
    }
    // If the product exists, render its details
    const { modelo, marca, imagen_ruta, precio, talle } = producto;
    return (
      <div className="product-container">
        <div className="product-image-container">
          <Image
              src={imagen_ruta}
              alt={modelo}
              className="product-image"
              width={350}
              height={420}
          />
        </div>
        <div className="product-details-container">
          <h1 className="product-name">{modelo}</h1>
          <div className="product-details">
            <p><b>Marca:</b> {marca}</p>
            <p><b>Modelo:</b> {modelo}</p>
            <p><b>Talle:</b> {talle}</p>
            <p><b>Precio:</b> ${precio}</p>
  
            <button className="agregarAlCarritoBttn" onClick={() => agregarAlCarrito(id)}>
              Agregar al carrito {cantidadItemsCarrito > 0 && <> ({cantidadItemsCarrito})</>}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

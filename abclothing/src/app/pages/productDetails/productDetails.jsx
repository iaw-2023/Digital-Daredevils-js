"use client";

import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTOBYID } from '../../components/productos/ProductosFetch';
import Image from 'next/image';
import LoadingSpinner from "@/app/components/loadingSpinner/LoadingSpinner";
import "./productDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const { agregarAlCarrito, productosCarrito } = useContext(ShopContext);
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await PRODUCTOBYID(id);
        setProducto(response);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, []);


  let cantidadItemsCarrito = 0;
  if (productosCarrito && productosCarrito[id]) {
    cantidadItemsCarrito = productosCarrito[id].amount;
  }
  
  if (loading) {
    return <LoadingSpinner/>;
  }
  else {
    if (!producto) {
      return <div>Producto no encontrado</div>;
    }
    else {
      const { modelo, marca, imagen_ruta, precio, talle } = producto;
      return (
        <div className="product-container">
          <div className="item">
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
      
                <button className="agregarAlCarritoBttn" onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito {cantidadItemsCarrito > 0 && <> ({cantidadItemsCarrito})</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

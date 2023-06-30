"use client";

import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../components/context/shop-context";
import { PRODUCTOBYID } from '../../components/productos/ProductosFetch';
import Image from 'next/image';
import LoadingSpinner from "@/app/components/loadingSpinner/LoadingSpinner";
import "./productDetails.css";

const ProductDetails = ({ params }) => {
  const { agregarAlCarrito, productosCarrito, dolarBlue } = useContext(ShopContext);
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await PRODUCTOBYID(params.id);
        setProducto(response);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [params.id]);


  let cantidadItemsCarrito = 0;
  if (productosCarrito && productosCarrito[params.id]) {
    cantidadItemsCarrito = productosCarrito[params.id].amount;
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
      const precioEnDolares = (precio / dolarBlue).toFixed(2);
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
                <p><b>Talle:</b> {talle}</p>
                <p>
                  <b>Precio:</b> ${precio} 
                  <span style={{ color: "rgba(28, 84, 45, 0.8)", marginLeft: "10px"}}>
                    <b>(u$s {precioEnDolares})</b>
                  </span>
                </p> 
      
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

export default ProductDetails;
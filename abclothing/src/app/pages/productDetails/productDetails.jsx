import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTOBYID } from '../../components/Productos';
import "./productDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const { agregarAlCarrito, itemsCarrito } = useContext(ShopContext);

  const cantidadItemsCarrito = itemsCarrito[id];
  console.log("juan");
  const { loading, producto } = PRODUCTOBYID(producto => producto.id === Number(id));
  console.log(producto);
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
          <img src={imagen_ruta} alt={modelo} className="product-image" />
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

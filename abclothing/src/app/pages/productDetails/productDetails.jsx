import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { LISTAPRODUCTOS } from '../../components/Productos';
import "./productDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  // Find the product with the given ID
  const producto = LISTAPRODUCTOS.find((p) => p.id === Number(id));

  // If the product doesn't exist, return an error message
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

          <button className="addToCartBttn" onClick={() => addToCart(id)}>
            Agregar al carrito {cartItemCount > 0 && <> ({cartItemCount})</>}
          </button>
        </div>
      </div>
    </div>
  );
};

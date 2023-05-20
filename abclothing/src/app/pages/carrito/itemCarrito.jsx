import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const ItemCarrito = (props) => {
  const { id, modelo, talle, precio, imagen_ruta } = props.data;
  const { itemsCarrito, agregarAlCarrito, quitarDelCarrito, actualizarCantidadItemsCarrito } =
    useContext(ShopContext);

  return (
    <div className="itemCarrito">
      <img src={imagen_ruta} />
      <div className="description">
        <p>
          <b>{modelo}</b>
        </p>
        <p> Precio: ${precio.toLocaleString()}</p>
        <p> Talle: {talle}</p>
        <div className="contador">
          <button onClick={() => quitarDelCarrito(id)}> - </button>
          <input
            value={itemsCarrito[id]}
            onChange={(e) => actualizarCantidadItemsCarrito(Number(e.target.value), id)}
          />
          <button onClick={() => agregarAlCarrito(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
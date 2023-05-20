import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";

export const Producto = (props) => {
  const { id, modelo, precio, imagen_ruta } = props.data;
  const { agregarAlCarrito, itemsCarrito } = useContext(ShopContext);
  console.log("elPepe");
  console.log(itemsCarrito[id]);
  const cantidadItemsCarrito = itemsCarrito[id];

  return (
    <div className="producto">
      <Link to={`/productos/${id}`} className="product-link">
        <img src={imagen_ruta} />
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

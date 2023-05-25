import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import { useNavigate } from "react-router-dom";
import { LISTAPRODUCTOS } from '../../components/Productos';
import "./carrito.css";

export const Carrito = () => {
  const { itemsCarrito, getTotalCarrito, checkout } = useContext(ShopContext);
  const totalCarrito = getTotalCarrito();
  const navigate = useNavigate();

  const { loading, productos } = LISTAPRODUCTOS();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  else {
    return (
      <div className="carrito">
        <div>
          <h1>Prendas en el carrito</h1>
        </div>
          <div className="carrito">
            {productos.map((producto) => {
              if (itemsCarrito && itemsCarrito[producto.id] !== 0) {
                console.log("item actual: ", producto.id, ", cantidad: ", itemsCarrito[producto.id]);
                return <ItemCarrito data={producto} key={producto.id} />;
              }
            })}
          </div>

        {totalCarrito > 0 ? (
          <div className="checkout">
            <div className="subtotal">
              <h2>Subtotal: ${totalCarrito.toLocaleString()}</h2>
            </div>
            <div className="buttons">
              <button onClick={() => navigate("/")}>Seguir comprando</button>
              <button
                onClick={() => {
                  checkout();
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <h1>Tu carrito está vacío</h1>
        )}
      </div>
    );
  }
};

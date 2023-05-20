import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import { useNavigate } from "react-router-dom";
import "./carrito.css";

export const Carrito = () => {
  const { itemsCarrito, getTotalCarrito, checkout } = useContext(ShopContext);
  const totalCarrito = getTotalCarrito();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation to fetch the productos data
    setTimeout(() => {
      // Assuming your LISTAPRODUCTOS is fetched asynchronously
      const fetchedProductos = getProductsFromServer();
      setProductos(fetchedProductos);
      setIsLoading(false);
    }, 2000);
  }, []);

  const getProductsFromServer = () => {
    // Replace this with your logic to fetch the productos data from the server
    return Promise.resolve([
      // Example data
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
    ]);
  };

  return (
    <div className="carrito">
      <div>
        <h1>Prendas en el carrito</h1>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="carrito">
          {productos.map((producto) => {
            if (itemsCarrito[producto.id] !== 0) {
              return <ItemCarrito data={producto} key={producto.id} />;
            }
          })}
        </div>
      )}

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
};

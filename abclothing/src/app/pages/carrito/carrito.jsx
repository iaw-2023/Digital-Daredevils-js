import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import { useNavigate } from "react-router-dom";
import "./carrito.css";
import axios from 'axios';
import { PRODUCTOS_API_ENDPOINT } from '../../ApiConstants';

export const Carrito = () => {
  const { itemsCarrito, getTotalCarrito, checkout } = useContext(ShopContext);
  const totalCarrito = getTotalCarrito();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PRODUCTOS_API_ENDPOINT);
        setProductos(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching productos:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

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

import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import "./carrito.css";

export const Carrito = () => {
  const { productosCarrito, getTotalCarrito, checkout } = useContext(ShopContext);
  const navigate = useNavigate();

  const [totalCarrito, setTotalCarrito] = useState(0);
  const [totalCarritoLoading, setTotalCarritoLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const fetchTotalCarrito = async () => {
      setTotalCarritoLoading(true);
      const total = await getTotalCarrito();
      setTotalCarrito(total);
      setTotalCarritoLoading(false);
    };

    fetchTotalCarrito();
  }, [productosCarrito]);

  if (totalCarritoLoading) {
    return (
      <div className="carrito">
        <LoadingSpinner/>
      </div>
    );
  } else {
    return (
      <div className="carrito">
        <div className="title">
          Prendas en el carrito
        </div>
        {!productosCarrito ? null :
          Object.values(productosCarrito).map((producto) => {
            if (producto.amount !== 0) {
              return <ItemCarrito data={producto} key={producto.id} />;
            }
            return null;
          })}

        {totalCarrito > 0 ? (
          <div className="checkout">
            <div className="subtotal">
              <h2>
                Subtotal: ${Math.floor(totalCarrito).toLocaleString()}
                <sup className="fractional-part">{totalCarrito.toLocaleString().slice(-2)}</sup>
              </h2>
            </div>
            <div className="buttons">
              <button onClick={() => navigate("/")}>Seguir comprando</button>
              <button onClick={() => setShowModal(true)}>Checkout</button>
            </div>
          </div>
        ) : (
          <h1>Tu carrito está vacío</h1>
        )}

        {showModal ? (
          <div className="modal-background">
            <div className="mensaje" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <div className="pedido">Ingrese correo para la compra</div>
              <div>
                <div>
                  <textarea
                    value={text}
                    onChange={handleTextChange}
                    placeholder="e.g.: riverplate@gmail.com"
                    rows={1}
                    cols={50}
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px',
                      resize: 'vertical',
                      fontSize: '14px',
                      width: '100%',
                      height: '50%'
                    }}
                  />
                </div>
                <div className="close">
                  <button onClick={() => setShowModal(false)}>Cerrar</button>
                  <button
                    onClick={() => {
                      checkout(text);
                    }}
                    style={{ marginTop: '8px' }}
                  >
                    Enviar pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};
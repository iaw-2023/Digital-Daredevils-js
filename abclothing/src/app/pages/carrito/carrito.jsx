import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, ButtonGroup, Input, Flex } from "@chakra-ui/react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import "./carrito.css";

export const Carrito = () => {
  const { productosCarrito, getTotalCarrito, checkout } = useContext(ShopContext);
  const navigate = useNavigate();

  const [totalCarrito, setTotalCarrito] = useState(0);
  const [totalCarritoLoading, setTotalCarritoLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
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
        <LoadingSpinner />
      </div>
    );
  } else {
    const formattedTotal = totalCarrito.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const fractionalPart = formattedTotal.slice(-2);

    return (
      <div className="carrito">
        <div className="title">Prendas en el carrito</div>
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
                <sup className="fractional-part">
                  {fractionalPart === "00" ? "00" : fractionalPart.padStart(2, "0")}
                </sup>
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

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
          <ModalOverlay />
          <ModalContent borderRadius="15px" boxShadow="0px 3px 10px rgba(0, 0, 0, 0.2)">
            <ModalCloseButton />
            <ModalBody textAlign="center">
              <Flex direction="column" alignItems="center" justifyContent="center" py="4">
                <Flex alignItems="center">
                  <HiOutlineEnvelope style={{ fontSize: "2rem", marginRight: "1rem" }} />
                  <span style={{ fontWeight: "bold", fontFamily: "Inter, sans-serif", fontSize: "1.5rem" }}>Ingrese correo para la compra</span>
                </Flex>
                <Input
                  type="email"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="e.g.: riverplate@gmail.com"
                  size="lg"
                  mt="4"
                  focusBorderColor="teal"
                  boxShadow="0px 3px 10px rgba(0, 0, 0, 0.2)"
                />
              </Flex>
              <Flex justifyContent="center" mt="4">
                <ButtonGroup gap='4'>
                  <Button
                    colorScheme="teal"
                    variant='outline'
                    borderRadius="base"
                    onClick={() => setShowModal(false)}
                    mr="4"
                  >
                    Cerrar
                  </Button>
                  <Button
                    colorScheme="teal"
                    borderRadius="base"
                    onClick={() => checkout(text)}
                  >
                    Enviar pedido
                  </Button>
                </ButtonGroup>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  }
};

export default Carrito;
import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "@/app/components/loadingSpinner/LoadingSpinner";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, ButtonGroup, Input, Image, Flex, Box, Text, Center } from "@chakra-ui/react";
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
        {productosCarrito && Object.keys(productosCarrito).length !== 0 && (
          <h2 className="title">Prendas en el carrito</h2>
        )}

        {Object.values(productosCarrito).map((producto) => {
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
          <div>
            <Image src="/sad_shopping_bag.png" alt="Sad Shopping Bag" className="sad-shopping-bag" mt={0} mb={4} maxW={['15%', '20%', '35%', '40%']} justifyContent="center" mx="auto" />
            <Box bg="white" boxShadow="md" p={12} mt={8} mb={4} w='6xl' maxW={['30%', '40%', '50%', '100%']} mx="auto">
              <Flex flexDirection="column" alignItems="center" justifyContent="center">
              <Text fontSize={['3xl', '4xl', '5xl']} fontWeight="bold" fontFamily="Inter, sans-serif" mt={2} mb={6} textAlign="center">
                Tu carrito está <Box as="span" color="#da4352" className="highlight">vacío!</Box>
              </Text>
               <Text fontSize={['md', 'lg']} mb={2}>Añade items al carrito antes de proceder al checkout.</Text>
              <Link to="/" className="shop-button">Volver al shop</Link>
              </Flex>
            </Box>
          </div>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
          <ModalOverlay />
          <ModalContent borderRadius="15px" boxShadow="0px 3px 10px rgba(0, 0, 0, 0.2)">
            <ModalCloseButton />
            <ModalBody textAlign="center">
              <Flex direction="column" alignItems="center" justifyContent="center" py="4">
                <Flex alignItems="center">
                  <HiOutlineEnvelope style={{ fontSize: "2rem", marginRight: "1rem" }} />
                  <Text fontWeight="bold" fontFamily="Inter, sans-serif" fontSize="1.5rem">
                    Ingrese correo para la compra
                  </Text>
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
                <ButtonGroup gap='4' style={{ padding: "10px 0" }}>
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

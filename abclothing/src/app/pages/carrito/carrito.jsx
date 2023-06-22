import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "@/app/components/loadingSpinner/LoadingSpinner";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, ButtonGroup, Input, Image, Flex, Box, Text, Center } from "@chakra-ui/react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import "./carrito.css";
import { useAuth0 } from "@auth0/auth0-react";

const formatTotalCarrito = (totalCarrito) => {
  return totalCarrito.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

const parteEnteraDe = (totalCarrito) => {
  return Math.floor(totalCarrito).toLocaleString();
}

export const Carrito = () => {
  const { productosCarrito, getTotalCarrito, checkout } = useContext(ShopContext);
  const navigate = useNavigate();

  const [totalCarrito, setTotalCarrito] = useState(0);
  const [totalCarritoLoading, setTotalCarritoLoading] = useState(true);

  const { user, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const fetchTotalCarrito = () => {
      setTotalCarritoLoading(true);
      const total = getTotalCarrito();
      setTotalCarrito(total);
      setTotalCarritoLoading(false);
    };
    fetchTotalCarrito();
  }, [productosCarrito, getTotalCarrito]);

  if (totalCarritoLoading) {
    return (
      <div className="carrito">
        <LoadingSpinner />
      </div>
    );
  } else {
    const formattedTotal = formatTotalCarrito(totalCarrito);
    const fractionalPart = formattedTotal.slice(-2);
    
    return (
      <div className="carrito">
        {productosCarrito && Object.keys(productosCarrito).length !== 0 && totalCarrito > 0 && (
          <>
            <h2 className="title">Prendas en el carrito</h2>
            {Object.values(productosCarrito).map((producto) => {
              if (producto.amount !== 0) {
                return <ItemCarrito data={producto} key={producto.id} />;
              }
              return null;
            })}
          </>
        )}

        {totalCarrito > 0 ? (
          <div className="checkout">
            <div className="subtotal">
              <h2>
                Subtotal: ${parteEnteraDe(totalCarrito)}
                <sup className="fractional-part">
                  {fractionalPart === "00" ? "00" : fractionalPart.padStart(2, "0")}
                </sup>
              </h2>
            </div>
            <div className="buttons">
              <button onClick={() => navigate("/")}>Seguir comprando</button>
              <button onClick={async () => {
                const accessToken = await getAccessTokenSilently();
                checkout(accessToken, user.email)}
            }>Checkout</button>
            </div>
          </div>
        ) : (
          <Flex 
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={8}
            mb={4}
            maxW={[ '100%']}
            mx="auto"
          >
            <Image src="/sad_shopping_bag.png" alt="Sad Shopping Bag" className="sad-shopping-bag" mt={0} mb={4} maxW='40%' justifyContent="center" mx="auto" />
            <Box bg="white" boxShadow="md" p={12} mt={8} mb={4} w='6xl' maxW='80%' mx="auto">
              <Flex flexDirection="column" alignItems="center" justifyContent="center">
                <Text fontSize={['lg', '3xl', '5xl']} fontWeight="bold" fontFamily="Inter, sans-serif" mt={2} mb={6} textAlign="center">
                  Tu carrito está <Box as="span" color="#da4352" className="highlight">vacío!</Box>
                </Text>
                <Text fontSize={['xs','sd','md', 'lg']} mb={2}>Añade items al carrito antes de proceder al checkout.</Text>
                <Link to="/" className="shop-button" >Volver al shop</Link>
              </Flex>
            </Box>
          </Flex>
        )}

      </div>
    );
  }
};

export default Carrito;
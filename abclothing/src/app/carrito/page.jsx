"use client";

import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../components/context/shop-context";
import { ItemCarrito } from "./itemCarrito";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoadingSpinner from "@/app/components/loadingSpinner/LoadingSpinner";
import {Image, Flex, Box, Text, Divider } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { CardPayment } from '@mercadopago/sdk-react';
import { MERCADOPAGO_API_ENDPOINT } from '../ApiConstants';
import { showFailureMessage } from "../components/alerts/alerts";
import "./carrito.css";

export const Carrito = () => {
  const { productosCarrito, getTotalCarrito, checkout } = useContext(ShopContext);
  const router = useRouter();

  const [totalCarrito, setTotalCarrito] = useState(0);
  const [totalCarritoLoading, setTotalCarritoLoading] = useState(true);
  const [showCardPayment, setShowCardPayment] = useState(false);
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();


  useEffect(() => {
    const fetchTotalCarrito = () => {
      setTotalCarritoLoading(true);
      const total = getTotalCarrito();
      setTotalCarrito(total);
      setTotalCarritoLoading(false);
    };
    fetchTotalCarrito();
  }, [productosCarrito, getTotalCarrito]);

  
  const initialization = {
    amount: totalCarrito,
  };

  const closePopup = () => {
    setShowCardPayment(false);
  };

  const onSubmit = async (formData) => { 
    const accessToken = await getAccessTokenSilently();
    return new Promise((resolve, reject) => {
      fetch(MERCADOPAGO_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(async (response) => {
          resolve();
          const mercadoPagoPaymentId = response.id
          const paymentStatus = response.status
          if (paymentStatus == "approved" ){
            await checkout(accessToken, mercadoPagoPaymentId);
          }
          else {
            showFailureMessage('El pago fue rechazado');
          }
        })
        .catch((error) => {
          reject();
        })
        .finally(() =>{
          setShowCardPayment(false);
        })
    });
  };

  const onError = async (error) => {
    console.log(error);
  };

  const onReady = async () => {

  };

  const checkoutButtonOnClick = () => {
    if (isAuthenticated){
      try {
        setShowCardPayment(true);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      loginWithRedirect();
    }
    
  };

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
            <div className="carrito-container">
              <Text fontSize={["2xl", "3xl", "4xl"]} className='title'>Prendas en el carrito</Text>
            </div>
            <Divider className='title-divider' />
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
              <button onClick={() => router.push("/")}>Seguir comprando</button>
              <button onClick={() => checkoutButtonOnClick()}>Checkout</button>
            </div>
            {showCardPayment && (
              <div className="popup-overlay" onClick={closePopup}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <CardPayment
                    initialization={initialization}
                    onSubmit={onSubmit}
                    onReady={onReady}
                    onError={onError}
                  />
                </div>
              </div>
            )}
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
                <Link href="/" className="shop-button" >Volver al shop</Link>
              </Flex>
            </Box>
          </Flex>
        )}

      </div>
    );
  }
};


const formatTotalCarrito = (totalCarrito) => {
  return totalCarrito.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const parteEnteraDe = (totalCarrito) => {
  return Math.floor(totalCarrito).toLocaleString();
};

export default Carrito;
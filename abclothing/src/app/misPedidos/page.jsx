"use client";

import React, { useEffect, useState } from "react";
import { PEDIDOS } from "../components/pedidos/PedidosFetch";
import { Box, Heading, Text, Divider } from "@chakra-ui/react";
import { Pedido } from "../components/pedidos/Pedido";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import "../shop/shop.css";
import { redirectIfNotAuthenticated } from "../components/login/authenticationHelper";

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const router = useRouter();
  
  redirectIfNotAuthenticated(isAuthenticated, router);
  if (!isAuthenticated) return;

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const accessToken = await getAccessTokenSilently();
        const response = await PEDIDOS(accessToken);
        setPedidos(response.data);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  return (
    <Box className="shop" p={4}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box className="shopContent">
          <Box className="shopTitle" mb={4}>
          <Heading as="h1" size={["lg", "xl"]}>
              Mis pedidos
            </Heading>
          </Box>
          <Divider/>
          <Box className="pedidos">
            {Object.values(pedidos).length === 0 ? (
              <Text fontSize={["md", "lg"]} marginTop={4}>
                No se encontraron pedidos.
              </Text>
            ) : (
              Object.values(pedidos).map((pedido) => (
                <Pedido data={pedido} key={pedido.id} />
              ))
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MisPedidos;
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PEDIDOS } from "../../components/pedidos/PedidosFetch";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Pedido } from "../../components/pedidos/Pedido";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

export const MisPedidos = () => {
  const [pedidos, setPedidos] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();
  
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
            <Heading as="h1" size="xl">
              Mis pedidos
            </Heading>
          </Box>
          <Box className="pedidos">
            {Object.values(pedidos).length === 0 ? (
              <Text fontSize="xl">
                No se encontraron pedidos asociados al cliente o el email era incorrecto.
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
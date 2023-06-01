import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PEDIDOS } from "../../components/pedidos/Pedidos";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Pedido } from "../../components/pedidos/Pedido";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

export const MisPedidos = () => {
  const { email } = useContext(ShopContext);
  const [pedidos, setPedidos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const response = await PEDIDOS(email);
        setPedidos(response.data);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchPedidos();
    }
  }, [email]);


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
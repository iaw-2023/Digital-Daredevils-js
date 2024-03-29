"use client";

import React from "react";
import Link from 'next/link';
import { Box, Text } from "@chakra-ui/react";

export const Pedido = (props) => {
  const { id, email, fecha } = props.data;

  return (
    <Box className="pedido" p={4} borderWidth={1} borderRadius="md" mb={4}>
      <Link href={`/detallesPedido/${id}`} className="product-link">
        <Box className="description">
          <Text fontWeight="bold">{id}</Text>
          <Text fontWeight="bold">{email}</Text>
          <Text>
            <b>Fecha:</b> {fecha}
          </Text>
        </Box>
      </Link>
    </Box>
  );
};
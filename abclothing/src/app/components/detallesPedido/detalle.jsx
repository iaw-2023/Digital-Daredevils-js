"use client";

import React from "react";
import { Tr, Td } from "@chakra-ui/react";

export const Detalle = (props) => {
    const { modelo, marca, talle, precio, cantidad } = props.data;
    const subtotal = cantidad * precio;
  
    return (
      <Tr>
        <Td>{modelo}</Td>
        <Td>{marca}</Td>
        <Td>{talle}</Td>
        <Td>{cantidad}</Td>
        <Td>${precio}</Td>
        <Td>${subtotal}</Td>
      </Tr>
    );
};
"use client";

import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Divider } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { DETALLESPEDIDO } from "./Pedidos";
import "./detallesPedidoView.css";

const Detalle = (props) => {
    const { modelo, marca, talle, precio, cantidad } = props.data;
    const subtotal = cantidad * precio;
  
    return (
      <Tr>
        <Td>{modelo}</Td>
        <Td>{marca}</Td>
        <Td>{talle}</Td>
        <Td>{cantidad}</Td>
        <Td>{precio}</Td>
        <Td>{subtotal}</Td>
      </Tr>
    );
};

export const DetallesPedido = () => {
    const { id } = useParams();
    const [detallesPedido, setDetallesPedido] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetallesPedido = async () => {
        try {
            setLoading(true);
            const response = await DETALLESPEDIDO(id);
            setDetallesPedido(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
        };

        fetchDetallesPedido();
    }, [id]);


    let total = 0;
    if (!loading){
        Object.values(detallesPedido).forEach((detallePedido) => {
            total += detallePedido.precio * detallePedido.cantidad;
        });
    }

    return (
        <div className="shop">
        
        {loading ? (
            <div className="loading-shop">Loading detallesPedido...</div>
        ) : (
            <div className="shopContent">
                <div className="shopTitle">
                    <h1>Mis pedidos</h1>
                </div>
                <Divider my={4} />
                <Table variant="striped" colorScheme="teal" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Modelo</Th>
                            <Th>Marca</Th>
                            <Th>Talle</Th>
                            <Th>Cantidad</Th>
                            <Th>Precio</Th>
                            <Th>Subtotal</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Object.values(detallesPedido).length === 0 ? (
                            <Tr>
                                <Td colSpan="6">No se encontró un detalle para ese pedido.</Td>
                            </Tr>
                        ) : (
                        Object.values(detallesPedido).map((detallePedido) => (
                            <Detalle data={detallePedido} key={detallePedido.id} />
                        ))
                        )}
                    </Tbody>
                </Table>
                <p style={{ marginTop: "20px" }}>
                    <b>Total:</b> {total}
                </p>       
            </div>
        )}
        </div>
    );
};
"use client";

import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Divider, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import DetallesPedidoList from "../../components/detallesPedido/DetallesPedidoList";
import { DETALLESPEDIDO } from "../../components/pedidos/PedidosFetch";
import "./detallesPedidoView.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

export const DetallesPedido = () => {
    const { id } = useParams();
    const { getAccessTokenSilently, user } = useAuth0();
    const [detallesPedido, setDetallesPedido] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetallesPedido = async () => {
            try {
                setLoading(true);
                const accessToken = await getAccessTokenSilently();
                const response = await DETALLESPEDIDO(accessToken, id);
                setDetallesPedido(response);
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);    
            }
        };

        fetchDetallesPedido();
    }, [id]);

    let total = 0;
    if (!loading){
        Object.values(detallesPedido).forEach((detallePedido) => {
            total += detallePedido.precio * detallePedido.cantidad;
        });
        total = total.toFixed(2);
    }

    return (
        <div className="shop">
            {loading ? (
                <LoadingSpinner/>
            ) : (
                <div className="shopContent">
                    <div className="shopTitle">
                        <h1>Pedido #{id}</h1>
                    </div>
                    <Divider my={4} />
                        <Table variant="striped" colorScheme="orange" size="sm">
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
                                <DetallesPedidoList detallesPedido={detallesPedido} />
                            </Tbody>
                        </Table>
                    <p style={{ marginTop: "20px" }}>
                        <b>Total:</b> ${total}
                    </p>       
                </div>
            )}
        </div>
    );
};
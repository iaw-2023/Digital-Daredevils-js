"use client";

import { PEDIDOS_API_ENDPOINT, DETALLES_PEDIDO_API_ENDPOINT } from '../../ApiConstants';

export async function GENERARPEDIDO(pedidoRequest) {
    try {
      const response = await fetch(PEDIDOS_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoRequest),
      });
  
      if (response.ok) {
        const pedidoResponse = await response.json();
        return pedidoResponse;
      } else {
        throw new Error("Error creating pedido: " + response.status);
      }
    } catch (error) {
      throw new Error("Error creating pedido: " + error.message);
    }
  }

  export async function PEDIDOS(email) {
    const response = await fetch(PEDIDOS_API_ENDPOINT + "/" + email, {
      method: "GET",
    });
    return response.json();
  }

  export async function DETALLESPEDIDO(pedido_id) {
    const response = await fetch(DETALLES_PEDIDO_API_ENDPOINT + "/" + pedido_id);
    return response.json();
  }
  
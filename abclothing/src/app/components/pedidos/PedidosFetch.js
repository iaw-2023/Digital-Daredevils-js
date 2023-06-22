"use client";

import { PEDIDOS_API_ENDPOINT, DETALLES_PEDIDO_API_ENDPOINT } from '../../ApiConstants';

export async function GENERARPEDIDO(accessToken, pedidoRequest) {
    try {
      const response = await fetch(PEDIDOS_API_ENDPOINT, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
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

  export async function PEDIDOS(accessToken, email) {
    const response = await fetch(PEDIDOS_API_ENDPOINT + "/" + email, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  export async function DETALLESPEDIDO(accessToken, pedido_id) {
    const response = await fetch(DETALLES_PEDIDO_API_ENDPOINT + "/" + pedido_id, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  
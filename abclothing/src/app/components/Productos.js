"use client";

import { PRODUCTOS_API_ENDPOINT } from '../ApiConstants';

export async function LISTAPRODUCTOS() {
  const response = await fetch(PRODUCTOS_API_ENDPOINT);
  return response.json();
}

export async function PRODUCTOBYID(id) {
  const response = await fetch(PRODUCTOS_API_ENDPOINT + "/" + id);
  return response.json();
}
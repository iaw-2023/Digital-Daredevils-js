"use client";

import { PRODUCTOS_API_ENDPOINT } from '../ApiConstants';

export async function LISTAPRODUCTOS(page) {
  const response = await fetch(PRODUCTOS_API_ENDPOINT + "?page=" + page);
  return response.json();
}

export async function PRODUCTOBYID(id) {
  const response = await fetch(PRODUCTOS_API_ENDPOINT + "/" + id);
  return response.json();
}
"use client";

import { PRODUCTOS_API_ENDPOINT, PRODUCTOSQUERY_API_ENDPOINT } from '../../ApiConstants';

export async function LISTAPRODUCTOS(page) {
  const response = await fetch(PRODUCTOS_API_ENDPOINT + "?page=" + page);
  return response.json();
}

export async function PRODUCTOBYID(id) {
  const response = await fetch(PRODUCTOS_API_ENDPOINT + "/" + id);
  return response.json();
}

export async function PRODUCTOSBYQUERY(query, page) {
  const response = await fetch(PRODUCTOSQUERY_API_ENDPOINT + "/" + query + "?page=" + page);
  return response.json();
}
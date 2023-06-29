"use client";

import { CATEGORIAS_API_ENDPOINT } from '../ApiConstants';

export async function CATEGORIAS() {
  const response = await fetch(CATEGORIAS_API_ENDPOINT);
  return response.json();
}

export async function PRODUCTOSBYCATEGORIA(idCategoria, page) {
  const response = await fetch(CATEGORIAS_API_ENDPOINT + idCategoria + "/productos" + "?page=" + page);
  return response.json();
}
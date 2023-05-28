"use client";

import { CATEGORIAS_API_ENDPOINT } from '../../ApiConstants';

export async function CATEGORIAS() {
  const response = await fetch(CATEGORIAS_API_ENDPOINT);
  return response.json();
}
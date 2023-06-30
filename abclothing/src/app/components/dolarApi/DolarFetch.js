"use client";

import { DOLAR_API_ENDPOINT } from '../../ApiConstants';

export async function FETCH_DOLAR_API() {
  const response = await fetch(DOLAR_API_ENDPOINT);
  return response.json();
}
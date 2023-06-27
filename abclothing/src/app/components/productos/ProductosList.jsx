"use client";

import React from "react";
import { Producto } from "./producto";

const ProductosList = ({ productos }) => {
  if (Object.values(productos).length === 0) {
    return <h1>No se encontraron productos para su búsqueda.</h1>;
  }
  return Object.values(productos).map((product) => (
    <Producto data={product} key={product.id} />
  ));
};

export default ProductosList;

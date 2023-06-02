import React from "react";
import { Categoria } from "./Categoria";

const CategoriasList = ({ categorias }) => {
  if (Object.values(categorias).length === 0) {
    return <h1>No se encontraron categorías.</h1>;
  }
  return Object.values(categorias).map((categoria) => (
    <Categoria data={categoria} key={categoria.id} />
  ));
};

export default CategoriasList;

"use client";

import { Link } from "react-router-dom";
import "./Categoria.css"

export const Categoria = (props) => {
  const { id, nombre} = props.data;

  return (
    <div className="hoverlist" key={id}>
      <ul>
        <Link to={`/categorias/${id}`}>
          <p className="category-heading">{nombre}</p>
        </Link>
      </ul>
    </div> 
  );
};
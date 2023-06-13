"use client";

import { Link } from "react-router-dom";
import "./Categoria.css"

export const Categoria = (props) => {
  const { id, nombre } = props.data;

  return (
    <div className="hoverlist" key={id}>
      <ul>
        <li>
          <Link to={`/categorias/${id}/${nombre}`}>
            <p className="category-heading">{nombre}</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
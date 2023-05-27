"use client";
import { Link } from "react-router-dom";


export const Categoria = (props) => {
  const { id,nombre} = props.data;

  return (
    <div className="categorias">
      <Link to={`/categorias/${id}`} className="category-link">
        <div className="description">
          <p>
            <b>{nombre}</b>
          </p>
        </div>
      </Link>
    </div>
  );
};
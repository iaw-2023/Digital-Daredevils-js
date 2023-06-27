"use client";

import Link from 'next/link';
import "./Categoria.css"

export const Categoria = (props) => {
  const { id, nombre } = props.data;

  return (
    <div className="hoverlist" key={id}>
      <ul>
        <li>
          <Link href={`/categorias/${id}/${nombre}`}>
            <p className="category-heading">{nombre}</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
"use client";

import React from "react";
import { Link } from "react-router-dom";

export const Pedido = (props) => {
  const { id, email, fecha } = props.data;

  return (
    <div className="pedido">
      <Link to={`/detallesPedido/${id}`} className="product-link">
        <div className="description">
          <p>
            <b>{id}</b>
            <b>{email}</b>
          </p>
          <p>
            <b>Fecha:</b> {fecha}
          </p>
        </div>
      </Link>
    </div>
  );
};
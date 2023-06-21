"use client";

import React from "react";
import { Detalle } from "./detalle";

const DetallesPedidoList = ({ detallesPedido }) => {
  return Object.values(detallesPedido).map((detalle) => (
    <Detalle data={detalle} key={detalle.id} />
  ));
};

export default DetallesPedidoList;

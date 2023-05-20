import React from "react";
import { LISTAPRODUCTOS } from '../../components/Productos';
import { Producto } from './producto';
import "./shop.css";

export const Shop = () => {
  const { loading, productos } = LISTAPRODUCTOS();

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>AB Clothing Store</h1>
      </div>

      <div className="productos">
        {loading ? (
          <p>Loading...</p>
        ) : (
          Object.values(productos).map((product) => (
            <Producto data={product} key={product.id} />
          ))
        )}
      </div>
    </div>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import ProductosList from "../../../components/productos/ProductosList";
import { PRODUCTOSBYCATEGORIA } from "../../CategoriasFetch";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { renderPageLinks } from "@/app/components/pagination/pagination";
import "../../../shop/shop.css";

const ShopCategoria = ({ params }) => {
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
 
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await PRODUCTOSBYCATEGORIA(params.id);
        setProductos(response.data);
        setLastPage(response.last_page);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [currentPage, params.id]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="shop">
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <div className="shopContent">
          <div className="shopTitle">
            <h1>{params.nombre}</h1>
          </div>
          <div className="productos">
            <ProductosList productos={productos} />
          </div>
          <div className="pageLinks">{renderPageLinks(currentPage, lastPage, handlePageClick)}</div>
        </div>
      )}
    </div>
  );
};

export default ShopCategoria;
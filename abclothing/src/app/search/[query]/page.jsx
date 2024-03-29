"use client";

import React, { useEffect, useState } from "react";
import { PRODUCTOSBYQUERY } from "../../components/productos/ProductosFetch";
import ProductosList from "../../components/productos/ProductosList";
import { renderPageLinks } from "@/app/components/pagination/pagination";
import LoadingSpinner from "@/app/components/loadingSpinner/LoadingSpinner";
import "../../components/shop/shop.css";

const ShopSearch = ( {params} ) => {
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const searchQuery = params.query;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await PRODUCTOSBYQUERY(searchQuery, currentPage);
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
  }, [currentPage, searchQuery]);

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
            <h1>Resultados para &apos;{decodeURI(searchQuery)}&apos;</h1>
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

export default ShopSearch;
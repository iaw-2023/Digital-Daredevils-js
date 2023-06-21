"use client";

import React, { useEffect, useState } from "react";
import { PRODUCTOSBYQUERY } from "../components/productos/ProductosFetch";
import ProductosList from "../components/productos/ProductosList";
import { useLocation } from "react-router-dom";
import { renderPageLinks } from "@/app/components/pagination/pagination";
import LoadingSpinner from "@/app/components/loadingSpinner/LoadingSpinner";
import "./shop.css";

export const ShopSearch = () => {
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await PRODUCTOSBYQUERY(searchQuery);
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
            <h1>Resultados para &apos;{searchQuery}&apos;</h1>
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
"use client";

import React, { useEffect, useState } from "react";
import { PRODUCTOSBYQUERY } from "../../components/Productos";
import { Producto } from "./producto";
import { useLocation } from "react-router-dom";
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchProductos();
  }, [currentPage, searchQuery]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    const pageRange = 2; // Number of pages to show before and after the current page
    const totalPages = lastPage;
  
    // Calculate the starting and ending page numbers to display
    let startPage = Math.max(currentPage - pageRange, 1);
    let endPage = Math.min(currentPage + pageRange, totalPages);
  
    // Add First Page link
    if (startPage > 1) {
      pageLinks.push(
        <a key={1} href="#" onClick={() => handlePageClick(1)}>
          1
        </a>
      );
      if (startPage > 2) {
        pageLinks.push(<span key="ellipsis-start">... </span>);
      }
    }
  
    // Add page links before the current page
    for (let i = startPage; i < currentPage; i++) {
      pageLinks.push(
        <a key={i} href="#" onClick={() => handlePageClick(i)}>
          {i}
        </a>
      );
    }
  
    // Add current page link
    pageLinks.push(
      <a key={currentPage} href="#" onClick={() => handlePageClick(currentPage)} className="active">
        {currentPage}
      </a>
    );
  
    // Add page links after the current page
    for (let i = currentPage + 1; i <= endPage; i++) {
      pageLinks.push(
        <a key={i} href="#" onClick={() => handlePageClick(i)}>
          {i}
        </a>
      );
    }
  
    // Add Last Page link
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageLinks.push(<span key="ellipsis-end">...</span>);
      }
      pageLinks.push(
        <a key={totalPages} href="#" onClick={() => handlePageClick(totalPages)}>
          {totalPages}
        </a>
      );
    }
  
    return pageLinks;
  };
  

  return (
    <div className="shop">
      
      {loading ? (
        <div className="loading-shop">Loading...</div>
      ) : (
        <div className="shopContent">
          <div className="shopTitle">
            <h1>Resultados para '{searchQuery}'</h1>
          </div>
          <div className="productos">
            {Object.values(productos).length === 0 ? (
              <h1>No se encontraron productos para su búsqueda.</h1>
            ) : (
              Object.values(productos).map((product) => (
                <Producto data={product} key={product.id} />
              ))
            )}
          </div>
        </div>
      )}
      <div className="pageLinks">{renderPageLinks()}</div>
    </div>
  );
};

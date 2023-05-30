"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Producto } from "../../pages/shop/producto";
import { PRODUCTOSBYCATEGORIA } from "./Categorias";
import "../../pages/shop/shop.css";

export const CategoriaProductos = () => {
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  
  const { id, nombre } = useParams();
 
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await(PRODUCTOSBYCATEGORIA(id));
        setProductos(response.data);
        setLastPage(response.last_page);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchProductos();
  }, [currentPage, id]);

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
            <h1>{nombre}</h1>
          </div>
          <div className="productos">
            {Object.values(productos).length === 0 ? (
              <h1>No se encontraron productos para esta categoría.</h1>
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

"use client";

import React, { useEffect, useState } from "react";
import { LISTAPRODUCTOS } from "../../components/productos/Productos";
import { Producto } from "./producto";
import HomeSlider from "../../components/homeSlider/HomeSlider";
import "./shop.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Progress,
  Text,
} from "@chakra-ui/react";
import LoadingSpinner from "@/app/components/loadingSpinner/LoadingSpinner";

export const Shop = () => {
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await LISTAPRODUCTOS(currentPage);
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
  }, [currentPage]);

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
        <LoadingSpinner/>
      ) : (
        <Box bgColor={"#fdfdfd"}>
          <Box>
            <Progress
              colorScheme="blue"
              hasStripe
              height="42px"
              value={100}
              isAnimated
            />
            <Text
              color={"white"}
              fontSize={{ base: "80%", sm: "100%", lg: "100%" }}
              position="absolute"
              top={{ base: "117px", sm: "145px", md: "145px", lg: "90px" }}
              left={{ base: "5%", sm: "20%", md: "30%", lg: "40%" }}
            >
               New arrivals la semana entrante con 30% off ❤️
            </Text>
          </Box>
          <div className="sliderContainer">
            <HomeSlider />
          </div>
          <div className="shopContent">
            <div className="shopTitle">
              <h1>Highlights</h1>
            </div>
            <div className="productos">
              {Object.values(productos).map((product) => (
                <Producto data={product} key={product.id} />
              ))}
            </div>
          </div>
          <div className="pageLinks">{renderPageLinks()}</div>
        </Box>
      )}
    </div>
  );
};

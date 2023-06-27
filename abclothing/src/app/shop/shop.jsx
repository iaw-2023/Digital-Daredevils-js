"use client";

import React, { useEffect, useState } from "react";
import { LISTAPRODUCTOS } from "../components/productos/ProductosFetch";
import HomeSlider from "../components/homeSlider/HomeSlider";
import ProductosList from "../components/productos/ProductosList";
import "./shop.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Progress,
  Text,
} from "@chakra-ui/react";
import LoadingSpinner from "@/app/components/loadingSpinner/LoadingSpinner";
import { renderPageLinks } from "@/app/components/pagination/pagination";
import "./shop.css";

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
              top={{ base: "147px", sm: "145px", md: "145px", lg: "90px" }}
              left={{ base: "10%", sm: "20%", md: "30%", lg: "40%" }}
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
              <ProductosList productos={productos} />
            </div>
          </div>
          <div className="pageLinks">{renderPageLinks(currentPage, lastPage, handlePageClick)}</div>
        </Box>
      )}
    </div>
  );
};
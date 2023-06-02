import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CATEGORIAS } from "../categorias/Categorias";
import { Categoria } from "../categorias/Categoria";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import "./Menu.css"

const HomeMenu = () => {
  const [categorias, setCategorias] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const response = await CATEGORIAS();
        setCategorias(response.data);
      } catch (error) {
        console.log("Error fetching categorias:", error);
      }
      finally {
          setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading){
    <LoadingSpinner/>
  }
  else{
    return (
      <Flex
        height={{ base: "3.2rem", md: "4.94rem" }}
        minW={"100%"}
        justify={"space-around"}
        pos="relative"
        align="center"
        display={{ base: "none", lg: "Flex" }}
        width="36%"
        gap={5}
      >   
        <Flex
          height="100%"
          align={"center"}
          width="15%"
          _hover={{ color: "#0099ff" }}
          fontSize="xl"
        >
          <Link to="/contacto">Contacto</Link>
        </Flex>
        
        <Flex
            className="dropDown"
            height="100%"
            align={"center"}
            width="15%"
            _hover={{ color: "#0099ff" }}
            fontSize="xl"
        >
          <Text>Categorias</Text>
          <Box
            top="4rem"
            className="drop-down-content"
            overflow="hidden"
            bg="white"
            pos={"absolute"}
            width="1000px"
            transition={"all 0.3s"}
            height={"0vh"}
            marginTop="14px"
          >   
            <div className="main-menu">
              {Object.values(categorias).map((categoria) => (
                <Categoria data={categoria} key={categoria.id} />
              ))}
            </div>
          </Box>
        </Flex>
      </Flex>
    );  
  }
};

export default HomeMenu;
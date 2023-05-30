import { Box, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CATEGORIAS } from "./Categorias/Categorias";
import { Categoria } from "./Categorias/Categoria";
import "./HomeMenu.css"

const HomeMenu = () => {
    const [categorias, setCategorias] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCategorias = async () => {
        try {
          setLoading(true);
          const response = await CATEGORIAS();
          setCategorias(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log("Error fetching categorias:", error);
        }
      };
  
      fetchCategorias();
    }, []);

    if (loading){
        <h1>Loading in HomeMenu.jsx...</h1>
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
                    <Link to="/categorias">Categorias</Link>
                    <Box
                        top="4rem"
                        className="drop-down-content"
                        left="-2rem"
                        overflow="hidden"
                        bg="white"
                        pos={"absolute"}
                        width="1000px"
                        transition={"all 0.3s"}
                        height={"0vh"}
                        marginTop="14px"
                        border= '1px solid #ccc'
                    >   
                        <Link to="#">
                            <div className="main-menu">
                                {Object.values(categorias).map((categoria) => (
                                    <Categoria data={categoria} key={categoria.id} />
                                ))}
                            </div>
                        </Link>
                    </Box>
                </Flex>
            </Flex>
        );  
    }
};

export default HomeMenu;
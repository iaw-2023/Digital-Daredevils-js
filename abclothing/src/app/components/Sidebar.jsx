"use client";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Categoria } from "./Categorias/Categoria";
import { CATEGORIAS } from "./Categorias/Categorias";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Sidebar.css";

function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <>
        <Button
          onClick={onOpen}
          colorScheme="yellow"
          size="md"
          _hover={{ bg: "pink" }}
        >
          <GiHamburgerMenu size={"18px"} />
        </Button>
  
        <Drawer onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color={"pink.600"} fontSize="3xl" />
            <DrawerHeader width="28%">
              <Image src="/abLogo.png" />
            </DrawerHeader>
            <DrawerBody>
              <DrawerCloseButton />
              <Box p="1rem">
                <Image
                  src="/abLogo.png"
                  alt="logo"
                  width="12rem"
                  margin="auto"
                  height={{ base: "3rem", md: "100%" }}
                />
              </Box>
  
              <Flex
                justify="center"
                pl="1rem"
                gap="5"
                flexDir={"column"}
                mx="2rem"
                mt="2rem"
              >
                <Link to="/">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease",
                    }}
                  >
                    Home
                  </Text>
                </Link>
                <Link to="#">
                  <div classname ="categoria">
                    {Object.values(categorias).map((categoria) => (
                        <Categoria data={categoria} key={categoria.id} />
                    ))}
                  </div>
                </Link>
                <Link to="/carrito">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease",
                    }}
                  >
                    Your Cart
                  </Text>
                </Link>
                <Link to="#">
                  <Text
                    textAlign={"center"}
                    fontSize={"1.5rem"}
                    transition="0.5s ease"
                    _hover={{
                      borderBottomWidth: "4px",
                      borderBottomColor: "#f89f17",
                      color: "pink.600",
                      fontSize: "1.7rem",
                      webkitTransform: "scale(1.04)",
                      msTransform: "scale(1.02)",
                      transform: "scale(1.02)",
                      transition: " 0.5s ease",
                    }}
                  >
                    Profile
                  </Text>
                </Link>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  
}
export default SideBar;

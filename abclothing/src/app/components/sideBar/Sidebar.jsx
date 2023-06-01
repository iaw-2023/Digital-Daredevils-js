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
  import { CATEGORIAS } from "../categorias/Categorias";
  import { GiHamburgerMenu } from "react-icons/gi";
  import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
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
        } catch (error) {
          console.log("Error fetching categorias:", error);
        }
        finally {
          setLoading(false);
        }
      };

      fetchCategorias();
    }, []);

    if (loading) {
      return <LoadingSpinner/>;
    }

    return (
      <>
        <Button onClick={onOpen} colorScheme="yellow" size="md" _hover={{ bg: "pink" }}>
          <GiHamburgerMenu size={"18px"} />
        </Button>

        <Drawer onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color={"pink.600"} fontSize="3xl" />
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

              <Flex justify="center" pl="1rem" gap="5" flexDir="column" mx="2rem" mt="2rem">
                <Link to="/" className="sidebar-categoria-link">
                  <Text textAlign="center" fontSize="1.5rem" >
                    Shop
                  </Text>
                </Link>

                <div className="sidebar-categorias">
                  {categorias &&
                    Object.values(categorias).map((categoria) => (
                      <Link
                        to={`/categorias/${categoria.id}/${categoria.nombre}`}
                        key={categoria.id}
                        className="sidebar-categoria-link"
                      >
                        <Text textAlign="center" fontSize="1.5rem">
                          {categoria.nombre}
                        </Text>
                      </Link>
                    ))}
                </div>

                <Link to="/carrito" className="sidebar-categoria-link">
                  <Text textAlign="center" fontSize="1.5rem" >
                    Carrito
                  </Text>
                </Link>

                <Link to="/misPedidos" className="sidebar-categoria-link">
                  <Text textAlign="center" fontSize="1.5rem" >
                    Mis pedidos
                  </Text>
                </Link>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  export default SideBar;
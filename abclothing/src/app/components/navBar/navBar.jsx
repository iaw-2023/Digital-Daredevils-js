"use client";

import React, { useContext } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Button,
  Flex,
  Image,
  Popover,
  Text,
  MenuGroup,
  MenuButton,
  MenuItem,
  MenuList,
  Menu, 
  Tooltip,
} from "@chakra-ui/react";
import { BsBagHeart, BsBag, BsEmojiSmile, BsPerson } from "react-icons/bs";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import HomeMenu from "../menu/Menu";
import SearchBar from "../searchBar/searchBar";
import SideBar from "../sideBar/Sidebar";
import { ShopContext } from "../context/shop-context";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react";
import "./navBar.css";

export const Navbar = () => {
  const router = useRouter(); 
  const { productosCarrito, dolarBlue } = useContext(ShopContext);
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const handleMisPedidosAttempt = () =>{
    router.push("/misPedidos");
  }

  const handleLogoutAttempt = () =>{
    logout({logoutParams: {returnTo:'https://digital-daredevils-js.vercel.app/'}})
  }

  const handleLoginAttempt = () =>{
    loginWithRedirect()
  }

  if (!productosCarrito){
    return <LoadingSpinner/>;
  }

  else {
    const totalCarrito = Object.values(productosCarrito).reduce((total, producto) => total + producto.amount, 0);
    return (
        <Box className="navbar-container">
          <Flex
            height="4.94rem" 
            px={{ base: "1rem", md: "3rem" }}
            justify={"space-between"}
            gap={{ base: "0.5rem", sm: "1rem", md: "2rem", lg: "2rem" }}
            align={"center"}
            width="90%"
            margin="auto"
          >
            <Box display={{ lg: "none" }}>
              <SideBar />
            </Box>
            <Link href="/">
              <Box className="logo">
                <Image
                  src="/abLogo.png"
                  alt="logo"
                  margin="auto"
                  width={{ base: "160px", md: "270px" }}
                  height={{ base: "40px", md: "70px" }}
                  maxWidth="100%"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Box>
            </Link>
            <Box  
              minWidth={"30%"}
              width="90%"
              display={{ base: "none", lg: "block" }}
            >
              <HomeMenu />
            </Box>
            
            <Box className="search-bar" display={{ base: "none", lg: "block" }}>
              <SearchBar />
            </Box>
    
            <Flex gap={{ base: "0.5rem", md: "1.5rem" }} align="center">
              <Popover>
                <Menu>
                  

                    {isAuthenticated ?
                      <>
                        <MenuButton>
                          <BsPerson fontSize={"1.3rem"} />
                        </MenuButton>
                        <MenuList>
                          <MenuGroup title="Perfil" color ="teal.500">
                            <MenuItem icon={<BsEmojiSmile size={20} />}
                              style={{ pointerEvents: "none", cursor: "default" }}
                              color="beige.400"
                            >
                              Hola, {user.name}!
                            </MenuItem>
                            <MenuItem icon={<BsBagHeart size={20} />} onClick={() => handleMisPedidosAttempt()} color="beige.400">
                              Mis pedidos
                            </MenuItem>
                            <MenuItem icon={<BiLogOut size={20} />} onClick={() => handleLogoutAttempt()} color="beige.400">
                              Logout
                            </MenuItem>
                          </MenuGroup>
                        </MenuList>
                      </>
                    : 
                    <MenuButton as={Button} 
                      leftIcon={<BiLogIn size={24} />} 
                      onClick={() => handleLoginAttempt()} 
                      colorScheme='beige' 
                      color="black.400"
                      fontSize="m"
                      transition='all 0.2s' _hover={{ bg: 'blue.400' }}
                    >
                      Log in
                    </MenuButton>
                    }
                  
                </Menu>
              </Popover>
    
              <Link href="/carrito">
                <Flex flexDir={"column"} align={"center"} pos="relative">
                  <Text>
                    <BsBag fontSize={"1.3rem"} />
                  </Text>
                  <Box className="bag-count" justify="center" align="center">
                    <Text fontSize="sm" fontWeight="medium" color="white" bg="black.400" rounded="full" ml="auto">
                      {totalCarrito}
                    </Text>
                  </Box>
                </Flex>
              </Link>
              <Box ml="1rem">
                <Tooltip label={`Cotización dólar actual $ ${dolarBlue}`} placement="bottom">
                  <Text fontSize="md" fontWeight="medium" isTruncated>
                    u$s
                  </Text>
                </Tooltip>
              </Box>
            </Flex>
          </Flex>
          <Box padding={"8px"} display={{ lg: "none" }} width="90%" margin="auto">
            <SearchBar />
          </Box>
        </Box>
      );
    };
  }
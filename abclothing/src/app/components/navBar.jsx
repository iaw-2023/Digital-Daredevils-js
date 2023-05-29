"use client";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Popover,
  Text,
  MenuGroup,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
} from "@chakra-ui/react";
import { BsBag, BsPerson } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import HomeMenu from "./HomeMenu";
import SearchBar from "./searchBar";
import SideBar from "./Sidebar";
import { ShopContext } from "../context/shop-context";
import "./navBar.css";

export const Navbar = () => {
  const { productosCarrito } = useContext(ShopContext);

  if (!productosCarrito){
    return <h1>Loading in navbar wtf...</h1>;
  }
  else {
    const totalCarrito = Object.values(productosCarrito).reduce((total, producto) => total + producto.amount, 0);
    return (
        <Box className="navbar-container">
          <Flex
            height={{ base: "3.2rem", md: "4.94rem" }}
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
            <Link to="/">
              <Box className="logo">
                <Image
                  src="/abLogo.png"
                  alt="logo"
                  margin="auto"
                  width={{ base: "90%", sm: "60%", md: "60%", lg: "100%" }}
                  height={{ base: "2rem", md: "100%" }}
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
                  <MenuButton>
                     <BsPerson fontSize={"1.3rem"} />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Profile">
                      <MenuItem color="beige.400">
                        Hey, {"UserEmailHere"}
                      </MenuItem>
                      <MenuItem>My Account</MenuItem>
                      <MenuItem>Order History</MenuItem>
                      <MenuItem>My Address</MenuItem>
                      <MenuItem>Payments</MenuItem>
                      <MenuItem>Reviews</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </Popover>
    
              <Link to="#">
                <Flex flexDir={"column"} align={"center"}>
                  <Text>
                    <AiOutlineHeart fontSize={"1.3rem"} />
                  </Text>
                </Flex>
              </Link>
    
              <Link to="/carrito">
                <Flex flexDir={"column"} align={"center"} pos="relative">
                  <Text>
                    <BsBag fontSize={"1.3rem"} />
                  </Text>
                  <Box className="bag-count" justify="center" align="center">
                    <Text>{totalCarrito}</Text>
                  </Box>
                </Flex>
              </Link>
            </Flex>
          </Flex>
          <Box padding={"8px"} display={{ lg: "none" }} width="90%" margin="auto">
            <SearchBar />
          </Box>
        </Box>
      );
    };
  }
import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  DrawerCloseButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CATEGORIAS } from "../categorias/CategoriasFetch";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBag, BsCart3 } from "react-icons/bs";
import { BiPurchaseTagAlt } from "react-icons/bi";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { ShopContext } from "../../context/shop-context";
import { showFailureMessage } from "../alerts/alerts";
import "./Sidebar.css";

function SideBar() {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categorias, setCategorias] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); 
  const { email } = useContext(ShopContext);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const response = await CATEGORIAS();
        setCategorias(response.data);
      } catch (error) {
        console.log("Error fetching categorias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);


  const handleMisPedidosAttempt = () =>{
    if (!email) {
      showFailureMessage('Se debe realizar un pedido mínimamente para acceder al historial de pedidos <3');
    }
    else{
      navigate("/misPedidos");
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="twitter" size="md" _hover={{ bg: "pink" }}>
        <GiHamburgerMenu size={"18px"} />
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton color={"black"} fontSize="2xl" _hover={{ color: "orange" }}/>
          <DrawerBody>
            <Flex justify="center" alignItems="center" p="1rem">
              <Image
                src="/abLogo.png"
                alt="logo"
                width="12rem"
                height={"100%"}
                borderRadius="md"
              />
            </Flex>
            <Divider />
            <Flex
              pl="0rem"
              gap="5"
              flexDir="column"
              mx="2rem"
              mt="2rem"
              justify="center"
              alignItems="center"
            >
              <Button
                as={Link}
                to="/"
                variant="ghost"
                textAlign="center"
                fontSize="1.5rem"
                fontWeight="normal"
                leftIcon={<BsBag />}
              >
                Shop
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={<GiHamburgerMenu />}
                  textAlign="center"
                  fontSize="1.5rem"
                  fontWeight="normal"
                  variant="ghost"
                  _hover={{ bg: "transparent" }}
                >
                  Categorias
                </MenuButton>
                <MenuList>
                  {categorias &&
                    Object.values(categorias).map((categoria) => (
                      <MenuItem key={categoria.id}>
                        <Link
                          to={`/categorias/${categoria.id}/${categoria.nombre}`}
                          className="sidebar-categoria-link"
                        >
                          {categoria.nombre}
                        </Link>
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>

              <Button
                as={Link}
                to="/carrito"
                variant="ghost"
                textAlign="center"
                fontSize="1.5rem"
                fontWeight="normal"
                leftIcon={<BsCart3 />}
              >
                Carrito
              </Button>

              <Button
                variant="ghost"
                textAlign="center"
                fontSize="1.5rem"
                fontWeight="normal"
                leftIcon={<BiPurchaseTagAlt />}
                onClick={() => handleMisPedidosAttempt()}
              >
                Mis pedidos
              </Button>
              <Divider/>
              <Flex justify="center" alignItems="center" mt="2rem">
                <p style={{ fontSize: "0.8rem" }}>Created by Digital Daredevils ®</p>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideBar;
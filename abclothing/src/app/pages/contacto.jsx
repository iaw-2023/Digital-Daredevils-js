import React from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Textarea, VStack } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contacto = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    toast.success("Gracias por su mensaje ❤️, lo contactaremos con una pronta respuesta", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "light",
    });
  };

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Heading as="h1" textAlign="center" mb={8}>
        Contactanos
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>Nombre:</FormLabel>
            <Input type="text" placeholder="Nombre" required />
          </FormControl>

          <FormControl id="email">
            <FormLabel>Email:</FormLabel>
            <Input type="email" placeholder="Correo electrónico" required />
          </FormControl>

          <FormControl id="message">
            <FormLabel>Mensaje:</FormLabel>
            <Textarea placeholder="Escribe tu mensaje aquí" rows={4} required />
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Enviar
          </Button>
        </VStack>
      </form>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
};
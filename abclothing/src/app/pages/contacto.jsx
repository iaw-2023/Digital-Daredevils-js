"use client";

import React from "react";
import styled from "styled-components";

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color:black;
  font-size: 20px;
`;


const Title = styled.h1`
  font-size: 48px;
  margin-top: 90px;
  margin-bottom: 20px;
  text-align: center;
  color:black;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #9C9C9C;
  }
`;

export const Contacto = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // implement form submission logic here
  };

  return (
    <ContactWrapper>
      <Title>Contactanos</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <Input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <Input type="email" id="email" name="email" required />
        <label htmlFor="message">Mensaje:</label>
        <TextArea id="message" name="message" required></TextArea>
        <Button type="submit">Enviar</Button>
      </Form>
    </ContactWrapper>
  );
};

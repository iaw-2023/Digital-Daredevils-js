import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';

const CATEGORIAS_API_ENDPOINT = 'https://digital-daredevils-laravel-digitaldaredevils.vercel.app/restApi/categorias/'
const ListaCategorias = () => {
    const [categorias, setCategorias] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(CATEGORIAS_API_ENDPOINT);
          
          setCategorias(response.data.data);
        } catch (error) {
          console.error('Error al obtener información del producto:', error);
        }
      };
      fetchData();
    }, []);
    return (
        <Container>
          <Row>
            {categorias.map((categoria) => (
              <Col key={categoria.id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={categoria.imagen_ruta} />
                  <Card.Body>
                    <Card.Title>{categoria.nombre}</Card.Title>
                    <Card.Text>{categoria.descripcion}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
    };
    
    export default ListaCategorias;
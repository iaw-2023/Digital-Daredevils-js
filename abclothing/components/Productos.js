import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';

const PRODUCTOS_API_ENDPOINT = 'https://digital-daredevils-laravel-digitaldaredevils.vercel.app/restApi/productos/'
const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PRODUCTOS_API_ENDPOINT);
        
        setProductos(response.data.data);
      } catch (error) {
        console.error('Error al obtener información del producto:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        {productos.map((producto) => (
          <Col key={producto.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={producto.imagen_ruta} />
              <Card.Body>
                <Card.Title>{producto.modelo}</Card.Title>
                <Card.Text>{producto.marca}</Card.Text>
                <Card.Text>Precio: {producto.precio}</Card.Text>
                <Card.Text>Talle: {producto.talle}</Card.Text>
                <Card.Text>Categoría: {producto.categoria_id}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaProductos;

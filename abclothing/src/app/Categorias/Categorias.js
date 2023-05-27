"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { CATEGORIAS_API_ENDPOINT } from '../ApiConstants';

export const LISTACATEGORIAS = () => {
    const [categorias, setCategorias ] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(CATEGORIAS_API_ENDPOINT);
          if (response.data && response.data.data) {
            setCategorias(response.data.data);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener información del producto:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return {
      loading,
      categorias
    };
  };
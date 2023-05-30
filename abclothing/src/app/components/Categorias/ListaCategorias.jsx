import React from "react";
import { CATEGORIAS } from './Categorias';
import { Categoria } from './Categoria';

export const ListaCategorias = () => {
  const { loading, categorias } = CATEGORIAS();

  return (
    <div className="lista">
    
        {loading ? (
          <div className="loading"></div>
        ) : (
          <div className="categorias">
            {Object.values(categorias).map((caract) => (
              <Categoria data={caract} key={caract.id} />
            ))}
          </div>
        )}
      </div>
    
  );
};
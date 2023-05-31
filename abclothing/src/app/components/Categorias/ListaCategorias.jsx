import React from "react";
import { CATEGORIAS } from './Categorias';
import { Categoria } from './Categoria';
import LoadingSpinner from "../LoadingSpinner";

export const ListaCategorias = () => {
  const { loading, categorias } = CATEGORIAS();

  return (
    <div className="lista">
    
        {loading ? (
          <LoadingSpinner/>
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
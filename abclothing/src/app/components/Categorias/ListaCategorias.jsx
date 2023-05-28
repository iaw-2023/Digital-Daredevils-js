import React from "react";
import { LISTACATEGORIAS } from '.Categorias';
import { Categoria } from './Categoria';

export const List = () => {
  const { loading, categorias } = LISTACATEGORIAS();

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
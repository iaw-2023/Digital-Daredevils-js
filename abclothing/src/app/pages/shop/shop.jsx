import React, { useEffect, useState } from "react";
import { LISTAPRODUCTOS } from "../../components/Productos";
import { Producto } from "./producto";
import "./shop.css";
import { PRODUCTOS_API_ENDPOINT} from "../../ApiConstants";

export const Shop = () => {
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await LISTAPRODUCTOS();
        setProductos(response.data);
        setCurrentPage(response.current_page);
        setLastPage(response.last_page);
        setNextPageUrl(response.next_page_url);
        setPrevPageUrl(response.prev_page_url);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchProductos();
  }, []);

  const renderPageLinks = () => {
    const pageLinks = [];
    for (let i = 1; i <= lastPage; i++) {
      pageLinks.push(
        <a
          key={i}
          href={`${PRODUCTOS_API_ENDPOINT}?page=${i}`}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </a>
      );
    }
    return pageLinks;
  };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>HighLights</h1>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="shopContent">
          <div className="productos">
            {Object.values(productos).map((product) => (
              <Producto data={product} key={product.id} />
            ))}
          </div>
        </div>
      )}
      <div className="pageLinks">{renderPageLinks()}</div>
    </div>
  );
};

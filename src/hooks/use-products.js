import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config";

const ProductsContext = createContext();

export function ProductsProvider(props) {
  const [products, setProducts] = useState();
  const [initialValue, setInitialValue] = useState();
  const [BestS3, setBestS3] = useState();
  const [BestS2, setBestS2] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();


  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/products`, { withCredentials: true })
      .then((response) => {
        setProducts(response.data);
        setInitialValue(response.data);
        setBestS3(
          response.data
            .sort((a, b) => {
              return b.sold - a.sold;
            })
            .slice(0, 3)
        );
        setBestS2(
          response.data
            .sort((a, b) => {
              return b.sold - a.sold;
            })
            .slice(3, 5)
        );
        setLoading(false);
      })
      .catch((err) => {
          setLoading(false);
          setError(err.message);
        console.log("this is error: ", err);
      });
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        initialValue,
        setInitialValue,
        BestS2,
        setBestS2,
        BestS3,
        setBestS3,
        loading,
        error,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

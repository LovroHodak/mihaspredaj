import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config";

const CategoriesContext = createContext();

export function CategoriesProvider(props) {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/category`, { withCredentials: true })
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
        console.log("useCategories categories load", response.data);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    /* return () => {
      cleanup
    } */
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        error,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}

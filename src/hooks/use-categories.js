import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import {API_URL} from '../config'

const CategoriesContext = createContext()

export function CategoriesProvider (props) {
  const [categories, setCategories] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  useEffect(() => {
      setLoading(true)
    axios
      .get(`${API_URL}/api/category`, { withCredentials: true })
      .then((response) => {
      setLoading(false)
      setCategories(response.data);
      console.log('useCategories categories load', response.data)
      })
      .catch((err) => {
      setLoading(false)
      setError(err.message)
      });
    /* return () => {
      cleanup
    } */
  }, [])


  return <CategoriesContext.Provider value={{
    categories,
    loading,
    error

  }}>{props.children}</CategoriesContext.Provider>
}

export function useCategories () {
    useEffect(() => console.log("Uporabljam useCategories"), [])
  return useContext(CategoriesContext)
}
import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config";


const OrdersContext = createContext();

export function OrdersProvider(props) {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();


  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/orders`, { withCredentials: true })
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        loading,
        error,
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}

import React, { useContext } from "react";
import "./Admin.css";

import {  Spinner } from "react-bootstrap";
import { useOrders } from "../hooks/use-orders";

export default function Admin() {

    const { orders, loading, error } = useOrders();

    if (loading) return <Spinner animation="grow" />;
    if (error) return <code>{error}</code>;

  return (
    <div className="admin">
      {orders.length !== 0 ? (
        <div>
          {orders
            .map((item, i) => {
              return (
                <div
                  key={i}
                  className="purchase m-1"
                  style={{ border: "2px dotted white", borderRadius: 5 }}
                >
                  <div className="text-white w-50 p-1">
                    <p className="ejg1">
                      {i + 1}. {item.name}
                    </p>
                    <p>{item.email}</p>
                    <p>{item.address}</p>
                    <p>{item.city}</p>
                  </div>
                  <div className="p-1">
                    {item.cart.map((product, i) => {
                      return (
                        <div key={i}>
                          <p className="ejg3">{product.namee} </p>
                          <p>
                            {product.nrOfItemss} x {product.pricee} €
                          </p>
                        </div>
                      );
                    })}
                    <h6>Payment method: {item.payment}</h6>
                    <p className="text-warning ejg1">Total: {item.total} €</p>
                  </div>
                </div>
              );
            })
            .reverse()}
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center text-white">
          <h1>C'mon make that first sale!</h1>
          <img
            style={{ maxWidth: 230 }}
            alt="lostImg"
            src="https://cdn.pixabay.com/photo/2014/12/21/23/57/money-576443_960_720.png"
          />
        </div>
      )}
    </div>
  );
}

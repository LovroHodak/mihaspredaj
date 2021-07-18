import React from "react";
import "./SuccessPage.css";
import { Image, Spinner } from "react-bootstrap";

import { useOrders } from "../hooks/use-orders";

export default function SuccessPage() {

  const { orders, loading, error } = useOrders();

  if (loading) return <Spinner animation="grow" />;
  if (error) return <code>{error}</code>;

  return (
    <div className="successPage">
      {orders.length > 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center text-white">
          <h1>
            Thank you {orders[orders.length - 1].name.toUpperCase()}{" "}
            for your order!
          </h1>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrA-Hjwh0PrysnRa-wKM7rY7rlSL4dT45Ivw&usqp=CAU"
            roundedCircle
          />
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center text-white">
          <h1>This is not the page you are looking for!</h1>
          <img
            style={{ maxWidth: 600 }}
            alt="lostImg"
            src="https://www.finfunmermaid.com/media/wysiwyg/fun-transition-page-graphics/ff-no-results-binoculars.svg"
          />
        </div>
      )}
    </div>
  );
}

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import { useAddDeleteFromCart } from "../hooks/use-addDeleteFromCart";

import "./UserData.css";

export default function CardComponent() {
  const promise = loadStripe(
    "pk_test_51Hj18ZKqS56uvZe83wuhJjH6JFhxzj139IXZQAFhBT3NNzhJir4vntXcjEOha7Gw4JK6QQzD2Y2BEI4CFycD3LoW00GYaFr3so"
  );

  const { cart } = useAddDeleteFromCart();

  return (
    <div className="cardComponent">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>For testing purposes use this code: </h3>
        <p>4242 4242 4242 4242 - 04 / 24 - 242 - 42424</p>
      </div>

      <Elements stripe={promise}>
        <CheckoutForm items={cart} />
      </Elements>
    </div>
  );
}

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import "./UserData.css";

export default function CardComponent() {
  const promise = loadStripe(
    "pk_test_51Hj18ZKqS56uvZe83wuhJjH6JFhxzj139IXZQAFhBT3NNzhJir4vntXcjEOha7Gw4JK6QQzD2Y2BEI4CFycD3LoW00GYaFr3so"
  );
  return (
    <div className="cardComponent">
      <Elements stripe={promise}>
        <CheckoutForm items={99} />
      </Elements>
    </div>
  );
}

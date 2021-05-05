import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { MyContext } from "../MyContext";

import "./UserData.css";

export default function CardComponent() {
  const promise = loadStripe(
    "pk_test_51Hj18ZKqS56uvZe83wuhJjH6JFhxzj139IXZQAFhBT3NNzhJir4vntXcjEOha7Gw4JK6QQzD2Y2BEI4CFycD3LoW00GYaFr3so"
  );

  const [
    sliderInfo,
    setSliderInfo,
    allProducts,
    setAllProducts,
    BS2,
    setBS2,
    BS3,
    setBS3,
    addToCart,
    deleteFromCart,
    cart,
    setCart,
    nrOfCartItems,
    setNrOfCartItems,
    total,
    setTotal,
    soldHistory,
    setSoldHistory,
    initial,
    setInitial,
  ] = useContext(MyContext);

  return (
    <div className="cardComponent">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3>For testing purposes use this code: </h3>
        <p><b className="text-success">Success:</b> 4242 4242 4242 4242 - 04 / 24 - 242 - 42424</p>
      </div>

      <Elements stripe={promise}>
        <CheckoutForm items={cart} />
      </Elements>
    </div>
  );
}

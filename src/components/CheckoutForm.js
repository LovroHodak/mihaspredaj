import React, { useState, useEffect, useContext } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

// MINE
import './CheckoutForm.css'
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../MyContext";

export default function CheckoutForm({items}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();


  // MINE
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

  let history = useHistory();

  console.log(cart)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://localhost:5000/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      axios
      .patch(`http://localhost:5000/api/products`, {
        allProducts,
        
      })
      .then((response) => {
        setAllProducts(response.data);
        console.log('afterDelivery')
      });

    axios
      .post(`http://localhost:5000/api/newOrder`, soldHistory[soldHistory.length - 1])
      .then(() => {
        axios
        .post(
          `http://localhost:5000/api/send-email`,
          soldHistory[soldHistory.length - 1],

          { withCredentials: true }
        )
        .then(() => {
          console.log("send mail");
        });
      });
      setCart([]);
      setNrOfCartItems(0);
      setInitial(allProducts);
      setBS2(
        allProducts
          .sort((a, b) => {
            return b.sold - a.sold;
          })
          .slice(3, 5)
      );
      setBS3(
        allProducts
          .sort((a, b) => {
            return b.sold - a.sold;
          })
          .slice(0, 3)
      );
  
      history.push("/successPage");
    }
  };
  return (
    <form className='stripeForm' id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
      className='buttonStripe'
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        {/* <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again. */}
      </p>
    </form>
  );
}
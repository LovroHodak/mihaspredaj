import React, { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import "./UserData.css";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function UserData() {
  let history = useHistory();

  // Context
  const [
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

  // State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [afterDelivery, setAfterDelivery] = useState(false);

  // Function
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const paymentMethod = () => {
    let cash = "Cash - after delivery";
    let CC = "Credit Card";
    if (afterDelivery === true) {
      return cash;
    } else {
      return CC;
    }
  };

  let newClient = {
    name: name,
    email: email,
    address: address,
    city: city,
    total: total,
    paymentMethod: paymentMethod(),
    cart: cart.map((item) => {
      return {
        namee: item.name,
        pricee: item.price,
        nrOfItemss: item.nrOfItems,
      };
    }),
  };

  const payAfterDelivery = () => {
    // set State
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

    // update DB
    Promise.all([
      axios
        .patch(`${API_URL}/api/products`, {
          allProducts,
        })
        .then((response) => {
          setAllProducts(response.data);
          console.log("afterDelivery");
        }),

      axios.post(`${API_URL}/api/newOrder`, newClient).then(() => {
        axios
          .post(
            `${API_URL}/api/send-email`,
            newClient,

            { withCredentials: true }
          )
          .then(() => {
            console.log("send mail");
          })
          .catch((error) => console.log("Mail sent but error: ", error));
      }),
    ]).then(() => {
      console.log("IMPLEMENTED promise.all");
    });
  };

  const buyIt = (e) => {
    e.preventDefault();

    setSoldHistory((prevClients) => [...prevClients, newClient]);

    setEmail("");
    setName("");
    setAddress("");
    setCity("");

    // IF YOU PICK PAY AT DELIVERY
    if (afterDelivery === true) {
      payAfterDelivery();
    } else {
      console.log("withCard");
      history.push("/cardComponent");
    }
  };

  return (
    <div className="userData">
      <Form onSubmit={buyIt} className="p-1">
        <Form.Group controlId="formBasicName" className="p-1">
          <Form.Control
            onChange={updateName}
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="p-1">
          <Form.Control
            onChange={updateEmail}
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicName" className="p-1">
          <Form.Control
            onChange={updateAddress}
            type="text"
            name="address"
            value={address}
            placeholder="Enter address"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="p-1">
          <Form.Control
            onChange={updateCity}
            type="text"
            name="city"
            value={city}
            placeholder="Enter city"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox" className="p-1">
          <Form.Check
            type="radio"
            class="form-check-input"
            id="validationFormCheck2"
            name="radio-stacked"
            required
            label="Placilo po povzetju"
            onClick={() => setAfterDelivery(true)}
          />
          <Form.Check
            type="radio"
            class="form-check-input"
            id="validationFormCheck3"
            name="radio-stacked"
            required
            label="Placilo z kartico"
            onClick={() => setAfterDelivery(false)}
          />
        </Form.Group>
        <Button variant="success m-1" type="submit" style={{ width: 150 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

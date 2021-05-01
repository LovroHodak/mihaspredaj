import React, { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import "./UserData.css";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function UserData() {
  let history = useHistory();

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

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const updateEmail = (e) => {
    if (e.target.value === ''){
    }
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

  const buyIt = (e) => {
    e.preventDefault();

    setSoldHistory((prevClients) => [
      ...prevClients,
      {
        name: name,
        email: email,
        address: address,
        city: city,
        total: total,
        cart: cart/* .map((item) => {
          return `Item: ${item.name}, nrOfItems: ${item.stock}, price: ${item.price}€ `;
        }), */
      },
    ]);

    setEmail("");
    setName("");
    setAddress("");
    setCity("");
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

    console.log("i work");
  };

  return (
    <div className="userData">
      <Form onSubmit={buyIt} className='p-1'>
        <Form.Group controlId="formBasicName" className='p-1'>
          <Form.Control
            onChange={updateName}
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail"  className='p-1'>
          <Form.Control
            onChange={updateEmail}
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicName"  className='p-1'>
          <Form.Control
            onChange={updateAddress}
            type="text"
            name="address"
            value={address}
            placeholder="Enter address"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail"  className='p-1'>
          <Form.Control
            onChange={updateCity}
            type="text"
            name="city"
            value={city}
            placeholder="Enter city"
            required
          />
        </Form.Group>
        <Form.Group  controlId="formBasicCheckbox"  className='p-1'>
          <Form.Check required   type="checkbox" label="Placilo po povzetju"  />
          <Form.Check  disabled type="checkbox" label="Placilo z kartico" />
        </Form.Group>
        <Button variant="success m-1" type="submit" style={{width: 150}}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

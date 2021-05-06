import React, { useContext } from "react";
import "./Cart.css";
import { MyContext } from "../MyContext";
import { Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cart() {
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
    <div className="cart pt-2 pb-1">
      {cart.length === 0 ? (
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-white">Your cart is empty..</h1>
          <img
            className="emptyCartImg"
            alt="emptyCart"
            src="https://www.finfunmermaid.com/static/version1615882237/frontend/bsp/bartleby/en_US/images/icons/ff-sad-empty-cart.svg"
          />
        </div>
      ) : (
        <div>
          {cart.map((item, i) => {
            return (
              <div
                key={i}
                className="d-flex 
                align-items-center 
                m-1 p-1 border 
                border-white rounded
                cartItem"
              >
                <img
                  src={item.fotoImg[0].lnk}
                  alt={item.name}
                  className="rounded cartItemImg"
                />
                <h1 className="text-center text-white cartItemName">
                  <Link to={`/detail/${item._id}`} className="text-white">
                    {item.name}
                  </Link>
                </h1>
                <h2 className="text-center text-black cartItemPrice">
                  {item.nrOfItems} x {item.price} €
                </h2>
                <div className="cartItemBtns">
                  {allProducts.map((product, i) => {
                    if (item._id === product._id && product.stock > 0) {
                      return (
                        <Button
                          className="cartBtn"
                          variant="success m-1"
                          key={i}
                          onClick={() => addToCart(item._id)}
                        >
                          Add
                        </Button>
                      );
                    }
                  })}

                  <Button
                    className="cartBtn"
                    variant="danger m-1"
                    onClick={() => deleteFromCart(item._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
          <Jumbotron>
            <h1 className="text-center d-flex flex-column align-items-center">
              Total:{" "}
              <span style={{ display: "flex", color: "red" }}> {total} €</span>
            </h1>
            <p className="text-center">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p className="text-center">
              <Button as={Link} to="/userData" variant="primary">
                Confirm
              </Button>
            </p>
          </Jumbotron>
        </div>
      )}
    </div>
  );
}

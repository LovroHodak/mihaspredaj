import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const MyContext = createContext();

export const MyProvider = (props) => {
  const [sliderInfo, setSliderInfo] = useState([]);

  const [allProducts, setAllProducts] = useState([]);
  const [initial, setInitial] = useState([]);
  const [cart, setCart] = useState([]);

  const [BS2, setBS2] = useState([]);
  const [BS3, setBS3] = useState([]);

  const [nrOfCartItems, setNrOfCartItems] = useState(0);
  const [total, setTotal] = useState(0);

  const [soldHistory, setSoldHistory] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category", { withCredentials: true })
      .then((response) => {
        setSliderInfo(response.data);
      })
      .catch((err) => {
        console.log("this is error: ", err);
      });

    axios
      .get("http://localhost:5000/api/products", { withCredentials: true })
      .then((response) => {
        setAllProducts(response.data);
        setInitial(response.data);

        setBS3(
          response.data
            .sort((a, b) => {
              return b.sold - a.sold;
            })
            .slice(0, 3)
        );

        setBS2(
          response.data
            .sort((a, b) => {
              return b.sold - a.sold;
            })
            .slice(3, 5)
        );
      })
      .catch((err) => {
        console.log("this is error: ", err);
      });

      axios
      .get("http://localhost:5000/api/orders", { withCredentials: true })
      .then((response) => {
        setSoldHistory(response.data);
      })
      .catch((err) => {
        console.log("this is error: ", err);
      });
  }, []);

  const addToCart = (_id) => {
    // update allProducts (state)
    const newProducts = allProducts.map((product) => {
      if (product._id === _id) {
        const updatedProduct = {
          ...product,
          stock: product.stock - 1,
          sold: product.sold + 1
        };
        return updatedProduct;
      }
      return product;
    });
    setAllProducts(newProducts);

    // update cart (state)
    let cartItems = [];

    initial.forEach((product) => {
      newProducts.forEach((item) => {
        if (product._id === item._id && product.stock !== item.stock) {
          cartItems.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            nrOfItems: product.stock - item.stock,
            fotoImg: product.fotoImg,
          });
        }
      });
    });
    setCart(cartItems);
    // update nrOfCartItems (NUMBER) (state)
    setNrOfCartItems(nrOfCartItems + 1);

    // update Total (state)
    var sum = cartItems.reduce((sum, p) => sum + p.price * p.nrOfItems, 0);

    setTotal(sum);
  };

  const deleteFromCart = (_id) => {
    const newProducts = allProducts.map((product) => {
      if (product._id === _id) {
        const updatedProduct = {
          ...product,
          stock: product.stock + 1,
          sold: product.sold - 1
        };
        return updatedProduct;
      }
      return product;
    });
    setAllProducts(newProducts);

    let cartItems = [];

    initial.forEach((product) => {
      newProducts.forEach((item) => {
        if (product._id === item._id && product.stock !== item.stock) {
          cartItems.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            nrOfItems: product.stock - item.stock,
            fotoImg: product.fotoImg,
          });
        }
      });
    });
    setCart(cartItems);

    setNrOfCartItems(nrOfCartItems - 1);

    var sum = cartItems.reduce((sum, p) => sum + p.price * p.nrOfItems, 0);

    setTotal(sum);
  };

  

  return (
    <MyContext.Provider
      value={[
        sliderInfo, setSliderInfo,
        allProducts, setAllProducts,
        BS2, setBS2,
        BS3, setBS3,
        addToCart,
        deleteFromCart,
        cart, setCart,
        nrOfCartItems, setNrOfCartItems,
        total, setTotal,
        soldHistory, setSoldHistory,
        initial, setInitial
      ]}
    >
      {props.children}
    </MyContext.Provider>
  );
};

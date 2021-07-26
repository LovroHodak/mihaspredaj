import React, { useState, createContext, useEffect, useContext } from "react";
import { useProducts } from "./use-products";

const AddDeleteFromCartContext = createContext();

export function AddDeleteFromCartProvider(props) {
  const { products, setProducts, initialValue } = useProducts();

  const [cart, setCart] = useState([]);
  const [nrOfCartItems, setNrOfCartItems] = useState(0);
  const [total, setTotal] = useState(0);

  const addToCart = (_id) => {
    // update allProducts (state)
    const newProducts = products.map((product) => {
      if (product._id === _id) {
        const updatedProduct = {
          ...product,
          stock: product.stock - 1,
          sold: product.sold + 1,
        };
        return updatedProduct;
      }
      return product;
    });
    setProducts(newProducts);

    // update cart (state)
    let cartItems = [];

    initialValue.forEach((product) => {
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
    const newProducts = products.map((product) => {
      if (product._id === _id) {
        const updatedProduct = {
          ...product,
          stock: product.stock + 1,
          sold: product.sold - 1,
        };
        return updatedProduct;
      }
      return product;
    });
    setProducts(newProducts);

    let cartItems = [];

    initialValue.forEach((product) => {
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
    <AddDeleteFromCartContext.Provider
      value={{
        addToCart,
        deleteFromCart,
        cart,
        setCart,
        nrOfCartItems,
        setNrOfCartItems,
        total,
        setTotal,
      }}
    >
      {props.children}
    </AddDeleteFromCartContext.Provider>
  );
}

export function useAddDeleteFromCart() {
  return useContext(AddDeleteFromCartContext);
}

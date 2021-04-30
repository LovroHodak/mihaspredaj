import React, { useContext, useEffect } from "react";
import "./Detail.css";
import { MyContext } from "../MyContext";
import { Button, Image } from "react-bootstrap";

export default function Detail({ match }) {
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
  ] = useContext(MyContext);

  let paramsId = match.params.id;

  const setActive = (fotoId) => {
    let newActive = allProducts.map((product) => {
      if (product._id === paramsId) {
        const updateProduct = {
          ...product,
          fotoImg: product.fotoImg.map((foto) => {
            if (foto.active === true) {
              const updateActive = {
                ...foto,
                active: false,
              };
              return updateActive;
            }
            return foto;
          }),
        };
        return updateProduct;
      }
      return product;
    });

    let betterActive = newActive.map((product) => {
      if (product._id === paramsId) {
        const updateProduct = {
          ...product,
          fotoImg: product.fotoImg.map((foto) => {
            if (foto.id === fotoId) {
              const updateActive = {
                ...foto,
                active: true,
              };
              return updateActive;
            }
            return foto;
          }),
        };
        return updateProduct;
      }
      return product;
    });

    setAllProducts(betterActive);
  };

  return (
    <div className="detail">
      {allProducts.map((product, i) => {
        if (product._id === paramsId) {
          return (
            <div key={i}>
              <div className="detailTop d-flex justify-content-between mb-2">
                <div
                  className="detailTopLeft d-flex justify-content-between mt-2"
                >
                  <div className="detailSmall">
                    {product.fotoImg.map((foto, i) => {
                      if (foto.active === true) {
                        return (
                          <div key={i} className="detailSmallActive m-1">
                            <Image
                              src={foto.lnk}
                              alt="smallFoto"
                              onClick={() => setActive(foto.id)}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div key={i} className="detailSmallPassive m-1">
                            <Image
                              src={foto.lnk}
                              alt="smallFoto"
                              onClick={() => setActive(foto.id)}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>

                  <div className="detailBig m-1">
                    {product.fotoImg.map((foto, i) => {
                      if (foto.active === true) {
                        return (
                          <Image
                            key={i}
                            src={foto.lnk}
                            alt="bigFoto"
                          />
                        );
                      }
                    })}
                  </div>
                </div>

                <div className="detailTopRight text-white text-center mt-2">
                  <h1>{product.name}</h1>
                  <p>Price: {product.price} €</p>
                  <p>In Stock: {product.stock}</p>
                  <div>
                    {product.stock > 0 ? (
                      <Button
                        onClick={() => addToCart(product._id)}
                        variant="success"
                      >
                        Add
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="detailBottom m-1 text-white">
                <p>{product.longDesc}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

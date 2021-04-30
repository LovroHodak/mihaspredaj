import React, { useContext } from "react";
import { MyContext } from "../MyContext";
import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";

export default function BestSeller() {
  const [
    sliderInfo,
    setSliderInfo,
    allProducts,
    setAllProducts,
    BS2,
    setBS2,
    BS3,
    setBS3,
  ] = useContext(MyContext);
  return (
    <div className="w-100 p-0">
      <h1 className="text-white text-center font-weight-light mt-3 mb-3 d-none d-md-block">
        Best Sellers
      </h1>
      <div className="p-0 d-md-flex justify-content-between ">
        {BS3.map((item) => {
          return (
            <Card key={item.id} className='mx-1 my-1'>
              <Card.Img
                variant="top p-1"
                src={item.fotoImg[0].lnk}
                alt={item.name}
              />
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>{item.name}</Card.Title>
                <Button variant="primary" as={Link} to={`/detail/${item._id}`}>
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <div className="p-0 d-md-flex justify-content-between">
        {BS2.map((item) => {
          return (
            <Card key={item.id} className='mx-1 my-1'>
              <Card.Img
                variant="top p-1"
                src={item.fotoImg[0].lnk}
                alt={item.name}
              />
              <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>{item.name}</Card.Title>
                <Button variant="primary" as={Link} to={`/detail/${item._id}`}>
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

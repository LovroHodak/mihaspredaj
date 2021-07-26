import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";

import { useProducts } from "../hooks/use-products";

export default function BestSeller() {
  const { BestS2, BestS3, loading, error } = useProducts();

  if (loading) return <Spinner animation="grow" />;
  if (error) return <code>{error}</code>;

  return (
    <div className="w-100 p-0">
      <h1 className="text-white text-center font-weight-light mt-3 mb-3 d-none d-md-block">
        Best Sellers
      </h1>
      <div className="p-0 d-md-flex justify-content-between ">
        {BestS3.map((item) => {
          return (
            <Card key={item.id} className="mx-1 my-1">
              <Card.Img
                variant="top p-1"
                src={item.fotoImg[0].lnk}
                alt={item.name}
              />
              <Card.Body className="d-flex flex-column align-items-center">
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
        {BestS2.map((item) => {
          return (
            <Card key={item.id} className="mx-1 my-1">
              <Card.Img
                variant="top p-1"
                src={item.fotoImg[0].lnk}
                alt={item.name}
              />
              <Card.Body className="d-flex flex-column align-items-center">
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

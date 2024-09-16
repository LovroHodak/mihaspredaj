import "./KATEGORIJE.css";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useProducts } from "../hooks/use-products";

export default function Kuhinja() {
  const { products } = useProducts();

  return (
    <div className="kategorije">
      <Card className="text-center featCard">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {products.map((product, i) => {
          if (product.category === "Kuhinja") {
            return (
              <Card key={i} style={{ maxWidth: 300 }} className="mx-1 my-1">
                <Card.Img
                  variant="top"
                  src={product.fotoImg[0].lnk}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.shortDesc}</Card.Text>
                  <Button
                    as={Link}
                    to={`/detail/${product._id}`}
                    variant="primary"
                  >
                    View More
                  </Button>
                </Card.Body>
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
}

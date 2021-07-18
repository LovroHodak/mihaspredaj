import React from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { useCategories } from "../hooks/use-categories";

export default function Slider() {
  const { categories, loading, error } = useCategories();

  if (loading) return <Spinner animation="grow" />;
  if (error) return <code>{error}</code>;
  
  return (
    <div>
      <Carousel className="d-none d-md-block">
        {categories.map((item, i) => {
          return (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={item.categoryImg}
                alt={item.categoryName}
              />
              <Carousel.Caption>
                <h3>{item.categoryName}</h3>
                <p>{item.categoryDesc}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

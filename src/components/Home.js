import React from "react";
import BestSeller from "./BestSeller";
import "./Home.css";
import Slider from "./Slider";

console.log('home outside function')

export default function Home() {
  return (
    <div className="home">
      <Slider />
      <BestSeller />
    </div>
  );
}

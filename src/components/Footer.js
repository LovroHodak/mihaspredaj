import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <h1>
        <Link to="/admin">Admin</Link>
      </h1>
    </div>
  );
}

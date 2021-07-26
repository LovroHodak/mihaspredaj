import React from "react";
import "./Navv.css";
import { Navbar, Nav, Image, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAddDeleteFromCart } from "../hooks/use-addDeleteFromCart";

export default function Navv() {
  const { nrOfCartItems } = useAddDeleteFromCart();

  return (
    <Navbar
      expand="lg"
      collapseOnSelect
      fixed="top"
      bg="primary"
      className="mx-auto p-0 d-flex flex-wrap"
      style={{ maxWidth: "1140px" }}
    >
      <Container className="w-25 d-lg-none d-xl-none pl-2">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
      <Navbar.Brand className="d-none d-lg-block d-xl-block w-25 m-0 text-white fontCart pl-2">
        Logo
      </Navbar.Brand>
      <Navbar.Brand
        as={Link}
        to="/"
        className="text-center w-50 m-0 text-white font-weight-bold font-italic fontTitle"
      >
        UniShop
      </Navbar.Brand>
      <Navbar.Brand
        as={Link}
        to="/cart"
        href="#home"
        className="d-flex justify-content-end align-items-center w-25 m-0 pr-2 pl-0"
      >
        <Image
          src="https://image.flaticon.com/icons/png/128/2211/2211008.png"
          alt="cartIcon"
          className="imageClass"
        />
        <Navbar.Text className="text-white pl-1 fontCart">
          {nrOfCartItems}
        </Navbar.Text>
      </Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav ">
        <Nav>
          <Nav.Link
            eventKey="1"
            as={Link}
            to="/kuhinja"
            className="d-lg-none d-xl-none text-white fontText pl-2"
          >
            Kuhinja
          </Nav.Link>
          <Nav.Link
            eventKey="2"
            as={Link}
            to="/vrt"
            className="d-lg-none d-xl-none text-white fontText pl-2"
          >
            Vrt
          </Nav.Link>
          <Nav.Link
            eventKey="3"
            as={Link}
            to="/sport"
            className="d-lg-none d-xl-none text-white fontText pl-2"
          >
            Sport
          </Nav.Link>
          <Nav.Link
            eventKey="4"
            as={Link}
            to="/relax"
            className="d-lg-none d-xl-none text-white fontText pl-2"
          >
            Relax
          </Nav.Link>
          <Nav.Link
            eventKey="5"
            as={Link}
            to="/drugo"
            className="d-lg-none d-xl-none text-white fontText pl-2"
          >
            Drugo
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <Navbar className="d-none d-lg-block d-xl-block w-100">
        <Button
          as={Link}
          to="/kuhinja"
          variant="info"
          style={{ width: "15%", margin: "0 2.5%" }}
        >
          Kuhinja
        </Button>
        <Button
          as={Link}
          to="/vrt"
          variant="info"
          style={{ width: "15%", margin: "0 2.5%" }}
        >
          Vrt
        </Button>
        <Button
          as={Link}
          to="/sport"
          variant="info"
          style={{ width: "15%", margin: "0 2.5%" }}
        >
          Sport
        </Button>
        <Button
          as={Link}
          to="/relax"
          variant="info"
          style={{ width: "15%", margin: "0 2.5%" }}
        >
          Relax
        </Button>
        <Button
          as={Link}
          to="/drugo"
          variant="info"
          style={{ width: "15%", margin: "0 2.5%" }}
        >
          Drugo
        </Button>
      </Navbar>
    </Navbar>
  );
}

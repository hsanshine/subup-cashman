import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./MyNavBar.css";

const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const handleToggleNav = () => {
    setExpanded((prevState) => !prevState);
  };
  //TODO: add back drop so that if user clicks anywhere menu is hidden.
  return (
    <Navbar bg="light" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand href="#home" className="h2">
          Cashman-in-React
        </Navbar.Brand>
        <Navbar.Toggle onClick={handleToggleNav} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" onClick={handleToggleNav}>
            <NavLink to="/user" className="nav-link">
              {" "}
              Customer
            </NavLink>

            <NavLink to="/admin" className="nav-link">
              {" "}
              Admin
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

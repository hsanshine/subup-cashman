import React from "react";
import { Container } from "react-bootstrap";

import MyNav from "./MyNav";

import "./Layout.css";

const Layout = (props) => {
  return (
    <div className="container-fluid">
      <MyNav />
      <Container className="px-auto ">
        <h1 className="mb-3 fs-3">Subup atm machine</h1>

        <div className="row main justify-content-center m-md-auto">
          <div className="col col-lg-10 px-4">{props.children}</div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;

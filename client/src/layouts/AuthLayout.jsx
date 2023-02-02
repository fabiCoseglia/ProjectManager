import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Navbar, Row } from "react-bootstrap";

export const AuthLayout = () => {
  return (
    <>
        {/*  <Navbar bg="info" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="mx-auto">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Project Manager
          </Navbar.Brand>
        </Container>
      </Navbar> */}
    <Container  
    fluid
    style={{ display: "grid", alignContent: "center", height: "90vh" }}>
      <Row>
        <Col xs={{span:8 ,offset:2}} lg={{ span: 4, offset: 4 }}>
         <Outlet/> 
        </Col>
      </Row>
    </Container>
    </>
    


  );
};

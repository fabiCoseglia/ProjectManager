import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import backgroundImage from '../images/mountains.png'

export const AuthLayout = () => {
  return (
    <>
    {/* <WaveHeader/> */}
      <Container
        fluid
        style={{ display: "grid", alignContent: "center", height: "90vh", backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh" }}
      >
        <Row>
          <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 4 }}>
            <Outlet/>
          </Col>
        </Row>
       
      </Container>
      {/* <WaveFooter /> */}
    </>
  );
};

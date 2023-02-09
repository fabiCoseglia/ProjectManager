import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { Header } from "../components/Header";
import backgroundImage from '../images/mountains.png'

export const ProtectedLayout = () => {

   const {auth,loading}= useAuth()

     if (loading) {
       return (<p>loading...</p>)
     }
   

  return (
    <>
      {auth._id ? (
        <Container
          fluid
          /* style={{ display: "grid", alignContent: "center", height: "100vh" }} */
          style={{padding:'0px', backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh"}}
        >
          <Header />
          <Container >
            
          <Row className="mt-2">
           {/*  <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}><Sidebar/></Col> */}
            <Col xs={{ span: 12, offset: 0 }} lg={{ span: 8, offset: 2 }}>
              <Outlet />
            </Col>
          </Row>
          </Container>
          
         {/*  <WaveFooter /> */}
        </Container>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </>
  );
};

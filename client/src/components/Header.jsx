import React from 'react';
import { Link } from "react-router-dom";
import { faSignOutAlt,faFileCirclePlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import './Header.css';
export const Header = () => {
  return (
    <div fluid style={{backgroundColor:'rgba(000, 000, 000, 0.8'}}>
      <Navbar  expand="lg" variant="dark" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '20px'}}>
        <Container fluid className="d-flex justify-content-around">
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <Navbar.Brand href="#" className="fw-bolder" style={{fontSize:'25px'}}>
              Project Manager
            </Navbar.Brand>
          </Link>

          <Nav className="ml-auto d-flex gap-2">
            <Link to={"create-project"}>
              <Button variant="outline-light" className="d-none d-md-inline-block">
                New Project
              </Button>
              <FontAwesomeIcon icon={faFileCirclePlus} className="d-inline-block d-md-none"
                style={{color:'white',fontSize:'30px'}}/>
            </Link>

            {/* <Link to={'#'}>
              <Button variant="outline-light" className="d-none d-md-inline-block">
                Logout
              </Button>
              <FontAwesomeIcon icon={faRightFromBracket} className="d-inline-block d-md-none"
                  style={{color:'white',fontSize:'30px'}}/>
            </Link> */}
            
          </Nav>
        </Container>
      </Navbar>
    </div>
    
  );
};




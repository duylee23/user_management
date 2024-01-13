import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/logo2.png'
import './Header.scss'
const Header = () => {
    return (
        <Navbar expand="lg" className="navbar">
          <Container className="d-flex align-items-center">
              <Navbar.Brand href="/">
                <img src={logo} className="logo"></img>
                <span>Starbuck Employee</span>
              </Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" activeKey={'/users'}>
                <Nav.Link href="/" >Home</Nav.Link>
                <Nav.Link href="/users">Manage User</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#link">Login</Nav.Link>
                <Nav.Link href="#link">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
          
        </Navbar>
      );
}
export default Header;
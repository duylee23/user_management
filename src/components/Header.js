import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/logo2.png'
import './Header.scss'
import { useLocation, NavLink } from "react-router-dom";

const Header = () => {
    const location = useLocation()
    return (
        <Navbar expand="lg" className="navbar">
          <Container className="d-flex align-items-center">
              <Navbar.Brand href="/">
                <img src={logo} className="logo"></img>
                <span>Starbuck Employee</span>
              </Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" activeKey={location.pathname}>
                  <NavLink to={'/'} className='nav-link'>Home</NavLink>
                  <NavLink to={'/users'} className='nav-link'> Manage users</NavLink>
              </Nav>
              <Nav>
                <NavLink to="/login" className='nav-link'>Login</NavLink>
                <NavLink to="/logout" className='nav-link'>Logout</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
          
        </Navbar>
      );
}
export default Header;
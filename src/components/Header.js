import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/logo2.png'
import './Header.scss'
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { UserContext } from "../context/UserContext";


const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const {user, logout} = useContext(UserContext)
    
    const handleLogout = () => {
      logout()
      if(!localStorage.getItem('token')) {
        navigate('/')
        toast.success('Log out successfully!')
      }
      
    }
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
                { user && user.auth === true?   <NavLink  className='nav-link' onClick={() => handleLogout()}>Logout</NavLink>
                :  <NavLink to="/login" className='nav-link'>Login</NavLink>
                }
               
              </Nav>
            </Navbar.Collapse>
          </Container>
          
        </Navbar>
      );
}
export default Header;
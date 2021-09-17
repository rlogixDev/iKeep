import React from 'react'
import { Navbar, Container } from 'react-bootstrap';
import { getAuth } from "firebase/auth";
import { AuthProvider } from '../../context/AuthContext';
export default function header() {
    
    return (

         <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
             <Container>
                 <Navbar.Brand href="#home"><img
                     src="https://www.mediaagility.com/wp-content/uploads/2021/09/MediaAgility-logo-4-1.png"
                     width="100"
                     height="50"
                     className="d-inline-block align-bottom text-danger"
                     alt="Logo"
                 /><span className="app-name">iKeep</span></Navbar.Brand>
             </Container>
         </Navbar>

    )
}

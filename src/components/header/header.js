import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link} from 'react-router-dom';

export default function header() {
    return (
        <div>
            
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home"><img
                        src="https://www.mediaagility.com/wp-content/uploads/2021/09/MediaAgility-logo-4-1.png"
                        width="100"
                        height="50"
                        className="d-inline-block align-bottom text-danger"
                        alt="Logo"
                    /><span className="app-name">iKeep</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href='/login'><Link to="/login">Login</Link></Nav.Link>
                            <Nav.Link href='/signup'><Link to="/signup">Sign Up</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

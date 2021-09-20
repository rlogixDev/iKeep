import React, { useEffect, useState,useContext } from 'react'
import { Navbar, Container } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';

// import { useLocation } from "react-router-dom";

const Header = () =>{
const currentUser = useContext(AuthContext);
        console.log("user in header",currentUser);

    // let location = useLocation();
    // const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        console.log("user in header",currentUser);
    }, []);


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
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                   Welcome: {currentUser}                      
                    </Navbar.Text>
                </Navbar.Collapse>
                <p>{currentUser}</p>
            </Container>
        </Navbar>

    )
}

export default Header;
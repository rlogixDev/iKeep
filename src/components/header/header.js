import React, { useEffect, useState, useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const auth = getAuth();
  const { activeUser } = useContext(AuthContext);
    console.log("User present in head", activeUser);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="https://www.mediaagility.com/wp-content/uploads/2021/09/MediaAgility-logo-4-1.png"
            width="100"
            height="50"
            className="d-inline-block align-bottom text-danger"
            alt="Logo"
          />
          <span className="app-name">iKeep</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {activeUser && <p className="font-weight-bold">Welcome:{activeUser.email} </p>}
          </Navbar.Text>
          <Nav>
          {activeUser && <Nav.Link
              onClick={() =>
                signOut(auth)
                  .then(() => {
                    console.log("signed out");
                  })
                  .catch((error) => {})
              }
            >
              <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/38-512.png" width="30" radius="0" alt="google" />
            </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

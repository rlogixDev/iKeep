import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function Header() {
  return (
    <header>
      <Navbar>
        <Container className='d-flex justify-content-around '>
          <Navbar.Brand href='#home'>iKeep</Navbar.Brand>

          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              Signed in as: <a href='#login'>UserName</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

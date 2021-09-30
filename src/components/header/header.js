import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import Logo from '../../assets/iCons/Logo.png';

const Header = () => {
  const auth = getAuth();
  const { activeUser } = useContext(AuthContext);
  console.log('User present in head', activeUser);
  // const [activeUserName, setactiveUserName] = useState();
  // useEffect(() => {

  //   // activeUser?.length?setactiveUserName(activeUser.displayName):''
  // }, activeUser);
               

  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
      <Container>
        <Navbar.Brand href='#home'>
          <img
            src={Logo}
            width='70'
            height='70'
            className='d-inline-block align-bottom text-danger'
            alt='Logo'
          />
          {/* <span className="app-name">iKeep</span> */}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            {activeUser && (
              <p className='m-0 font-weight-bold'>
                Welcome:{' '}
                {activeUser?.displayName ? activeUser.displayName : ' New User'}
              </p>
            )}
          </Navbar.Text>
          <Nav>
            {activeUser && (
              <Nav.Link
                onClick={() =>
                  signOut(auth)
                    .then(() => {
                      console.log('signed out');
                    })
                    .catch((error) => {})
                }
              >
                <img
                  src='data:image/png;base64,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'
                  width='30'
                  radius='0'
                  alt='google'
                />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

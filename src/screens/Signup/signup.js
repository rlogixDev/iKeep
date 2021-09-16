import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Container, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './signup.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('Select');
  const [validator, setValidator] = useState(false);

  console.log('name', name);
  console.log('password', password);
  console.log('phone', phone);
  console.log('gender', gender);
  console.log('zip', zip);
  console.log('state', state);
  console.log('validator', validator);

  ///////////////////////////////////////

  const validEmail = new RegExp('@mediaagility.com$');

  const validPassword = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
  );

  useEffect(() => {
    const validate = () => {
      if (validEmail.test(name)) {
        if (validPassword.test(password)) {
          setValidator(true);
        } else setValidator(false);
      } else setValidator(false);
    };
    validate();
  }, [name, password]);

  function numberCheck(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  }

  //////////////////////////////////////

  return (
    <>
      <div className='form mt-4'>
        <Form className='contain mx-auto p-4 '>
          <h3 className='mb-3'>SignUp</h3>
          <Container>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Form.Label column sm='4'>
                  Username
                </Form.Label>
                <Col sm='8'>
                  <Row>
                    <Form.Control
                      type='text'
                      placeholder='Enter Username'
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Row>
                  <Row>
                    {!validator && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *should end with @mediaagility.com
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Col sm='4'>
                  <Form.Label>Password</Form.Label>
                </Col>
                <Col sm='8'>
                  <Row>
                    <Form.Control
                      type='password'
                      placeholder='Enter Password'
                      onChange={(e) => setPassword(e.target.value)}
                    />{' '}
                  </Row>
                  <Row>
                    {!validator && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *Minimum eight characters, at least one uppercase
                        letter, one lowercase letter, one number and one special
                        character
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Col sm='4'>
                  <Form.Label>Mobile Number</Form.Label>
                </Col>
                <Col sm='8'>
                  <Form.Control
                    type='text'
                    placeholder='Enter Mobile Number'
                    value={phone}
                    onChange={numberCheck}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Col sm='4'>
                  <Form.Label>Gender</Form.Label>
                </Col>
                <Col sm='2'>
                  <Form.Check
                    type='radio'
                    name='Gender'
                    label='m'
                    value='male'
                    onClick={(e) => setGender(e.target.value)}
                  />
                </Col>
                <Col sm='3'>
                  <Form.Check
                    type='radio'
                    name='Gender'
                    label='f'
                    value='female'
                    onClick={(e) => setGender(e.target.value)}
                  />
                </Col>
                <Col sm='3'>
                  <Form.Check
                    type='radio'
                    name='Gender'
                    value='others'
                    label='others'
                    onClick={(e) => setGender(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Col sm='4'>
                  <Form.Label>Zip Code</Form.Label>
                </Col>
                <Col sm='8'>
                  <Form.Control
                    type='text'
                    placeholder='Enter Zip Code'
                    onChange={(e) => setZip(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Col sm='4'>
                  <Form.Label>State</Form.Label>
                </Col>
                <Col sm='8'>
                  <Form.Control
                    as='select'
                    onClick={(e) => setState(e.target.value)}
                  >
                    <option>Select</option>
                    <option value='UP'>UP</option>
                    <option value='Delhi'>Delhi</option>
                    <option value='West Bengal'>West Bengal</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Row className='justify-content-center'>
              {/* <Col sm={{ span: 3 }}> */}
              <Row>
                <Button type='button' className='mb-3'>
                  Register
                </Button>
              </Row>

              {/* </Col> */}
            </Row>
            <p className='link'>
              Already have an account? <Link to='/'>Login</Link>
            </p>
          </Container>
        </Form>
      </div>
    </>
  );
}

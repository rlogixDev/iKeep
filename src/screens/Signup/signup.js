import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Container, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './signup.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
} from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const history = useHistory();
  const auth = getAuth();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const validEmail = new RegExp('@mediaagility.com$');

  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character

  const validPassword = new RegExp(
    '^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,16}$'
  );

  function phoneNumberCheck(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      if (e.target.value.length < 11) {
        setPhone(e.target.value);
      }
    }
  }

  function zipCodeCheck(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      if (e.target.value.length < 7) {
        setZip(e.target.value);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (
      name &&
      password &&
      phone &&
      zip &&
      state &&
      country &&
      email &&
      validPassword.test(password) &&
      validEmail.test(email)
    ) {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            toast.success('Signup Successful', {
              autoClose: 5000,
              hideProgressBar: false,
              draggable: false,
              progress: undefined,
              position: 'top-right',
              pauseOnHover: true,
              closeOnClick: true,
            });
            history.push('/');
          }
        );
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        // updateProfile(auth.currentUser, {
        //   phoneNumber: String(phone),
        // });
      } catch (error) {
        const errorMessage = error.message.slice(22, 42);
        setError(errorMessage);
        setLoading(false);
      }
    } else {
      setError('Please fill all the Fields');
    }
  };

  console.log('error', error);
  console.log('email and apassword', email, password);

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
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Row>
                  <Row>
                    {name.length === 0 && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *Enter Username
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Col sm='4'>
                  {' '}
                  <Form.Label>Password</Form.Label>
                </Col>
                <Col sm='8'>
                  {' '}
                  <Row>
                    <Form.Control
                      type='password'
                      placeholder='Enter Password'
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Row>
                  <Row>
                    {!validPassword.test(password) && (
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
                  <Row>
                    <Form.Control
                      type='text'
                      placeholder='Enter Mobile Number'
                      value={phone}
                      required
                      onChange={phoneNumberCheck}
                    />
                  </Row>
                  <Row>
                    <Row>
                      {phone.length !== 10 && (
                        <p
                          style={{
                            textAlign: 'left',
                            color: 'red',
                            fontSize: '10px',
                            marginBottom: '5px',
                          }}
                        >
                          *Please enter 10 digit Mobile Number
                        </p>
                      )}
                    </Row>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Col sm='4'>
                  {' '}
                  <Form.Label>E-mail</Form.Label>
                </Col>
                <Col sm='8'>
                  <Row>
                    <Form.Control
                      type='text'
                      required
                      placeholder='Enter E-mail'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Row>
                  <Row>
                    {!validEmail.test(email) && (
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
                  <Form.Label>Gender</Form.Label>
                </Col>
                <Col sm='2'>
                  <Form.Check
                    type='radio'
                    name='Gender'
                    label='M'
                    value='male'
                    onChange={(e) => setGender(e.target.value)}
                  />
                </Col>
                <Col sm='3'>
                  <Form.Check
                    type='radio'
                    name='Gender'
                    label='F'
                    value='female'
                    onChange={(e) => setGender(e.target.value)}
                  />
                </Col>
                <Col sm='3'>
                  <Form.Check
                    type='radio'
                    name='Gender'
                    label='Others'
                    value='others'
                    onChange={(e) => setGender(e.target.value)}
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
                  <Row>
                    <Form.Control
                      type='text'
                      placeholder='Enter Zip Code'
                      value={zip}
                      required
                      onChange={zipCodeCheck}
                    />
                  </Row>
                  <Row>
                    {zip.length !== 6 && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *Enter ZipCode
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Col sm='4'>
                  {' '}
                  <Form.Label>State</Form.Label>
                </Col>
                <Col sm='8'>
                  {' '}
                  <Row>
                    <Form.Control
                      type='text'
                      placeholder='Enter State'
                      required
                      onChange={(e) => setState(e.target.value)}
                    />
                  </Row>
                  <Row>
                    {state.length === 0 && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *Enter State
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-center'>
                <Col sm='4'>
                  {' '}
                  <Form.Label>Country</Form.Label>
                </Col>
                <Col sm='8'>
                  <Row>
                    <Form.Control
                      type='text'
                      placeholder='Enter Country'
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </Row>
                  <Row>
                    {country.length === 0 && (
                      <p
                        style={{
                          textAlign: 'left',
                          color: 'red',
                          fontSize: '10px',
                          marginBottom: '5px',
                        }}
                      >
                        *Enter Country
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Row className='justify-content-start '>
                <Col sm='4'></Col>
                <Col sm={8} className='d-flex justify-content-start'>
                  <Button
                    type='submit'
                    className='m-0'
                    disabled={loading}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='m-0 d-flex justify-content-center'>
              <p className='error p-0 m-0'>{error}</p>
            </Form.Group>

            <p className='link'>
              Already have an account? <Link to='/'>Login</Link>
            </p>
          </Container>
        </Form>
      </div>
    </>
  );
}

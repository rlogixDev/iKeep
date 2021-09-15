import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Row,Container,Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './signup.css';
export default function Signup(){

    const [name,setName] =useState('');
    const [phone,setPhone]=useState('');
    const [email,setEmail] =useState('');

    return (<>
   
    <div className="form mt-4">
    <Form className="contain p-4 mb-4">
    <h3 className="mb-3">SignUp</h3>
    <Form.Group className="mb-3">
    <Container>
    <Row className="justify-content-center">
   <Col   sm={{span:3}}  lg={{span:2}} > <Form.Label >Username</Form.Label></Col>
    <Col  sm={{span:4}}  lg={{span:3}}><Form.Control  type="text" placeholder="Enter Username" /></Col>
    </Row>
    </Container>
  </Form.Group>
 
  <Form.Group className="mb-3">
  <Container>
      <Row className="justify-content-center">
  <Col sm={{span:3}} lg={{span:2}}> <Form.Label>Password</Form.Label></Col>
   <Col sm={{span:4}} lg={{span:3}}> <Form.Control type="password" placeholder="Enter Password" /></Col>
    </Row>
    </Container>
  </Form.Group>
  <Form.Group className="mb-3">
  <Container>
  <Row className="justify-content-center">
   <Col sm={{span:3}} lg={{span:2}}> <Form.Label>Mobile Number</Form.Label></Col>
   <Col sm={{span:4}} lg={{span:3}}> <Form.Control type="text" placeholder="Enter Mobile Number" /></Col>
    </Row>
    </Container>
  </Form.Group>
  <Form.Group className="mb-3">
  <Container>
  <Row className="justify-content-center">
  <Col sm={{span:3}}> <Form.Label>Gender</Form.Label></Col>
   <Col sm={{span:1}} > <Form.Check type="radio" name="Gender" label="m" /></Col>
   <Col sm={{span:1}}> <Form.Check type="radio" name="Gender" label="f" /></Col>
   <Col sm={{span:1}}>  <Form.Check type="radio" name="Gender" label="others" /></Col>
  
    </Row>
    </Container>
  </Form.Group>
  <Form.Group className="mb-3">
  <Container>
  <Row className="justify-content-center">
   <Col sm={{span:3}} lg={{span:2}}> <Form.Label>Zip Code</Form.Label></Col>
   <Col sm={{span:3}} lg={{span:3}}> <Form.Control type="text" placeholder="Enter Zip Code" /></Col>
    </Row>
    </Container>
  </Form.Group>
  <Form.Group className="mb-3">
  <Container>
      <Row className="justify-content-center">
  <Col sm={{span:3}} lg={{span:2}}> <Form.Label>State</Form.Label></Col>
   <Col sm={{span:3}} lg={{span:3}}> < Form.Control
          as="select">
  <option>Select</option>
  <option value="1">UP</option>
  <option value="2">Delhi</option>
  <option value="3">West Bengal</option>
</Form.Control></Col>
    </Row>
    </Container>
  </Form.Group>
  <Row className="justify-content-center">
  <Col sm={{span:3}}> <Button type="button" className="mb-3" >Register</Button></Col>
  </Row>
  <p className="link">Already have an account? <Link to="/">Login</Link></p>

    </Form>
   
    </div>
    
    </>)





}
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

    <Form className="contain mx-auto p-4 ">
    <h3 className="mb-3">SignUp</h3>
    <Container>
    <Form.Group className="mb-3">
   
    <Row className="justify-content-center">
  <Form.Label column sm="4">Username</Form.Label>
    <Col  sm="8"><Form.Control  type="text" placeholder="Enter Username" /></Col>
    </Row>
   
  </Form.Group>
 
  <Form.Group className="mb-3">
 
      <Row className="justify-content-center">
  <Col  sm="4"> <Form.Label>Password</Form.Label></Col>
   <Col sm="8"> <Form.Control type="password" placeholder="Enter Password" /></Col>
    </Row>
   
  </Form.Group>
  <Form.Group className="mb-3">
 
  <Row className="justify-content-center">
   <Col  sm="4"> <Form.Label>Mobile Number</Form.Label></Col>
   <Col sm="8"> <Form.Control type="text" placeholder="Enter Mobile Number" /></Col>
    </Row>
  
  </Form.Group>
  <Form.Group className="mb-3">
 
 <Row className="justify-content-center">
  <Col  sm="4"> <Form.Label>E-mail</Form.Label></Col>
  <Col sm="8"> <Form.Control type="text" placeholder="Enter E-mail" /></Col>
   </Row>
 
 </Form.Group>
  <Form.Group className="mb-3">
 
  <Row className="justify-content-center">
  <Col  sm="4"> <Form.Label>Gender</Form.Label></Col>
   <Col sm="2" > <Form.Check type="radio" name="Gender" label="M" /></Col>
   <Col sm="3"> <Form.Check type="radio" name="Gender" label="F" /></Col>
   <Col sm="3">  <Form.Check type="radio" name="Gender" label="Others" /></Col>
  
    </Row>
   
  </Form.Group>
  <Form.Group className="mb-3">
 
  <Row className="justify-content-center">
   <Col sm="4"> <Form.Label>Zip Code</Form.Label></Col>
   <Col sm="8"> <Form.Control type="text" placeholder="Enter Zip Code" /></Col>
    </Row>
   
  </Form.Group>
  <Form.Group className="mb-3">
 
   
  <Row className="justify-content-center">
  <Col sm="4"> <Form.Label>State</Form.Label></Col>
  <Col sm="8"> <Form.Control type="text" placeholder="Enter State" /></Col>
   </Row>
    
   
  </Form.Group>
  <Form.Group className="mb-3">
 <Row className="justify-content-center">
  <Col sm="4"> <Form.Label>Country</Form.Label></Col>
  <Col sm="8"> <Form.Control type="text" placeholder="Enter Country" /></Col>
   </Row>
 </Form.Group>


 <Form.Group className="mb-3">
 
 <Row className="justify-content-start ">
 <Col sm="4" ></Col>
 <Col sm={8} className="d-flex justify-content-start"><Button type="submit" className="mb-3" >Register</Button></Col>
    </Row>
  </Form.Group>
 
 
  <Row>
 
  
  </Row>
  <p className="link">Already have an account? <Link to="/">Login</Link></p>
</Container>
    </Form>
   
    </div>
    
    </>)





}
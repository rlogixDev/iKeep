import React, { useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';

export default function Notes({data}) {
  return (
    <div className='row d-flex justify-content-around mt-2 p-0'>
      <h4 className='text-decoration-underline' style={{ textAlign: 'left' }}>
        Today
      </h4>
      {data.map((data, index) => (
        <>
          <Card  style={{ width: '18rem', borderRadius: '15px' }} className='m-2'>
            <Card.Body>
              <input
                type='checkbox'
                className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
              ></input>
              <Card.Title >{data.title}</Card.Title>
              <Card.Text >{data.Content}</Card.Text>
              <Card.Link href='#'>Delete</Card.Link>
              <Card.Link href='#'>Edit</Card.Link>
            </Card.Body>
          </Card>
        </>
      ))}
      <h4 className='text-decoration-underline' style={{ textAlign: 'left' }}>
        Yesterday
      </h4>
      <Card style={{ width: '18rem', borderRadius: '15px' }} className='m-2'>
        <Card.Body>
          <input
            type='checkbox'
            className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
          ></input>
          <Card.Title>Title</Card.Title>
          <Card.Text>Content</Card.Text>
          <Card.Link href='#'>Delete</Card.Link>
          <Card.Link href='#'>Edit</Card.Link>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', borderRadius: '15px' }} className='m-2'>
        <Card.Body>
          <input
            type='checkbox'
            className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
          ></input>
          <Card.Title>Title</Card.Title>
          <Card.Text>Content</Card.Text>
          <Card.Link href='#'>Delete</Card.Link>
          <Card.Link href='#'>Edit</Card.Link>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', borderRadius: '15px' }} className='m-2'>
        <Card.Body>
          <input
            type='checkbox'
            className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
          ></input>
          <Card.Title>Title</Card.Title>
          <Card.Text>Content</Card.Text>
          <Card.Link href='#'>Delete</Card.Link>
          <Card.Link href='#'>Edit</Card.Link>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', borderRadius: '15px' }} className='m-2'> 
        <Card.Body>
          <input
            type='checkbox'
            className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
          ></input>
          <Card.Title>Title</Card.Title>
          <Card.Text>Content</Card.Text>
          <Card.Link href='#'>Delete</Card.Link>
          <Card.Link href='#'>Edit</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

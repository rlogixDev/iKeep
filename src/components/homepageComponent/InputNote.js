import React from 'react';
import { Form, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { RiAddLine } from 'react-icons/ri';

export default function InputNote() {
  return (
    <>
      <Card
        className='position-relative top-0 start-50 translate-middle-x  '
        style={{
          width: '50rem',
        }}
      >
        <Button
          className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0 '
          variant='primary'
          style={{ width: '2.5rem' }}
        >
          <RiAddLine size='1x' />
        </Button>
        <Card.Body>
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Title'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
            />
          </InputGroup>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Control placeholder='Content' as='textarea' rows={3} />
          </Form.Group>
          <div
            className='d-flex justify-content-between input-group'
            style={{ backgroundColor: '#ffff' }}
          >
            <input
              type='file'
              id='inputGroupFile01'
              aria-describedby='inputGroupFileAddon01'
            />
            <button className='input-group-text' id='inputGroupFileAddon01'>
              Upload
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

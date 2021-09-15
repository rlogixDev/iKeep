import React from 'react';
import { Form, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { RiAddLine } from 'react-icons/ri';
import { BiImageAdd } from 'react-icons/bi';

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
        </Card.Body>
        <Button
          className='position-absolute bottom-0 p-0'
          variant='primary'
          style={{ width: 'auto', height: '1.5rem' }}
        >
          <BiImageAdd size='1x' />
        </Button>
      </Card>
    </>
  );
}

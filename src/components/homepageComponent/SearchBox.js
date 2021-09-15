import React from 'react';
import {
  Form,
  Button,
  FormControl,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

export default function SearchBox() {
  return (
    <>
      <Form
        className='d-flex justify-content-around p-0 mb-5'
        style={{
          width: '50rem',
        }}
      >
        <FormControl
          type='search'
          placeholder='Search'
          aria-label='Search '
          aria-describedby='basic-addon2'
          style={{ maxWidth: '500px' }}
        />
        <Dropdown as={ButtonGroup}>
          <Button variant='outline-info'>Sort</Button>

          <Dropdown.Toggle
            split
            variant='outline-info'
            id='dropdown-split-basic'
          />

          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Date Wise</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Alphabetical Wise</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant='outline-success'>Save</Button>{' '}
      </Form>
    </>
  );
}

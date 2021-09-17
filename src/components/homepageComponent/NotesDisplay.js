import React from 'react';
import InputNote from './InputNote';
import Notes from './Notes';
import { Row, Container, Button } from 'react-bootstrap';
import SearchBox from './SearchBox';

export default function NotesDisplay() {
  return (
    <>
      <Container>
        <Row>
          <SearchBox />
          <InputNote />
        </Row>
        <Row className='d-flex flex-row justify-content-center mt-3'>
          <Button
            variant='primary'
            className='m-1'
            style={{ maxWidth: '100px' }}
          >
            Select All
          </Button>
          <Button
            variant='primary'
            className='m-1'
            style={{ maxWidth: '100px' }}
          >
            Delete
          </Button>
        </Row>
        <Notes />
      </Container>
    </>
  );
}

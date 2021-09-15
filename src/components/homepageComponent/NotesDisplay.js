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
          <Row className='d-flex justify-content-center'>
            <SearchBox />
          </Row>
          <Row>
            <Row>
              <InputNote />
            </Row>
          </Row>
        </Row>
        <Row>
          <Row className='d-flex flex-row mt-2'>
            <Button
              variant='primary'
              className='m-1'
              style={{ maxWidth: '100px' }}
            >
              Primary
            </Button>
            <Button
              variant='primary'
              className='m-1'
              style={{ maxWidth: '100px' }}
            >
              Primary
            </Button>
            <Button
              variant='primary'
              className='m-1'
              style={{ maxWidth: '100px' }}
            >
              Primary
            </Button>
          </Row>
          <Notes />
        </Row>
      </Container>
    </>
  );
}

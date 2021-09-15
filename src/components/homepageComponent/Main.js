import React from 'react';
import { Row } from 'react-bootstrap';
import NotesDisplay from './NotesDisplay';

export default function Main() {
  return (
    <div>
      <Row className='m-5'>
        <NotesDisplay />
      </Row>
    </div>
  );
}

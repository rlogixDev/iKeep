import React, { useState } from 'react';
import { Form, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { RiAddLine } from 'react-icons/ri';
import { Image, CloudinaryContext } from 'cloudinary-react';
import axios from 'axios';

export default function InputNote() {
  const [addImg, setAddImg] = useState('');
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', addImg);
    formData.append('upload_preset', 'lmx0ng0b');
    await axios
      .post('https://api.cloudinary.com/v1_1/adarsh022/image/upload', {
        method: 'POST',
        body: formData,
      })
      .then((res) => {
        console.log('res', res);
      });
  };

  console.log(addImg);

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
              onChange={(e) => setAddImg(e.target.files[0])}
              aria-describedby='inputGroupFileAddon01'
            />
            <button
              className='input-group-text'
              id='inputGroupFileAddon01'
              onClick={uploadImage}
              disabled={addImg.length === 0 ? true : false}
              style={{ borderRadius: '5px' }}
            >
              Upload
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

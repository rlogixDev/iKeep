import React, { useState, useEffect } from 'react';
import InputNote from './InputNote';
import Notes from './Notes';
import { Row, Container, Button } from 'react-bootstrap';
import SearchBox from './SearchBox';
import {
  Form,
  FormControl,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

export default function NotesDisplay() {
  const [searchText, setSearch] = useState();

  
  const data =
    [
      {
        "id": 1,
        "title": "sunt aut facere repellat ehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      },
      {
        "id": 3,
        "title": "ea molestias quasi ellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
      },
      {
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
      }]

  const [filteredData, setData] = useState(data);
  console.log(searchText);

  useEffect(() => {
    const lowercasedValue = searchText?.toLowerCase().trim();
    // console.log("lowercasedValue",lowercasedValue);
    if (lowercasedValue === "") setData(data);
    else {
      const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(lowercasedValue) ||
        item.body.toLowerCase().includes(lowercasedValue)
      );
      console.log(filteredData)
      setData(filteredData);
    }
  }, [searchText])

  return (
    <>
      <Container>
        <Row>
          {/* <SearchBox searchText={searchText}/> */}
          <div className='d-flex justify-content-center'>
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
                onChange={e => setSearch(e.target.value)}
                style={{ maxWidth: '500px' }}
              />
              <Dropdown style={{ margin: '0px 10px' }} as={ButtonGroup}>
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
          </div>
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
        <Notes data={filteredData} />
        {/* {filteredData.length > 0 ?
          <Notes data={filteredData} /> : <p>No results found..</p>} */}
      </Container>
    </>
  );
}

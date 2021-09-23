import React, { useState, useEffect,useContext } from 'react';
import Notes from './Notes';
import { Row, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import SearchBox from './SearchBox';
import { AuthContext } from '../../context/AuthContext';

import {
  Form,
  FormControl,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

export default function NotesDisplay({note}) {
  const [searchText, setSearch] = useState();
  const [data,setData] =useState([]);
  // const [userNotes,setUserNotes] =useState([]);
  const {activeUser}=useContext(AuthContext);
  const uid=activeUser.uid;
  console.log("uid",uid);
  useEffect(() => {
    axios.get('https://react-project-1443c-default-rtdb.firebaseio.com/notes.json')
    .then((res) => setData(res.data))

  },[note])
  let userNotes=[];
 let a= data[uid] ? (Object.keys(data[uid]).map((item) => userNotes.push(data[uid][item])),
  console.log(userNotes)):''
  
 
  // const [filteredData, setFilteredData] = useState(data);
  // console.log(searchText);

  // useEffect(() => {
  //   const lowercasedValue = searchText?.toLowerCase().trim();
  //   // console.log("lowercasedValue",lowercasedValue);
  //   if (lowercasedValue === "") setData(data);
  //   else {
  //     const filteredData = data.filter(item =>
  //       item.title.toLowerCase().includes(lowercasedValue) ||
  //       item.body.toLowerCase().includes(lowercasedValue)
  //     );
  //     console.log(filteredData)
  //     setFilteredData(filteredData);
  //   }
  // }, [searchText])

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
        {/* <Notes data={filteredData} /> */}
        {userNotes.length>0 ?
           <Notes data={userNotes} /> : <p>No results found..</p>}
      </Container>
    </>
  );
}

import React, { useState, useEffect, useContext } from "react";

import Notes from "./Notes";
import { RiAddLine } from 'react-icons/ri';
import { Row, Container, Button ,Card,InputGroup} from "react-bootstrap";
import { Image, CloudinaryContext } from 'cloudinary-react';
import { getDatabase,ref, set } from "firebase/database";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import { Form, FormControl, Dropdown, ButtonGroup } from "react-bootstrap";

export default function NotesDisplay() {
  const [searchText, setSearch] = useState();
  const [data, setData] = useState([]);
  // const [userNotes,setUserNotes] =useState([]);
  const { activeUser } = useContext(AuthContext);
  const uid = activeUser.uid;
  const [title,setTitle] =useState('');
  const [Content,setContent] =useState('');   
  // const [newNote,setNewNote]=useState({}); 
  let newNote={}; 
  
  const [addImg, setAddImg] = useState('');

       
  console.log("uid", uid);
  const AddNote =() => {
 
    const db = getDatabase();
    const id =Math.round(Math.random()*100);
    set(ref(db,'notes/'+activeUser.uid+'/'+id), {
      id:id,
      title: title,
      Content: Content,
      Email:activeUser.email,
      Date:Date(Date.now).toString().substr(0,15)
    }).
    then(() => console.log("Added successfully"),
    newNote={"id":id,"title":title,"Content":Content,"Email":activeUser,"Date":Date(Date.now).toString().substr(0,15)},
    console.log("newNote",newNote)
    ).
    catch(() => console.log("Error"));
  }

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
  useEffect(() => {
 axios
      .get("https://react-project-1443c-default-rtdb.firebaseio.com/notes.json")
      .then((res) => { (setData(res.data))});
  }, [newNote]);
  useEffect(() => {
 axios
      .get("https://react-project-1443c-default-rtdb.firebaseio.com/notes.json")
      .then((res) => setData(res.data));
  }, []);

  console.log("data",data);
  let userNotes = [];
  let a = data[uid]
    ? (Object.keys(data[uid]).map((item) => userNotes.push(data[uid][item]))): '';
    console.log("userNotes",userNotes);
    

    const [filteredData, setFilteredData] = useState(userNotes);
  console.log(searchText);

  useEffect(() => {
    const lowercasedValue = searchText?.toLowerCase().trim();
    if (lowercasedValue === "") setFilteredData(userNotes);
    else {
      const filteredData = userNotes.filter(
        (item) =>item?
         ((item.title.includes(searchText))):''
      );
      console.log("filteredData", filteredData);
      setFilteredData(filteredData);
    }
  }, [searchText]);
 
  return (
    <>
      <Container>
        <Row>
          {/* <SearchBox searchText={searchText}/> */}
          <div className="d-flex justify-content-center">
            <Form
              className="d-flex justify-content-around p-0 mb-5"
              style={{
                width: "50rem",
              }}
            >
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search "
                aria-describedby="basic-addon2"
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: "500px" }}
              />




              <Dropdown style={{ margin: "0px 10px" }} as={ButtonGroup}>
                <Button variant="outline-info">Sort</Button>

                <Dropdown.Toggle
                  split
                  variant="outline-info"
                  id="dropdown-split-basic"
                />

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Date Wise</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Alphabetical Wise
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="outline-success">Save</Button>{" "}
            </Form>
          </div>
        
        </Row>
        <Row>
       
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
          onClick={AddNote} 
        >

          <RiAddLine size='1x' />
        </Button>
        <Card.Body>
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Title'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onChange={(e) => setTitle(e.target.value)  }
            />
          </InputGroup>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Control placeholder='Content' as='textarea' name='content' rows={3} onChange={(e) => setContent(e.target.value) }  />
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

          </Row>
        <Row className="d-flex flex-row justify-content-center mt-3">
          <Button
            variant="primary"
            className="m-1"
            style={{ maxWidth: "100px" }}
          >
            Select All
          </Button>
          <Button
            variant="primary"
            className="m-1"
            style={{ maxWidth: "100px" }}
          >
            Delete
          </Button>
        </Row>
      
        {/* <Notes data={filteredData} /> */}
    
    
      </Container>
      { userNotes.length > 0 ?filteredData.length>0? (
          <Notes data={filteredData} />
        ) : (
          <Notes data={userNotes} />
        ):(
          <p>No results found..</p>
        )}  
      
       
      {/* {/* { console.log("length",userNotes.length)} */}
    </>
       
  );
}

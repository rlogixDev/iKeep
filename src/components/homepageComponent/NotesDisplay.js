import React, { useState, useEffect, useContext } from 'react';

import Notes from './Notes';
import { RiAddLine, RiDeleteBack2Fill } from 'react-icons/ri';
import {
  Row,
  Container,
  Button,
  Card,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { getDatabase, ref, set } from 'firebase/database';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

import { Form, FormControl, Dropdown, ButtonGroup } from 'react-bootstrap';

export default function NotesDisplay() {
  const [editModal, setEditModal] = useState(false);
  const [searchText, setSearch] = useState();
  const [data, setData] = useState([]);
  // const [userNotes,setUserNotes] =useState([]);
  const { activeUser } = useContext(AuthContext);
  const uid = activeUser.uid;
  const [title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [newNote, setNewNote] = useState({});
  const [editItem, setEditItem] = useState({});
  let userNotesData = [];
  const [addImg, setAddImg] = useState('');
  const [imagesId, setImagesId] = useState([]);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [deleteModal,setDeleteModal] =useState({});
  console.log('uid', uid);

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const DateA = a.Date;
    const DateB = b.Date;
  
    let comparison = 0;
    if (DateA < DateB) {
      comparison = 1;
    } else if (DateA > DateB) {
      comparison = -1;
    }
    return comparison;
  }

  const UpdateNote = () => {
    const title = editTitle ? editTitle : editItem.title;
    const Content = editContent ? editContent : editItem.Content;
    console.log(title);
    console.log(Content);
    console.log(editItem.Email);
    console.log(editItem.id);
    console.log(editItem.Date);
    console.log(uid);
    const userId = editItem.id;

    const updatedNote = {
      id: editItem.id,
      title: title,
      Content: Content,
      Email: editItem.Email,
      Date: editItem.Date,
    };
    axios
      .put(
        'https://react-project-1443c-default-rtdb.firebaseio.com/notes/' +
          uid +
          '/' +
          userId +
          '.json',
        updatedNote
      )
      .then(
        () => (console.log('Updated Successfully'), setNewNote(updatedNote))
      )
      .catch(() => console.log('Error'));
    setEditItem({});
  };

  const UpdateNewNote = () => {
    axios
      .get(
        'https://react-project-1443c-default-rtdb.firebaseio.com/notes/' +
          uid +
          '.json'
      )
      .then((res) => {
        setData(res.data);
      });
  }
  
  const AddNote = () => {
    const db = getDatabase();
    const id = Math.round(Math.random() * 100);
    set(ref(db, 'notes/' + activeUser.uid + '/' + id), {
      id: id,
      title: title,
      Content: Content,
      Email: activeUser.email,
      Date: Date(Date.now).toString().substr(0,24),
    })
      .then(
        () => console.log('Added successfully'),
        setNewNote({
          id: id,
          title: title,
          Content: Content,
          Email: activeUser,
          Date: Date(Date.now).toString().substr(0,24),
        }),
        UpdateNewNote,
        console.log("Date",Date(Date.now).toString().substr(0,24)),
        console.log('newNote', newNote)
      )
      .catch(() => console.log('Error'));
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', addImg);
    formData.append('upload_preset', 'lmx0ng0b');
    await axios
      .post('https://api.cloudinary.com/v1_1/adarsh022/image/upload', formData)
      .then((res) => {
        setImagesId([...imagesId, res.data.url]);
        console.log('imagesId', imagesId);
        console.log('res', res.data.url);
      });
  };

  const delImage = (index) => {
    setImagesId(imagesId.filter((item) => item != index));
  };

  const Delete = () => {
    const id=deleteModal.id;
    axios
      .delete(
        'https://react-project-1443c-default-rtdb.firebaseio.com/notes/' +
          uid +
          '/' +
          id +
          '.json'
      )
      .then(
        () => (
          console.log('deleted Successfully'), setNewNote({ delete: true })
        )
      )
      .catch(() => console.log('Error Occurred'));
      setDeleteModal({});
  };
  console.log(addImg);
  useEffect(() => {
    axios
      .get(
        'https://react-project-1443c-default-rtdb.firebaseio.com/notes/' +
          uid +
          '.json'
      )
      .then((res) => {
        setData(res.data);
      });
  }, [newNote]);


  //   useEffect(() => {
  //  axios
  //       .get("https://react-project-1443c-default-rtdb.firebaseio.com/notes.json")
  //       .then((res) => setData(res.data));
  //   }, []);

  console.log('data', data);
  let userNotes = [];
  let a = data
    ? Object.keys(data).map((item) => userNotes.push(data[item]))
    : '';
  console.log('userNotes', userNotes);
  userNotes.sort(compare);

  const [filteredData, setFilteredData] = useState(userNotes);
  console.log(searchText);

  useEffect(() => {
    const lowercasedValue = searchText?.toLowerCase().trim();
    if (lowercasedValue === '') setFilteredData(userNotes);
    else {
      const filteredData = userNotes.filter((item) =>
        item
          ? item.title.includes(searchText) || item.Content.includes(searchText)
          : ''
      );
      console.log('filteredData', filteredData);
      setFilteredData(filteredData);
    }
  }, [searchText]);

  {
    userNotes.length > 0 ? (
      filteredData.length > 0 ? (
        (userNotesData = filteredData)
      ) : (
        (userNotesData = userNotes)
      )
    ) : (
      <p>No results found..</p>
    );
  }

  console.log('Notes userNotesData', userNotesData);

  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const today = userNotesData
    ? userNotesData.filter((item, key) =>
        item ? item.Date.substr(0, 15) === Date(Date.now).toString().substr(0, 15) : ''
      )
    : '';

  const yesDay = (
    days[new Date().getDay()] === 'Sunday'
      ? 'Saturday'
      : days[new Date().getDay() - 1]
  ).substr(0, 3);
  const yesMon = monthNames[new Date().getMonth()].substr(0, 3);
  const yesYear = new Date().getFullYear();
  const yesDate = new Date().getDate() - 1;
  const yesterday = yesDay + ' ' + yesMon + ' ' + yesDate + ' ' + yesYear;
  const yesterdayuserNotesData = userNotesData
    ? userNotesData.filter((item, key) => (item ? item.Date.substr(0, 15) === yesterday : ''))
    : '';
  const EarlieruserNotesData = userNotesData
    ? userNotesData.filter((item, key) =>
        item
          ? item.Date.substr(0, 15) != yesterday &&
            item.Date.substr(0, 15) != Date(Date.now).toString().substr(0, 15)
          : ''
      )
    : '';
  console.log('yesterday', yesterday);
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
                onChange={(e) => setSearch(e.target.value)}
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
                  <Dropdown.Item href='#/action-2'>
                    Alphabetical Wise
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant='outline-success'>Save</Button>{' '}
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
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputGroup>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlTextarea1'
              >
                <Form.Control
                  placeholder='Content'
                  as='textarea'
                  name='content'
                  rows={3}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <div>
                {imagesId.length > 0
                  ? imagesId.map((item) => (
                      <div>
                        <Image
                          style={{
                            maxWidth: '100px',
                          }}
                          onClick={() => delImage(item)}
                          cloudName='adarsh022'
                          publicId={item}
                        />
                      </div>
                    ))
                  : ''}
              </div>
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
      </Container>
      {userNotesData.length > 0 ? (
        <div className='row d-flex justify-content-around mt-2 p-0'>
         
          {today.length>0?(    <h4
            className='text-decoration-underline'
            style={{ textAlign: 'left' }}
          >
            Today
          </h4>):''}
          {today
            ? today.map((item, index) =>
                item ? (
                  <>

                  {/* Delete Modal */}
                  <Modal show={Object.keys(deleteModal).length > 0}>
                  <Modal.Header>
                        <Modal.Title>
                         Are you sure that you want to delete this note
                        </Modal.Title>
                        <Modal.Footer>
                        <Button
                          variant='secondary'
                          onClick={() => setDeleteModal({})}
                        >
                          Cancel
                        </Button>
                        <Button variant='primary' onClick={Delete}>
                          Delete
                        </Button>
                          </Modal.Footer>
                    </Modal.Header>
                    </Modal>
                    
                  {/* Edit Modal */}
                    <Modal show={Object.keys(editItem).length > 0}>
                    <Modal.Header>
                        <Modal.Title>
                            <textarea cols="30" rows="1" onChange={(e) => setEditTitle(e.target.value) }>{editItem.title}</textarea>
                        </Modal.Title>
                    </Modal.Header>
                  < Modal.Body>
                    <textarea cols="48" rows="10" onChange={(e) => setEditContent(e.target.value)}>
                    {editItem.Content}
                    </textarea>
                  </Modal.Body>
                  <Modal.Footer>
                        <Button
                          variant='secondary'
                          onClick={() => setEditItem({})}
                        >
                          Close
                        </Button>

                        <Button variant='primary' onClick={UpdateNote}>
                          Save changes
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <Card
                      style={{ width: '18rem', borderRadius: '15px' }}
                      className='m-2'
                    >
                      <Card.Body>
                        <input
                          type='checkbox'
                          className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
                        ></input>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.Content}</Card.Text>
                        <Card.Link href='#' onClick={() => setDeleteModal({"id":item.id})}>
                          Delete
                        </Card.Link>
                        <Card.Link href='#' onClick={() => setEditItem(item)}>
                          Edit
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  </>
                ) : (
                  ''
                )
              )
            : ''}
            {yesterdayuserNotesData.length>0?(    <h4
            className='text-decoration-underline'
            style={{ textAlign: 'left' }}
          >
            Yesterday
          </h4>):''}
      
          {yesterdayuserNotesData.map((item, index) =>
            item ? (
              <>

              {/* Delete Modal */}
                <Modal show={Object.keys(deleteModal).length > 0}>
                  <Modal.Header>
                        <Modal.Title>
                         Are you sure that you want to delete this note
                        </Modal.Title>
                        <Modal.Footer>
                        <Button
                          variant='secondary'
                          onClick={() => setDeleteModal({})}
                        >
                          Cancel
                        </Button>
                        <Button variant='primary' onClick={Delete}>
                          Delete
                        </Button>
                          </Modal.Footer>
                    </Modal.Header>
                    </Modal>

                    {/* Edit Modal */}
                <Modal show={Object.keys(editItem).length > 0}>
                    <Modal.Header>
                        <Modal.Title>
                            <textarea cols="30" rows="1" onChange={(e) => setEditTitle(e.target.value) }>{editItem.title}</textarea>
                        </Modal.Title>
                    </Modal.Header>
                  < Modal.Body>
                    <textarea cols="48" rows="10" onChange={(e) => setEditContent(e.target.value)}>
                    {editItem.Content}
                    </textarea>
                  </Modal.Body>
                  <Modal.Footer>
                        <Button
                          variant='secondary'
                          onClick={() => setEditItem({})}
                        >
                          Close
                        </Button>

                        <Button variant='primary' onClick={UpdateNote}>
                          Save changes
                        </Button>
                    </Modal.Footer>
                    </Modal>


                <Card
                  style={{ width: '18rem', borderRadius: '15px' }}
                  className='m-2'
                >
                  <Card.Body>
                    <input
                      type='checkbox'
                      className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
                    ></input>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.Content}</Card.Text>
                    <Card.Link href='#' onClick={() => setDeleteModal({"id":item.id})}>
                      Delete
                    </Card.Link>
                    <Card.Link href='#' onClick={() => setEditItem(item)}>
                      Edit
                    </Card.Link>
                  </Card.Body>
                </Card>
              </>
            ) : (
              ''
            )
          )}
          
          {EarlieruserNotesData.length>0?(    <h4
            className='text-decoration-underline'
            style={{ textAlign: 'left' }}
          >
            Earlier Notes
          </h4>):''}
          {EarlieruserNotesData.map((item, index) =>
            item ? (
              <>

              {/* DeleteModal */}
                <Modal show={Object.keys(deleteModal).length > 0}>
                  <Modal.Header>
                        <Modal.Title>
                         Are you sure that you want to delete this note
                        </Modal.Title>
                        <Modal.Footer>
                        <Button
                          variant='secondary'
                          onClick={() => setDeleteModal({})}
                        >
                          Cancel
                        </Button>
                        <Button variant='primary' onClick={Delete}>
                          Delete
                        </Button>
                          </Modal.Footer>
                    </Modal.Header>
                    </Modal>

                {/* EditModal */}
                <Modal show={Object.keys(editItem).length > 0}>
                    <Modal.Header>
                        <Modal.Title>
                            <textarea cols="30" rows="1" onChange={(e) => setEditTitle(e.target.value) }>{editItem.title}</textarea>
                        </Modal.Title>
                    </Modal.Header>
                  < Modal.Body>
                    <textarea cols="48" rows="10" onChange={(e) => setEditContent(e.target.value)}>
                    {editItem.Content}
                    </textarea>
                  </Modal.Body>
                  <Modal.Footer>
                        <Button
                          variant='secondary'
                          onClick={() => setEditItem({})}
                        >
                          Close
                        </Button>

                        <Button variant='primary' onClick={UpdateNote}>
                          Save changes
                        </Button>
                    </Modal.Footer>
                    </Modal>

                <Card
                  style={{ width: '18rem', borderRadius: '15px' }}
                  className='m-2'
                >
                  <Card.Body>
                    <input
                      type='checkbox'
                      className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
                    ></input>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.Content}</Card.Text>
                    <Card.Link href='#' onClick={() => setDeleteModal({"id":item.id})}>
                      Delete
                    </Card.Link>
                    <Card.Link href='#' onClick={() => setEditItem(item)}>
                      Edit
                    </Card.Link>
                  </Card.Body>
                </Card>
              </>
            ) : (
              ''
            )
          )}
        </div>
      ) : (
        ''
      )}

      {/* {/* { console.log("length",userNotes.length)} */}
    </>
  );
}

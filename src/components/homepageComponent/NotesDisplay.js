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
  const { activeUser } = useContext(AuthContext);
  const uid = activeUser.uid;
  const [title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [newNote, setNewNote] = useState({});
  const [editItem, setEditItem] = useState({});
  let userNotesData = [];
  const [addImg, setAddImg] = useState('');
  // const [imagesId, setImagesId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [deleteModal, setDeleteModal] = useState({});
  const [delImg, setDelImg] = useState(false);
  let imagesId = '';

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
    const userId = editItem.id;

    const updatedNote = {
      id: editItem.id,
      title: title,
      Content: Content,
      Email: editItem.Email,
      Date: editItem.Date,
      img: delImg ? '' : editItem.img,
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
      .then(() => setNewNote(updatedNote))
      .catch(() => console.log('Error'));
    setEditItem({});
    setDelImg(false);
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
  };

  const AddNote = () => {
    const db = getDatabase();
    const id = Math.round(Math.random() * 100);

    set(ref(db, 'notes/' + activeUser.uid + '/' + id), {
      id: id,
      title: title,
      Content: Content,
      Email: activeUser.email,
      Date: Date(Date.now).toString().substr(0, 24),
      img: imagesId ? imagesId : '',
    })
      .then(
        setNewNote({
          id: id,
          title: title,
          Content: Content,
          Email: activeUser,
          Date: Date(Date.now).toString().substr(0, 15),
        })
      )
      .then(() => {
        UpdateNewNote();
        setTitle('');
        setContent('');
        setAddImg('');
        imagesId = '';
      })
      .catch(() => console.log('Error'));
  };

  const uploadImage = async () => {
    if (addImg) {
      const formData = new FormData();
      formData.append('file', addImg);
      formData.append('upload_preset', 'lmx0ng0b');
      await axios
        .post(
          'https://api.cloudinary.com/v1_1/adarsh022/image/upload',
          formData
        )
        .then((res) => {
          imagesId = res.data.url;
        });
    }
    AddNote();
  };

  const Delete = () => {
    const id = deleteModal.id;
    axios
      .delete(
        'https://react-project-1443c-default-rtdb.firebaseio.com/notes/' +
          uid +
          '/' +
          id +
          '.json'
      )
      .then(() => setNewNote({ delete: true }))
      .catch(() => console.log('Error Occurred'));
    setDeleteModal({});
  };

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

  let userNotes = [];
  let a = data
    ? Object.keys(data).map((item) => userNotes.push(data[item]))
    : '';
  userNotes.sort(compare);

  const [filteredData, setFilteredData] = useState(userNotes);

  useEffect(() => {
    const lowercasedValue = searchText?.toLowerCase().trim();
    if (lowercasedValue === '') setFilteredData(userNotes);
    else {
      const filteredData = userNotes.filter((item) =>
        item
          ? item.title.includes(searchText) || item.Content.includes(searchText)
          : ''
      );
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
        item
          ? item.Date.substr(0, 15) === Date(Date.now).toString().substr(0, 15)
          : ''
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
    ? userNotesData.filter((item, key) =>
        item ? item.Date.substr(0, 15) === yesterday : ''
      )
    : '';
  const EarlieruserNotesData = userNotesData
    ? userNotesData.filter((item, key) =>
        item
          ? item.Date.substr(0, 15) != yesterday &&
            item.Date.substr(0, 15) != Date(Date.now).toString().substr(0, 15)
          : ''
      )
    : '';
  return (
    <>
      <Container>
        <Row>
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
              onClick={uploadImage}
            >
              <RiAddLine size='1x' />
            </Button>
            <Card.Body>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Title'
                  aria-label='Default'
                  value={title}
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
                  value={Content}
                  rows={3}
                  onChange={(e) => setContent(e.target.value)}
                />
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
              </div>
            </Card.Body>
          </Card>
        </Row>
        <Row className='d-flex flex-row justify-content-center mt-3'></Row>
      </Container>
      {/* displaying input notes */}
      {userNotesData.length > 0 ? (
        <div className='row d-flex justify-content-around mt-2 p-0'>
          {today.length > 0 ? (
            <h4
              className='text-decoration-underline'
              style={{ textAlign: 'left' }}
            >
              Today
            </h4>
          ) : (
            ''
          )}
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
                        <Modal.Title style={{ width: '100%' }}>
                          <input
                            style={{ width: '100%' }}
                            value={editItem.title}
                            onChange={(e) => setEditTitle(e.target.value)}
                          ></input>
                        </Modal.Title>
                      </Modal.Header>
                      {editItem.img && (
                        <div className='d-flex justify-content-center align-item-center'>
                          <Image
                            style={{
                              maxWidth: '300px',
                            }}
                            cloudName='adarsh022'
                            publicId={editItem.img}
                          />
                        </div>
                      )}
                      <Modal.Body>
                        <textarea
                          style={{ width: '100%' }}
                          cols='48'
                          rows='10'
                          onChange={(e) => setEditContent(e.target.value)}
                        >
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
                        {editItem.img && (
                          <Button
                            variant={!delImg ? 'secondary' : 'info'}
                            onClick={() => setDelImg(!delImg)}
                          >
                            Delete Image
                          </Button>
                        )}
                        <Button variant='primary' onClick={UpdateNote}>
                          Save changes
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <Card
                      style={{
                        width: 'auto',
                        borderRadius: '15px',
                      }}
                      className='m-2 p-0'
                    >
                      <Card.Body className='d-flex' style={{ width: 'auto' }}>
                        {item.img && (
                          <div>
                            <Image
                              style={{
                                maxWidth: '150px',
                              }}
                              cloudName='adarsh022'
                              publicId={item.img}
                            />
                          </div>
                        )}
                        <div className='d-flex row justify-content-between align-item-center'>
                          <div
                            className=' text-center'
                            // style={{ marginLeft: '20px' }}
                          >
                            <Card.Title className='p-0'>
                              {item.title}
                            </Card.Title>
                            <Card.Text className='p-0'>
                              {item.Content}
                            </Card.Text>
                          </div>
                          <div
                            className='d-flex justify-content-around '
                            style={{ width: '100%' }}
                          >
                            <Card.Link
                              href='#'
                              onClick={() => setDeleteModal({ id: item.id })}
                            >
                              Delete
                            </Card.Link>
                            <Card.Link
                              href='#'
                              onClick={() => setEditItem(item)}
                            >
                              Edit
                            </Card.Link>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </>
                ) : (
                  ''
                )
              )
            : ''}
          {yesterdayuserNotesData.length > 0 ? (
            <h4
              className='text-decoration-underline'
              style={{ textAlign: 'left' }}
            >
              Yesterday
            </h4>
          ) : (
            ''
          )}

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
                    <Modal.Title style={{ width: '100%' }}>
                      <input
                        style={{ width: '100%' }}
                        value={editItem.title}
                        onChange={(e) => setEditTitle(e.target.value)}
                      ></input>
                    </Modal.Title>
                  </Modal.Header>
                  {editItem.img && (
                    <div className='d-flex justify-content-center align-item-center'>
                      <Image
                        style={{
                          maxWidth: '300px',
                        }}
                        cloudName='adarsh022'
                        publicId={editItem.img}
                      />
                    </div>
                  )}
                  <Modal.Body>
                    <textarea
                      style={{ width: '100%' }}
                      cols='48'
                      rows='10'
                      onChange={(e) => setEditContent(e.target.value)}
                    >
                      {editItem.Content}
                    </textarea>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant='secondary' onClick={() => setEditItem({})}>
                      Close
                    </Button>
                    {editItem.img && (
                      <Button
                        variant={!delImg ? 'secondary' : 'info'}
                        onClick={() => setDelImg(!delImg)}
                      >
                        Delete Image
                      </Button>
                    )}
                    <Button variant='primary' onClick={UpdateNote}>
                      Save changes
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Card
                  style={{
                    width: 'auto',
                    borderRadius: '15px',
                  }}
                  className='m-2 p-0'
                >
                  <Card.Body className='d-flex' style={{ width: 'auto' }}>
                    {item.img && (
                      <div>
                        <Image
                          style={{
                            maxWidth: '150px',
                          }}
                          cloudName='adarsh022'
                          publicId={item.img}
                        />
                      </div>
                    )}
                    <div className='d-flex row justify-content-between align-item-center'>
                      <div
                        className=' text-center'
                        // style={{ marginLeft: '20px' }}
                      >
                        <Card.Title className='p-0'>{item.title}</Card.Title>
                        <Card.Text className='p-0'>{item.Content}</Card.Text>
                      </div>
                      <div
                        className='d-flex justify-content-around '
                        style={{ width: '100%' }}
                      >
                        <Card.Link
                          href='#'
                          onClick={() => setDeleteModal({ id: item.id })}
                        >
                          Delete
                        </Card.Link>
                        <Card.Link href='#' onClick={() => setEditItem(item)}>
                          Edit
                        </Card.Link>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </>
            ) : (
              ''
            )
          )}

          {EarlieruserNotesData.length > 0 ? (
            <h4
              className='text-decoration-underline'
              style={{ textAlign: 'left' }}
            >
              Earlier Notes
            </h4>
          ) : (
            ''
          )}
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
                    <Modal.Title style={{ width: '100%' }}>
                      <input
                        style={{ width: '100%' }}
                        value={editItem.title}
                        onChange={(e) => setEditTitle(e.target.value)}
                      ></input>
                    </Modal.Title>
                  </Modal.Header>
                  {editItem.img && (
                    <div className='d-flex justify-content-center align-item-center'>
                      <Image
                        style={{
                          maxWidth: '300px',
                        }}
                        cloudName='adarsh022'
                        publicId={editItem.img}
                      />
                    </div>
                  )}
                  <Modal.Body>
                    <textarea
                      style={{ width: '100%' }}
                      cols='48'
                      rows='10'
                      onChange={(e) => setEditContent(e.target.value)}
                    >
                      {editItem.Content}
                    </textarea>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant='secondary' onClick={() => setEditItem({})}>
                      Close
                    </Button>
                    {editItem.img && (
                      <Button
                        variant={!delImg ? 'secondary' : 'info'}
                        onClick={() => setDelImg(!delImg)}
                      >
                        Delete Image
                      </Button>
                    )}

                    <Button variant='primary' onClick={UpdateNote}>
                      Save changes
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Card
                  style={{
                    width: 'auto',
                    borderRadius: '15px',
                  }}
                  className='m-2 p-0'
                >
                  <Card.Body className='d-flex' style={{ width: 'auto' }}>
                    {item.img && (
                      <div>
                        <Image
                          style={{
                            maxWidth: '150px',
                          }}
                          cloudName='adarsh022'
                          publicId={item.img}
                        />
                      </div>
                    )}
                    <div className='d-flex row justify-content-between align-item-center'>
                      <div
                        className=' text-center'
                        // style={{ marginLeft: '20px' }}
                      >
                        <Card.Title className='p-0'>{item.title}</Card.Title>
                        <Card.Text className='p-0'>{item.Content}</Card.Text>
                      </div>
                      <div
                        className='d-flex justify-content-around '
                        style={{ width: '100%' }}
                      >
                        <Card.Link
                          href='#'
                          onClick={() => setDeleteModal({ id: item.id })}
                        >
                          Delete
                        </Card.Link>
                        <Card.Link href='#' onClick={() => setEditItem(item)}>
                          Edit
                        </Card.Link>
                      </div>
                    </div>
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
    </>
  );
}

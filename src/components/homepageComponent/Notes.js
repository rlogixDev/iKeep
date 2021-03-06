import React, { useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';

export default function Notes({data}) {
  console.log("Notes data",data);
  const date=data[0].Date;
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const extractedDate=date.substr(4,6)
  console.log("date",date);
  const today=data.filter((item,key) =>  (item.Date  === Date(Date.now).toString().substr(0,15) ) )

  const yesDay = days[new Date().getDay()-1].substr(0,3);
  const yesMon=monthNames[new Date().getMonth()].substr(0,3);
  const yesYear=new Date().getFullYear();
  const yesDate=new Date().getDate()-1;
  const yesterday=yesDay + " " + yesMon + " " + yesDate + " " + yesYear;
  const yesterdayData=data.filter((item,key) =>  (item.Date  === yesterday ) )
  console.log("yesterday",yesterday);
  return (
    
    <div className='row d-flex justify-content-around mt-2 p-0'>
      <h4 className='text-decoration-underline' style={{ textAlign: 'left' }}>
        Today
      </h4>
      {today.map((data, index) => (
        <>
          <Card  style={{ width: '18rem', borderRadius: '15px' }} className='m-2'>
            <Card.Body>
              <input
                type='checkbox'
                className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
              ></input>
              <Card.Title >{data.title}</Card.Title>
              <Card.Text >{data.Content}</Card.Text>
              <Card.Link href='#'>Delete</Card.Link>
              <Card.Link href='#'>Edit</Card.Link>
            </Card.Body>
          </Card>
        </>
      ))}
      <h4 className='text-decoration-underline' style={{ textAlign: 'left' }}>
        Yesterday
      </h4>
      {yesterdayData.map((data, index) => (
        <>
          <Card  style={{ width: '18rem', borderRadius: '15px' }} className='m-2'>
            <Card.Body>
              <input
                type='checkbox'
                className='position-absolute top-0 start-100 translate-middle rounded-circle p-0 border-0'
              ></input>
              <Card.Title >{data.title}</Card.Title>
              <Card.Text >{data.Content}</Card.Text>
              <Card.Link href='#'>Delete</Card.Link>
              <Card.Link href='#'>Edit</Card.Link>
            </Card.Body>
          </Card>
        </>
      ))}
    </div>
  );
}

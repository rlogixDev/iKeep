import React, { useState, useEffect } from 'react';
import Main from '../../components/homepageComponent/Main';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Homepage() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    try {
      console.log(location.state.user);
    } catch (err) {
      console.log(err);
      history.push('/');
    }
  }, []);

  return (
    <>
      <Main />
    </>
  );
}

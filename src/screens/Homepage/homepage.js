import React, { useState, useEffect } from 'react';
import Main from '../../components/homepageComponent/Main';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Homepage() {
  const history = useHistory();
  const location = useLocation();
  const [accessToken, setAccessToken] = useState();

  // useEffect(() => {
  //   try {
  //     setAccessToken(location.state.accessToken);
  //   } catch (err) {
  //     console.log(err)
  //     history.push('/');
  //   }
  // }, []);

  return (
    <>
      <Main />
    </>
  );
}

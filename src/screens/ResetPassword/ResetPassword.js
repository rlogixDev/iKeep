import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.css';
import { getAuth } from 'firebase/auth';
import authApp from '../../firebase';

export default function ResetPassword() {
  const [username, setUserName] = useState();
  const auth = getAuth(authApp);

  async function handleSubmit() {
    //   await
  }

  return (
    <div>
      <div id='ResetPassword'>
        <form className='container mx-auto col-4 d-flex justify-content-center flex-column'>
          <h3>Rest Password</h3>
          <div className='row justify-content-start ResetPassword-row pt-4'>
            <div className='col align-self-start pt-1'>
              <div className='form-group p-2 '>
                <label>Email address</label>
              </div>
            </div>
            <div className='col-8'>
              <div className='form-group p-2 '>
                <input
                  type='email'
                  className='form-control'
                  name='username'
                  placeholder='Enter email'
                  onChange={(e) => setUserName(e.target.value)}
                />
                {!username && <p className='error'>*Enter email</p>}
              </div>
            </div>
          </div>
          <div id='ResetPassword-buttons' className='row justify-content-end '>
            <div>
              <button
                variant='primary'
                type='button'
                className='btn btn-primary btn-lg btn-block'
                onClick={() => handleSubmit()}
              >
                Reset Password
              </button>
            </div>
          </div>

          <div className='row '>
            <div></div>
            <p className='link'>
              Login with new Password <Link to='/'>Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import authApp from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState();
  const history = useHistory();

  const [password, setPassword] = useState();
  const [currentUser, setCurrentUser] = useState();
  // const  {login}  = useAuth()
  const [error, setError] = useState();
  const [disabled, disableButton] = useState(true);
  const auth = getAuth(authApp);

  async function handleSubmit() {
    await signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        console.log(
          'user logged in via email/password',
          currentUser.auth.currentUser.email
        );
        history.push('/homepage');
      })
      .catch((error) => {
        const errorMessage = error.code;
        setError('**INVALID CREDENTIALS**');
      });
  }
  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );

  return (
    <div>
      <div id='login'>
        <form className='container mx-auto col-4 d-flex justify-content-center flex-column'>
          <h3>Sign In</h3>
          <div className='row justify-content-start login-row pt-4'>
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
          <div className='row justify-content-start login-row'>
            <div className='col align-self-start pt-1'>
              <div className='form-group p-2 '>
                <label>Password</label>
              </div>
            </div>
            <div className='col-8'>
              <div className='form-group p-2'>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!password && <p className='error'>*Enter password</p>}
              </div>
            </div>
          </div>
          <div id='login-buttons' className='row justify-content-center '>
            <div>
              {/* <Link to="/homepage"> */}
              <button
                variant='primary'
                type='button'
                className='btn btn-primary btn-lg btn-block'
                onClick={() => handleSubmit()}
                disabled={!username | !password}
              >
                {' '}
                Submit
              </button>
              {/* </Link> */}
            </div>
            <p className='error'>{error}</p>
            <p className='link'>
              Forgot Password? <Link to='/resetPassword'>Reset Password</Link>
            </p>
          </div>

          <div className='row '>
            <ColoredLine color='red' />
            <div>
              <button
                variant='primary'
                type='submit'
                className='btn btn-light btn-md pr-10'
                onClick={() => handleGoogleSignIn()}
              >
                {' '}
                <img
                  src='https://e7.pngegg.com/pngimages/114/607/png-clipart-g-suite-pearl-river-middle-school-google-software-suite-email-sign-up-button-text-logo-thumbnail.png'
                  width='50'
                  radius='10'
                  alt='google'
                />
                Sign in With Google
              </button>
            </div>
            <p className='link'>
              New to IKeep? <Link to='/signup'>Join now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

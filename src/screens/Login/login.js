import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import './login.css';
import {
  getAuth,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import authApp from '../../firebase';

export const Login = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  //   const [otp, setOtp] = useState();
  //   const [enterOtp, setEnterOtp] = useState();
  const [currentUser, setCurrentUser] = useState();
  //   const [recaptchaVerifie, setRecaptchaVerifie] = useState();
  //   const [confirmationResultOtp, setConfirmationResultOtp] = useState();

  const auth = getAuth();
  let history = useHistory();

  /////////////////////////////////////////////////OTP////////////////////////////////////

  //   const setUpRecaptcha = () => {
  //     let recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  //       size: 'invisible',
  //       callback: function (response) {
  //         console.log('Captcha Resolved');
  //         this.onSignInSubmit();
  //       },
  //       defaultCountry: 'IN',
  //     });
  //     setRecaptchaVerifie(recaptchaVerifier);
  //   };

  //   const onSignInSubmit = (e) => {
  //     e.preventDefault();
  //     setUpRecaptcha();
  //     let phoneNumber = '+91' + this.state.mobile;
  //     console.log(phoneNumber);
  //     let appVerifier = recaptchaVerifie;
  //     authApp
  //       .auth()
  //       .signInWithPhoneNumber(phoneNumber, appVerifier)
  //       .then(function (confirmationResult) {
  //         // SMS sent. Prompt user to type the code from the message, then sign the
  //         // user in with confirmationResult.confirm(code).
  //         setConfirmationResultOtp(confirmationResult);
  //         // console.log(confirmationResult);
  //         console.log('OTP is sent');
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };

  //   const onSubmitOtp = (e) => {
  //     e.preventDefault();
  //     let otpInput = this.state.otp;
  //     let optConfirm = confirmationResultOtp;
  //     // console.log(codee);
  //     optConfirm
  //       .confirm(otpInput)
  //       .then(function (result) {
  //         // User signed in successfully.
  //         // console.log("Result" + result.verificationID);
  //         let user = result.user;
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         alert('Incorrect OTP');
  //       });
  //   };

  /////////////////////////////////////////////////OTP////////////////////////////////////

  //   const otpCheck = () => {
  //     if (otp === enterOtp) {
  //       toast.success(` logged in!`);
  //       history.push({
  //         pathname: '/homepage',
  //         state: { currentUser: user.email, user: user },
  //       });
  //     }
  //   };

  const handleSubmit = (e, currentUser) => {
    e.preventDefault();
    // debugger;
    // const re = /^[0-9\b]+$/;
    // if (username.length === 10 && re.test(username)) {
    //   setOtp(Math.floor(Math.random() * 9999));
    //   otpCheck();
    //   return;
    // }
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        // if (username.length === 10 && re.test(username)) {
        //   setOtp(Math.floor(Math.random() * 9999));
        //   otpCheck();
        //   return;
        // }
        toast.success(`User ${user.email} logged in!`);
        // history.push("/homepage");
        console.log(user);
        history.push({
          pathname: '/homepage',
          state: { currentUser: user.email, user: user },
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(errorMessage);
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
          {/* {
            <Alert variant='primary'>
              Enter Otp{' '}
              <input onChange={(e) => setEnterOtp(e.target.value)}></input>
              <button onClick={() => otpCheck()}>submit</button>
            </Alert>
          } */}
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
          <div id='login-buttons' className='row justify-content-center'>
            <div>
              {/* <Link to="/homepage"> */}
              <button
                variant='primary'
                type='button'
                className='btn btn-primary btn-lg btn-block'
                onClick={(e) => handleSubmit(e)}
                disabled={!username | !password}
              >
                <div id='recaptcha-container'></div> Submit
              </button>
              {/* </Link> */}
            </div>

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
};

export default Login;

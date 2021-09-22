
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import './login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import authApp from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Redirect } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
export const Login = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [currentUser, setCurrentUser] = useState();

    const auth = getAuth(authApp);
    let history = useHistory();
    const activeUser = useContext(AuthContext)

    const handleSubmit = (e, currentUser) =>{
        e.preventDefault();
        // debugger;
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setCurrentUser(user);
                toast.success(`User ${user.email} logged in!` );
                history.push("/homepage");
                // history.push({
                //     pathname: '/homepage',
                //     state: { currentUser:user.email }
                // });
         
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    }

    async function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user)
            }).catch((error) => {
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                toast.error(errorMessage);
            });
    }

    if(activeUser){
        return <Redirect to="/homepage" />
   
       }

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    return (
        <div>
            <div id="login" >
                <form className="container mx-auto col-4 d-flex justify-content-center flex-column">
                    <h3>Sign In</h3>
                    <div className="row justify-content-start login-row pt-4">
                        <div className="col align-self-start pt-1">
                            <div className="form-group p-2 ">
                                <label>Email address</label>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-group p-2 ">
                                <input type="email" className="form-control" name="username" placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
                                {!username && <p className="error">*Enter email</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start login-row">
                        <div className="col align-self-start pt-1">
                            <div className="form-group p-2 ">
                                <label>Password</label>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-group p-2">
                                <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                                {!password && <p className="error">*Enter password</p>}
                            </div>
                        </div>
                    </div>
                    <div id="login-buttons" className="row justify-content-center">
                        <div >
                            {/* <Link to="/homepage"> */}
                            <button variant="primary" type="button" className="btn btn-primary btn-lg btn-block" onClick={(e) => handleSubmit(e)} disabled={!username | !password}> Submit</button>
                            {/* </Link> */}
                        </div>

                        <p className="link">Forgot Password? <Link to="/resetPassword">Reset Password</Link></p>

                    </div>

                    <div className="row ">
                        <ColoredLine color="red" />
                        <div >
                            <button variant="primary" type="submit" className="btn btn-light btn-md pr-10" onClick={() => handleGoogleSignIn()}> <img src="https://e7.pngegg.com/pngimages/114/607/png-clipart-g-suite-pearl-river-middle-school-google-software-suite-email-sign-up-button-text-logo-thumbnail.png" width="50" radius="10" alt="google" />
                                Sign in With Google</button>
                        </div>
                        <p className="link">New to IKeep? <Link to="/signup">Join now</Link></p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login;
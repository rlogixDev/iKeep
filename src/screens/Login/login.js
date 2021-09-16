
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import './login.css';

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const  {login}  = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {      
        try {
          setError("")
          setLoading(true)
          await login(username,password);
        } catch {
          setError("Failed to log in")
          console.log('error in login', error)
        }
        setLoading(false)
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
                                <input type="email" className="form-control" name="username"  placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
                                {!username&& <p className="error">*Enter email</p>}
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
                                <input type="password" className="form-control" name="password"  placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                                {!password && <p className="error">*Enter password</p>}
                            </div>
                        </div>
                    </div>
                    <div id="login-buttons" className="row justify-content-end ">
                        <div >
                            <button variant="primary" type="button" className="btn btn-primary btn-lg btn-block" onClick={()=>handleSubmit()} disabled={loading}>Submit</button>
                        </div>
                    </div>

                    <div className="row ">
                        <ColoredLine color="red" />
                        <div >
                            <button variant="primary" type="submit" className="btn btn-light btn-md pr-10"> <img src="https://e7.pngegg.com/pngimages/114/607/png-clipart-g-suite-pearl-river-middle-school-google-software-suite-email-sign-up-button-text-logo-thumbnail.png" width="50" radius="10" alt="google" />
                                Sign in With Google</button>
                        </div>
                        <p className="link">New to IKeep? <Link to="/signup">Join now</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

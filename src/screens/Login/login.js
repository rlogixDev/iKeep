import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import './login.css';

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        const credentials = ({
            username,
            password
        });
        console.log("user credentials", credentials)
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
                <form onSubmit={handleSubmit} className="container mx-auto col-4 d-flex justify-content-center flex-column">
                    <h3>Sign In</h3>
                    <div className="row justify-content-start login-row pt-4">
                        <div className="col align-self-center">
                            <div className="form-group p-2 ">
                                <label>Email address</label>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-group p-2 ">
                                <input type="email" className="form-control" placeholder="Enter email" required onChange={e => setUserName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start login-row">
                        <div className="col align-self-center">
                            <div className="form-group p-2 ">
                                <label>Password</label>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-group p-2">
                                <input type="password" className="form-control" placeholder="Enter password" required onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div id="login-buttons" className="row justify-content-end ">
                        <div >
                            <button variant="primary" type="button" className="btn btn-primary btn-lg btn-block">Submit</button>
                        </div>
                    </div>
                    
                    <div className="row ">
                    <ColoredLine color="red" />
                        <div >
                            <button variant="primary" type="submit" className="btn btn-light btn-md pr-10"> <img src="https://e7.pngegg.com/pngimages/114/607/png-clipart-g-suite-pearl-river-middle-school-google-software-suite-email-sign-up-button-text-logo-thumbnail.png" width="50" radius="10" />
                                Sign in With Google</button>
                        </div>
                        <p className="link">New to IKeep? <a href="#">Join now</a></p>
                    </div>
                </form>

            </div>
        </div>
    )
}

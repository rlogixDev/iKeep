
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const state = {
        fields: {
            username: '',
            password: ''
        },
        errors: {
            username: '',
            password: '',
        }
    };
    const validate = (name, value) => {
        switch (name) {
            case "username":
                if (!value) {
                    return "Email is Required";
                } else {
                    return "";
                }
            case "password":
                if (!value) {
                    return "Password is Required";
                } else {
                    return "";
                }
            default: {
                return "";
            }
        }
    }
    setUserName = e => {
        this.setState({
          errors: {
            ...this.state.errors,
            [e.target.name]: this.validate(e.target.name, e.target.value)
          },
          fields: {
            ...this.state.fields,
            [e.target.name]: e.target.value
          }
        });
      };

    const handleSubmit = e => {
        console.log("fucntion called")
        e.preventDefault();
        const credentials = ({
            username,
            password
        });
        
        state.setState({
            errors: {
                ...state.errors,
                [e.target.name]: validate(e.target.name, e.target.value)
            },
            fields: {
                ...state.fields,
                [e.target.name]: e.target.value
            }
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
                                <input type="email" className="form-control"  name="username" value={username}  placeholder="Enter email" required onChange={e => setUserName(e.target.value)} />
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
                                <input type="password" className="form-control"  name="password" value={password} placeholder="Enter password" required onChange={e => setPassword(e.target.value)} />
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

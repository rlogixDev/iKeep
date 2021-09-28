import React from "react";
import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

const ResetPassword = () => {
  const [username, setUserName] = useState();
  const handleSubmit = (e, currentUser) => {
    e.preventDefault();
    console.log("reset password");
  };
  return (
    <div>
      <div>
        <div id="login">
          <form className="container mx-auto col-4 d-flex justify-content-center flex-column">
            <h3>Rest your Password</h3>
            <div className="row justify-content-start login-row pt-4">
              <div className="col align-self-start pt-1">
                <div className="form-group p-2 ">
                  <label>Email address</label>
                </div>
              </div>
              <div className="col-8">
                <div className="form-group p-2 ">
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    placeholder="Enter email"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {!username && <p className="error">*Enter email</p>}
                </div>
              </div>
            </div>


            <div id="login-buttons" className="row justify-content-center">
              <div>
                <button
                  variant="primary"
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={(e) => handleSubmit(e)}
                  disabled={!username}
                >
                  {" "}
                  Submit
                </button>
              </div>
              <p className="link">
               Login now.. <Link to="/">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

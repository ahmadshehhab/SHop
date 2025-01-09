import React from 'react'
import "./confirm.css"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Confirm = () => {
    const [email, setEmail] = useState("");
    const [confirmationCode, setconfirmationCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const addUser = async () => {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios
        .post(
          "https://ahmadshehab19951995.pythonanywhere.com/prof/register/confirm/",
          {
            email: state?.email,
            code: confirmationCode,
           
          },
          { headers }
        )
        .then(() => navigate("/home/login"))
        .catch((err) => {
          setError(err.response.data.error);
          console.log(err.response.data.error)
        });
      //await axios.get('http://localhost:3001/products').then(data => console.log(data))
    };

  return (
    <>
          <div id="container" className="container-fluied cf sign-up">
            <div className="row rw">
              <div className="col cl align-items-center flex-col sign-up">
                <div className="form-wrapper align-items-center">
                  <div className="form sign-up">
                    
                    <div className="input-group email-comp">
                      <i className="bx bx-mail-send"></i>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="emailInput"
                        disabled
                        value={state?.email}
                      />
                    </div>
                    <div className="input-group">
                      <i className="bx bxs-lock-alt"></i>
                      <input
                        type="password"
                        placeholder="Enter Confirmation Code"
                        name="password"
                        onChange={(e) => setconfirmationCode(e.target.value)}
                      />
                    </div>
    
                    
    
                    <button onClick={addUser}>Confirm</button>
                    <div className="text-danger">
  {error}
</div>
                    <p>
                      <span className="text-dark">Already have an account?</span>
                      <b /* onclick="toggle()" */ className="pointer text-dark">
                        <Link to="/home/login">Sign in here</Link>
                      </b>
                    </p>
                  </div>
                </div>
              </div>
    
              <div className="col cl align-items-center flex-col sign-in">
                <div className="form-wrapper align-items-center">
                  <div className="form sign-in">
                    <div className="input-group">
                      <i className="bx bxs-user"></i>
                      <input type="text" placeholder="Username" />
                    </div>
                    <div className="input-group">
                      <i className="bx bxs-lock-alt"></i>
                      <input type="password" placeholder="Password" />
                    </div>
                    <button>Sign in</button>
                    <p>
                      <b>Forgot password?</b>
                    </p>
                    <p>
                      <span>Don't have an account?</span>
                      <b /* onclick="toggle()" */ className="pointer">
                        Sign up here
                      </b>
                    </p>
                  </div>
                </div>
                <div className="form-wrapper"></div>
              </div>
            </div>
    
            <div className="row content-row">
              <div className="col cl align-items-center flex-col">
                <div className="text sign-in">
                  <h2>Welcome</h2>
                </div>
                <div className="img sign-in"></div>
              </div>
    
              <div className="col cl align-items-center flex-col">
                <div className="img sign-up"></div>
                <div className="text sign-up">
                  <h2>Join with us</h2>
                </div>
              </div>
            </div>
          </div>
        </>
  )
}

export default Confirm
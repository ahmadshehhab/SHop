import React, { useState, useEffect } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Auth = () => {
  const container = document.getElementById("container");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [company, setCompany] = useState("false");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const sin = () => {
    container.classList.add("sign-in");
    container.classList.remove("sign-up");
  };
  const sout = () => {
    container.classList.add("sign-up");
    container.classList.remove("sign-in");
  };
  const addUser = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .post(
        "https://ahmadshehab19951995.pythonanywhere.com/prof/register/",
        {
          username: username,
          email: email,
          password: password,
          "user_type": usertype,
          address:address,
          company: company,
          phone: phone,
        },
        { headers }
      )
      .then(() => navigate("/home/register/confirm" , {state:{email:email}}))
      .catch((err) =>{ setError(err.response.data[Object.keys(err.response.data)[0]][0]); });
    //await axios.get('http://localhost:3001/products').then(data => console.log(data))
  };

  return (
    <>
      <div id="container" className="container-fluied cf sign-up">
        <div className="row rw">
          <div className="col cl align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-group email-comp">
                  <i className="bx bx-mail-send"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="emailInput"
                  />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="phone"
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
								<div className="input-group">
  <i className='bx bxs-user'></i>
  <select 
    value={usertype}
    onChange={(e) => setUsertype(e.target.value)}
  >
    <option value="" disabled>Select User Type</option>
    <option value="worker">Worker</option>
    <option value="homeowner">Home Owner</option>
    <option value="company">Company</option>
  </select>
  <select 
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  >
    <option value="" disabled>Select City</option>
    <option value="Jenin">Jenin</option>
    <option value="Tulkarm">Tulkarm</option>
    <option value="Ramallah">Ramallah</option>
    <option value="Nablus">Nablus</option>
    <option value="Hebron">Hebron</option>
  </select>
</div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt">is Company</i>
                  <input
                    type="checkbox"
                    placeholder="Company"
                    name="company"
                    onChange={(e) => setCompany(e.target.checked)}
                  />
                </div>

                <button onClick={addUser}>Sign up</button>
                <div className="text-danger">
  {error }
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
  );
};

export default Auth;

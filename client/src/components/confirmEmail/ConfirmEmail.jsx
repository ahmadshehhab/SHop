import React from 'react'
import "./confirmEmail.css"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const ConfirmEmail = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [Action, setAction] = useState("");
    const getQueryParams = () => {
      const params = new URLSearchParams(location.search);
      const email = params.get('email');
      const companyId = params.get('company_id');
      const w_id = params.get('worker_id');
      return { email, companyId , w_id};
    };
    const { email, companyId ,w_id } = getQueryParams();
    const actionsList = ["accept", "reject"]
    const Handle = async () => {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios
        .post(
          "https://ahmadshehab19951995.pythonanywhere.com/prof/handle-invitation/",
          {
            email: email,
            company_id: companyId,
            action: Action
           
          },
          { headers }
        ).catch(e =>console.log(e))
        
        await axios.post(`https://ahmadshehab19951995.pythonanywhere.com/prof/chats/`,  { participants: [companyId, w_id] } , {headers}).catch(e => console.log(e))
        .then(res => console.log(res)).then(navigate('/home/'))
        .catch((err) => {
          setError(err);
          console.log(err)
        });
        console.log(error)
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
                        className="emailInput"
                        disabled
                        value={email}
                      />
                       <select 
    value={Action}
    onChange={(e) => setAction(e.target.value.toLowerCase())}
    className='btn btn-group'
  >
    <option value="" disabled>
    Select
  </option>
    {actionsList?.map(e => (<>
    <option value={e} >{e.toUpperCase()}</option>
    </>))}
  </select>
                    </div>
                   
    
                    
    
                    <button onClick={Handle}>Confirm</button>
                    <div className="text-danger">
  {error}
</div>
                    
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

export default ConfirmEmail
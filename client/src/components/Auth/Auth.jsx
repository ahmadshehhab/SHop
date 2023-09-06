import React, { useState,useEffect} from 'react'
import './Auth.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Auth = () => {
    const container = document.getElementById('container')
	const [username,setUsername] = useState('')
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate();

    const sin = () => {
        container.classList.add('sign-in')
        container.classList.remove('sign-up')
    }
	const sout = () => {
        
        container.classList.add('sign-up')
		container.classList.remove('sign-in')
    }
	const addUser = async () => {
		const headers = {
			'Content-Type': 'application/json'
		};
       await axios.post('http://localhost:3001/register', {
			username: username,
			email:email,
			password:password
	},{headers}).then(() => navigate('/home/login')).catch(err => setError(err.response.data))
	//await axios.get('http://localhost:3001/products').then(data => console.log(data))
        
    }
	

  return (
    <>
   <div id="container" className="container-fluied cf sign-up">
		
		<div className="row rw">
			
			<div className="col cl align-items-center flex-col sign-up">
				<div className="form-wrapper align-items-center">
					<div className="form sign-up">
						<div className="input-group">
							<i className='bx bxs-user'></i>
							<input type="text" placeholder="Username" name='username' onChange={(e) => setUsername(e.target.value)}/>
						</div>
						<div className="input-group">
							<i className='bx bx-mail-send'></i>
							<input type="email" placeholder="Email" name='email' onChange={(e) => setEmail(e.target.value)}/>
						</div>
						<div className="input-group">
							<i className='bx bxs-lock-alt'></i>
							<input type="password" placeholder="Password" name='password' onChange={(e) => setPassword(e.target.value)}/>
						</div>
						<div className="input-group">
							<i className='bx bxs-lock-alt'></i>
							<input type="password" placeholder="Confirm password"/>
						</div>
						<button onClick={addUser}>
							Sign up
						</button>
						<div className="text-danger">{error}</div>
						<p>
							<span className='text-dark'>
								Already have an account?
							</span>
							<b /* onclick="toggle()" */ className="pointer text-dark" >
							<Link to='/home/login'>Sign in here</Link>
								
							</b>
						</p>
					</div>
				</div>
			
			</div>
		
			<div className="col cl align-items-center flex-col sign-in">
				<div className="form-wrapper align-items-center">
					<div className="form sign-in">
						<div className="input-group">
							<i className='bx bxs-user'></i>
							<input type="text" placeholder="Username"/>
						</div>
						<div className="input-group">
							<i className='bx bxs-lock-alt'></i>
							<input type="password" placeholder="Password"/>
						</div>
						<button>
							Sign in
						</button>
						<p>
							<b>
								Forgot password?
							</b>
						</p>
						<p>
							<span>
								Don't have an account?
							</span>
							<b /* onclick="toggle()" */ className="pointer">
								Sign up here
							</b>
						</p>
					</div>
				</div>
				<div className="form-wrapper">
		
				</div>
			</div>
		
		</div>
		
		<div className="row content-row">
		
			<div className="col cl align-items-center flex-col">
				<div className="text sign-in">
					<h2>
						Welcome
					</h2>
	
				</div>
				<div className="img sign-in">
		
				</div>
			</div>
		
			<div className="col cl align-items-center flex-col">
				<div className="img sign-up">
				
				</div>
				<div className="text sign-up">
					<h2>
						Join with us
					</h2>
	
				</div>
			</div>
			
		</div>
		
	</div>
    </>
  )
}

export default Auth
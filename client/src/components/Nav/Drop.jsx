import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './Nav.css'
import { Link , useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios"
export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [count, setcount] = useState('');
  const token = JSON.parse(localStorage.getItem("login")).token;
  const decoded = jwt_decode(token);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);   
  };
  const deleteToken = () => {
    localStorage.removeItem('login')
    localStorage.removeItem('user_type')
    localStorage.removeItem('username')

  }
  const login = () => {
    navigate('/home/login')
  }
  const getcount = async () => {
    if(localStorage.getItem('user_type') == 'homeowner'){
     try {
      await axios.get(`https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?homeowner=${decoded.user_id}`).then(res => setcount(res.data.length))
     } catch (error) {
      
     }
    } else if(localStorage.getItem('user_type') == 'worker'){
      try {
        await axios.get(`https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?is_accepted=${decoded.user_id}&status=active`).then(res => setcount(res.data.length))
       } catch (error) {
        
       }
    }
  }
   useEffect(() => {
     getcount();
   }, []);
 
  return (
    <>
       {JSON.parse(localStorage.getItem('login')) ?
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="p-0 m-0"
      >
        <div className="con">
        <i className="fa fa-fw fa-user text-dark mr-3"></i>

        <span className="position-absolute top-0 left-100 right-0 translate-middle badge rounded-pill bg-light text-dark">{count || ' '}</span>
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Link to="/home/profile">Profile</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/home/login" onClick={deleteToken}>Logout</Link></MenuItem>
      </Menu>
    </div>
       : <div>
       <Button
         id="basic-button"
         aria-controls={open ? 'basic-menu' : undefined}
         aria-haspopup="true"
         aria-expanded={open ? 'true' : undefined}
         onClick={login}
         className="p-0 m-0"
       >
         <div className="con">
         <i className="fa fa-fw fa-sign-in text-dark mr-3"></i>
 
        </div>
       </Button>
       
     </div>
}</>
  );
}

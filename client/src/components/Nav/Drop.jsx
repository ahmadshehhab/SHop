import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './Nav.css'
import { Link , useNavigate } from 'react-router-dom';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  }
  const login = () => {
    navigate('/home/login')
  }

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

        <span className="position-absolute top-0 left-100 right-0 translate-middle badge rounded-pill bg-light text-dark">+99</span>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
      
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

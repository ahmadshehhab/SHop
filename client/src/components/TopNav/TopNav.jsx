import React from 'react'
import './TopNav.css'
import  { useState, useEffect } from "react";
const TopNav = () => {
    const [username, setUsername] = useState("");
    const [user_type, setuser_type] = useState("");
      useEffect(() => {
        setUsername(localStorage.getItem('username'));
        setuser_type(localStorage.getItem('user_type'))
      }, [username]);
  return (
    <>
   
       <nav className="navbar navbar-expand-lg bg-darke navbar-light d-none d-lg-block" id="templatemo_nav_top">
        
        <div className="container-sm text-light">
            <div className="w-100 d-flex justify-content-between">
                <div>
                    <i className="fa fa-user mx-2"></i>
                    <a className="navbar-sm-brand text-light text-decoration-none" href="mailto:ahmadshehab11177@gmail.com">{username}</a>
                    <i className="fa fa-bolt mx-2"></i>
                    <a className="navbar-sm-brand text-light text-decoration-none" href="tel:970-592-753-581">{user_type}</a>
                </div>
                <div>
                    <a className="text-light" href="https://www.facebook.com/profile.php?id=100074914449495" target="_blank" rel="sponsored"><i className="fa-facebook fa fa-lg fa-fw me-2"></i></a>
                    <a className="text-light" href="https://www.facebook.com/profile.php?id=100074914449495" target="_blank"><i className="fa fa-instagram fa-sm fa-fw me-2"></i></a>
                    <a className="text-light" href="https://www.facebook.com/profile.php?id=100074914449495" target="_blank"><i className="fa fa-twitter fa-sm fa-fw me-2"></i></a>
                    <a className="text-light" href="https://www.facebook.com/profile.php?id=100074914449495" target="_blank"><i className="fa fa-linkedin fa-sm fa-fw"></i></a>
                </div>
            </div>
        </div>
        
    </nav>
    </>
  )
}

export default TopNav
import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'
import Drop from './Drop'
const Nav = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container-sm d-flex justify-content-between align-items-center  ">

            <Link className="navbar-brand text-success logo h1 align-self-center" to="/home">
            Professionals
            </Link>

            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                <div className="flex-fill">
                    <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/workers-post">{localStorage.getItem("user_type") == "worker" ? "Posts" : "workers"}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar align-self-center d-flex">
                    
                    
                   
                    <a className="nav-icon position-relative text-decoration-none" href="#">
                        <Drop/>
                        
                    </a>
                </div>
            </div>

        </div>
    </nav>
    </>
  );
};

export default Nav;

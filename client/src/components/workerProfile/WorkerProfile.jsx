import React from 'react'
import Content from './Content/Content'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const WorkerProfile = () => {
  const navigate = useNavigate();
    const [error, setError] = useState('')
    const [data, setData] = useState([])
    const { id } = useParams();
    const token = JSON.parse(localStorage.getItem("login")).token;
    const decoded = jwt_decode(token);
    const getDonePosts = async () => {
      const headers = {
        'Content-Type': 'application/json'
      };
         await axios.get(`https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?status=done&is_accepted=${id}`,{headers}).then(res => {
          console.log(res.data)
          setData(res.data.filter(e => e.id != id))
          console.log(res.data)
         }).catch(err => {setError(err.response.data[Object.keys(err.response.data)[0]][0]); console.log(err.response.data)})
      }
  
     useEffect(() => {
       getDonePosts()
       
     }, [])
  return (
    <>
    
    <Content/>
     <section className="bg-light">
            <div className="container-sm py-5">
                <div className="row text-center py-3">
                    <div className="col-lg-6 m-auto">
                        <h1 className="h1">Job History</h1>
                        <p>
                            
                        </p>
                        <div className="text-danger">
      {error }
    </div>
                    </div>
                </div>
                <div className="row">
                    {data.map(e => (<>
                        <div className="col-12 col-md-4 mb-4">
                        <div className="card h-100">
                    <Link to={`/home/details/${e.id}`}>
                            <a href="shop-single.html">
                                <img src={e.image} className="card-img-top prof-post-image" alt="..." />
                            </a>
                            <div className="card-body">
                              
                                <a href="shop-single.html" className="h2 text-decoration-none text-dark">{e.title}</a>
                                <p className="card-text prof-desc">
                                   {e.description}
                                </p>
                               
                            </div>
                           
                    </Link>
                  
                        </div>
                    
                    </div>
                    </>))}
                    
                   
                    
                </div>
            </div>
        </section>



    
    </>
  )
}

export default WorkerProfile
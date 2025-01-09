import React from 'react'
import Content from './Content/Content'
import { useState, useEffect } from "react";
import profile from "../../assets/img/profile.jpg";
import axios from "axios"
import "./AllShop.css"
const AllShop = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState([])
    const [uri, setUri] = useState();
    const [worker, setworker] = useState();
    const token = JSON.parse(localStorage.getItem("login")).token;
    const formData = new FormData();
    
    const submitPost = async (id) => {
      const headers = {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "multipart/form-data",
      };
    
      try {
        await axios.patch(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/${id}/`,
          {},
          { headers } 
        ).then(console.log("accepted"));
      } catch (err) {
        const errorMessage = err.response?.data
          ? err.response.data[Object.keys(err.response.data)[0]][0]
          : "An unknown error occurred.";
        setError(errorMessage);
        console.error(err.response?.data || err);
      }
    };
    
  const getPosts = async () => {
    let uri = ""
    if(localStorage.getItem('user_type') == "worker"){
      setworker(true)
      uri = "https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?notAccepted=1"
    }else{
      setworker(false)
      uri = 'https://ahmadshehab19951995.pythonanywhere.com/prof/users/?user_type=worker'
    }
    const headers = {
      'Content-Type': 'application/json'
    };
       await axios.get(uri,{headers}).then(res => {
        
        setData(res.data)
        console.log(res.data)
       }).catch(err => {setError(err.response.data[Object.keys(err.response.data)[0]][0]); console.log(err.response.data)})
  //await axios.get('http://localhost:3001/products').then(data => console.log(data))
        
    }

    const sendInvitation = async (email) => {
      const headers = {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "multipart/form-data",
      };
      
      formData.append("email", email);
      try {
        await axios.post(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/send-invitation/`,
          formData,
          { headers } 
        ).then(console.log("accepted"));
      } catch (err) {
        const errorMessage = err.response?.data
          ? err.response.data[Object.keys(err.response.data)[0]][0]
          : "An unknown error occurred.";
        setError(errorMessage);
        console.error(err.response?.data || err);
      }
    };

  useEffect(() => {
    getPosts()
  
   
  }, [])
  return (
    <>
    <>
   <div className="row">
             {(!worker && data.length > 0) ? (
               data.map((worker, index) => (
                 <div key={index} className="col-12 col-md-2 p-5 mt-3 ">
                   <a href="#">
                     <img src={profile} className="rounded-circle img-fluid worker-image" alt="Worker Profile" />
                   </a>
                   <h5 className="text-center mt-3 mb-3">{worker.username}</h5>
                   <p className="text-center mt-3 mb-3">Address: {worker.address || "not"}</p>
                   <p className="text-center">
                     <a className="btn btn-success" href={`https://wa.me/${worker.phone || ""}`} target="_blank" rel="noreferrer">
                       Chat on WhatsApp
                     </a>
                     <button type='button' onClick={() => sendInvitation(worker.email)} className="text-center btn btn-secondary mt-3 mb-3">
                       +
                     </button>
                   </p>
                 </div>
               ))
             ) : (
              <div className="row ">
              {data.map(e => (<>
                  <div className="col-12 col-md-3 mb-4 mt-5 ">
                  <div className="card h-100">
                      <a href="shop-single.html">
                          <img src={e.image} className="card-img-top" alt="..." />
                      </a>
                      <div className="card-body">
                          <ul className="list-unstyled d-flex justify-content-between">
                              <li>
                                  <i className="text-warning fa fa-star"></i>
                                  <i className="text-warning fa fa-star"></i>
                                  <i className="text-warning fa fa-star"></i>
                                  <i className="text-muted fa fa-star"></i>
                                  <i className="text-muted fa fa-star"></i>
                              </li>
                              <li className="text-muted text-right">$240.00</li>
                          </ul>
                          <a href="shop-single.html" className="h2 text-decoration-none text-dark">{e.title}</a>
                          <p className="card-text">
                             {e.description}
                          </p>
                          <button type='button' className="btn btn-success " onClick={() => submitPost(e.id)}>تقديم </button>
                          <div className="text-danger">
  {error }
</div>
                      </div>
                  </div>
              </div>
              </>))}
              
             
              
          </div>
             )}
           </div>
    </>
   
   </>
  )
}

export default AllShop
import React from 'react'
import Article from './Article/Article'
import Content from './Content/Content'
import Modal from './Modal/Modal'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import './Shop.css'
import Featured from '../Home/Featured/Featured';
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const Shop = () => {
  const navigate = useNavigate();
    const [error, setError] = useState('')
    const [data, setData] = useState([])
    const [time, setTime] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [Home, setHome] = useState();
    const [selectedPostId, setSelectedPostId] = useState(null);
    const { id } = useParams();
    const token = JSON.parse(localStorage.getItem("login")).token;
    const decoded = jwt_decode(token);
    let homeowner = null
    const submitPost =  (id ,ho) => {
      setSelectedPostId(id);
      setHome(homeowner)
      
      console.log(decoded.user_id)
      setShowForm(true); 
      homeowner = ho
    };

      const handleFormSubmit = async () => {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
        const headers2 = {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json',
        };
    
        try {
          const formData = new FormData();
          const formData2 = new FormData();
          formData2.append("participants",  [18, 19]);
          formData.append("price", price);
          formData.append("post_date", date);
          formData.append("post_time", time);
          await axios.patch(
            `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/${selectedPostId}/`,
            formData,
            { headers },
            
          );
         
          await axios.post(`https://ahmadshehab19951995.pythonanywhere.com/prof/chats/`,  { participants: [decoded.user_id, Home] } , {headers2}).then(res => console.log(res)).catch(e => console.log(e.response.data))
          setShowForm(false); 
          setPrice("");
          setDate("");
          setTime("");
          getPosts()
        } catch (err) {
          console.log(err)
          const errorMessage = err.response?.data
            ? err.response.data[Object.keys(err.response.data)[0]][0]
            : "An unknown error occurred.";
          setError(errorMessage);
          console.error(err.response?.data || err);
        }
      };
      const getPosts = async () => {
        const headers = {
          'Content-Type': 'application/json'
        };
           await axios.get('https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?status=active&is_accepted_isnull=True',{headers}).then(res => {
            console.log(res.data)
            setData(res.data.filter(e => e.id != id))
            console.log(res.data)
           }).catch(err => {setError(err.response.data[Object.keys(err.response.data)[0]][0]); console.log(err.response.data)})
        }
     useEffect(() => {
        getPosts()
     
       
     }, [id])
  return (
    <>
    
    <Content/>
     <section className="bg-light">
            <div className="container-sm py-5">
                <div className="row text-center py-3">
                    <div className="col-lg-6 m-auto">
                        <h1 className="h1">All Posts</h1>
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
                    {localStorage.getItem("user_type") == "worker" && (<>
                                <button type='button' className="btn rounded-0 btn-success " onClick={() => {submitPost(e.id);setHome(e.homeowner)}}>Submit </button>
                                <div className="text-danger">
      {error }
    </div>
                                </>)}
                        </div>
                    
                    </div>
                    </>))}
                    
                   
                    
                </div>
            </div>
        </section>



        {showForm && (
        <div className="overlay" onClick={() => setShowForm(false)}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <h4>Submit your details</h4>
            <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">Time</label>
                <input
                  type="time"
                  id="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(`${e.target.value}`)}
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Shop
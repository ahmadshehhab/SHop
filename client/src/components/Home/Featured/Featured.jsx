import React from 'react'
import { useState,useEffect} from 'react'
import './Featured.css'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
const Featured = () => {
    const token = JSON.parse(localStorage.getItem("login")).token;
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
    const [error, setError] = useState('')
    const [data, setData] = useState([])
    let d = []
    const getPosts = async () => {
		const headers = {
			'Content-Type': 'application/json'
		};
       await axios.get('https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?status=True&is_accepted_isnull=True',{headers}).then(res => {
        
        setData(res.data)
        console.log(res.data)
       }).catch(err => {setError(err.response.data[Object.keys(err.response.data)[0]][0]); console.log(err.response.data)})
    }
 useEffect(() => {
    getPosts().then(console.log(d))
 
   
 }, [])

  return (
    <>
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
                            <ul className="list-unstyled d-flex justify-content-between">
                                <li>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-muted fa fa-star"></i>
                                    <i className="text-muted fa fa-star"></i>
                                </li>
                                <li className="text-muted text-right">السعر: {e.price}</li>
                            </ul>
                            <a href="shop-single.html" className="h2 text-decoration-none text-dark">{e.title}</a>
                            <p className="card-text prof-desc">
                               {e.description}
                            </p>
                           
                        </div>
                       
                </Link>
                {localStorage.getItem("user_type") == "worker" && (<>
                            <button type='button' className="btn btn-success " onClick={() => submitPost(e.id)}>Apply </button>
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
    </>
  )
}

export default Featured
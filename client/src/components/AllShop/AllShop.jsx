import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import profile from "../../assets/img/profile.jpg";
import "./AllShop.css";
import jwt_decode from "jwt-decode";
const AllShop = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [worker, setWorker] = useState(false);
  const [category, setCategory] = useState([]);
  const [PostCategory, setPostCategory] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [Home, setHome] = useState();
  const [showForm, setShowForm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [CompanyData, setCompanyData] = useState(null);
  let homeowner = null
  const token = JSON.parse(localStorage.getItem("login")).token;
  const decoded = jwt_decode(token);
  const submitPost =  (id ,ho) => {
    setSelectedPostId(id);
    setHome(homeowner)
    
    console.log(decoded.user_id)
    setShowForm(true); 
    homeowner = ho
  };
  const sendInvitation = async (em , w_id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    
    await axios.post(`https://ahmadshehab19951995.pythonanywhere.com/prof/send-invitation/`,  { email: em , w_id:w_id} , {headers}).then(res => console.log(res)).catch(e => console.log(e.response.data))

  }
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
    let uri = "";
    if (localStorage.getItem("user_type") === "worker") {
      setWorker(true);
      uri = `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?status=active&is_accepted_isnull=True&category=${PostCategory}`;
    } else {
      setWorker(false);
      uri = "https://ahmadshehab19951995.pythonanywhere.com/prof/users/?user_type=worker";
    }
    try {
      const { data } = await axios.get(uri, { headers: { "Content-Type": "application/json" } });
      console.log(data)
      if(localStorage.getItem("user_type") === "worker"){

        setData(data);
      }else if(localStorage.getItem("user_type") === "company"){
        setData(data.filter(e => e.companyId == null))
      }
    } catch (err) {
      const errorMessage = err.response?.data
        ? err.response.data[Object.keys(err.response.data)[0]][0]
        : "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  const getCategorys = async () => {
    try {
      const { data } = await axios.get(`https://ahmadshehab19951995.pythonanywhere.com/prof/posts-category/`);
      setCategory(data);
    } catch (err) {
      const errorMessage = err.response?.data
        ? err.response.data[Object.keys(err.response.data)[0]][0]
        : "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    getCategorys();
    getPosts();
    console.log(data)
  }, [PostCategory ]);

  return (
    <>
      {worker && (
        <select className="form-select mt-3 ms-2 selectShop" value={PostCategory} onChange={(e) => setPostCategory(e.target.value)}>
          <option value="" disabled>Select a category</option>
          {category.map((e) => (
            <option value={e.id} key={e.id}>{e.category}</option>
          ))}
        </select>
      )}

      <div className="row">
        {worker ? (
          data.map((post) => (
            <div key={post.id} className="col-12 col-md-3 mb-4 mt-5">
              <div className="card h-100">
                <img src={post.image} className="card-img-top prof-post-image" alt={post.title} />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text prof-desc">{post.description}</p>
               
                  <button className="btn btn-success" onClick={() => {submitPost(post.id); setHome(post.homeowner)} }>
                    Submit
                  </button>
                 
                  <Link to={`/home/details/${post.id}`}>
                    <button className="btn btn-primary ms-2">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          data.map((worker) => (
            <div key={worker.id} className="col-12 col-md-2 p-5 mt-3 d-flex flex-column">
              <img src={profile} className="rounded-circle img-fluid worker-image" alt="Worker Profile" />
              <h5 className="text-center mt-3">{worker.username}</h5>
              <div className=" d-flex justify-content-around">
              <p className="">City: {worker.address || "Not available"}</p>
              <p className=""><i className="fa fa-star text-warning"></i> {worker.rating || "Not available"}</p>
              </div>
              <div className="d-flex">

              <button type="button" className="btn btn-success">  
              <a href={`https://wa.me/${worker.phone || ""}`} className="text-light">Chat on WhatsApp</a>
              </button>
              {localStorage.getItem('user_type') === "company" && (<><button onClick={() => sendInvitation(worker.email, worker.id)} className="btn btn-primary m-1">+</button></>)}
              </div>
            </div>
          ))
        )}
      </div>

     
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

      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default AllShop;

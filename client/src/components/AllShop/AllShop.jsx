import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import profile from "../../assets/img/profile.jpg";
import "./AllShop.css";

const AllShop = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [worker, setWorker] = useState(false);
  const [category, setCategory] = useState([]);
  const [PostCategory, setPostCategory] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const token = JSON.parse(localStorage.getItem("login")).token;

  const submitPost = (id) => {
    setSelectedPostId(id);
    setShowForm(true); 
  };

  const handleFormSubmit = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const formData = new FormData();
      formData.append("price", price);
      formData.append("post_date", date);
      formData.append("post_time", time);

      await axios.patch(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/${selectedPostId}/`,
        formData,
        { headers }
      );

      setShowForm(false); 
      setPrice("");
      setDate("");
      setTime("");
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
      uri = `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?status=True&is_accepted_isnull=True&category=${PostCategory}`;
    } else {
      setWorker(false);
      uri = "https://ahmadshehab19951995.pythonanywhere.com/prof/users/?user_type=worker";
    }
    try {
      const { data } = await axios.get(uri, { headers: { "Content-Type": "application/json" } });
      setData(data);
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
  }, [PostCategory]);

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
                 
                  <button className="btn btn-success" onClick={() => submitPost(post.id)}>
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
            <div key={worker.id} className="col-12 col-md-2 p-5 mt-3">
              <img src={profile} className="rounded-circle img-fluid worker-image" alt="Worker Profile" />
              <h5 className="text-center mt-3">{worker.username}</h5>
              <p className="text-center">Address: {worker.address || "Not available"}</p>
              <a href={`https://wa.me/${worker.phone || ""}`} className="btn btn-success">Chat on WhatsApp</a>
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

import React from "react";
import "./Content.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
const Content = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [Home, setHome] = useState();
  const [selectedPostId, setSelectedPostId] = useState(null);
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
          `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/${id}/`,
          formData,
          { headers },
          
        );
       
        await axios.post(`https://ahmadshehab19951995.pythonanywhere.com/prof/chats/`,  { participants: [decoded.user_id, Home] } , {headers2}).then(res => console.log(res)).catch(e => console.log(e.response.data))
        setShowForm(false); 
        setPrice("");
        setDate("");
        setTime("");
        navigate("/home");
      } catch (err) {
        console.log(err)
        const errorMessage = err.response?.data
          ? err.response.data[Object.keys(err.response.data)[0]][0]
          : "An unknown error occurred.";
        setError(errorMessage);
        console.error(err.response?.data || err);
      }
    };
  const getPost = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .get(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/${id}/`,
        { headers }
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data[Object.keys(err.response.data)[0]][0]);
        console.log(err.response.data);
      });
  };
  useEffect(() => {
    getPost();
  }, [id]);
  return (
    <>
      <section className="bg-light">
        <div className="container-sm pb-5">
          <div className="row">
            {data ? (
              <>
                <div className="col-lg-5 mt-5">
                  <div className="card mb-3">
                    <img
                      className="card-img img-fluid"
                      src={data.image}
                      alt="Card image cap"
                      id="product-detail"
                    />
                  </div>
                  <div className="row">
                    <div
                      id="multi-item-example"
                      className="col-10 carousel slide carousel-multi-item"
                      data-bs-ride="carousel"
                    >
                      <div
                        className="carousel-inner product-links-wap"
                        role="listbox"
                      >
                        <div className="carousel-item">
                          <div className="row">
                            <div className="col-4">
                              <a href="#">
                                <img
                                  className="card-img img-fluid"
                                  src="assets/img/product_single_04.jpg"
                                  alt="Product Image 4"
                                />
                              </a>
                            </div>
                            <div className="col-4">
                              <a href="#">
                                <img
                                  className="card-img img-fluid"
                                  src="assets/img/product_single_05.jpg"
                                  alt="Product Image 5"
                                />
                              </a>
                            </div>
                            <div className="col-4">
                              <a href="#">
                                <img
                                  className="card-img img-fluid"
                                  src="assets/img/product_single_06.jpg"
                                  alt="Product Image 6"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="row">
                            <div className="col-4">
                              <a href="#">
                                <img
                                  className="card-img img-fluid"
                                  src="assets/img/product_single_07.jpg"
                                  alt="Product Image 7"
                                />
                              </a>
                            </div>
                            <div className="col-4">
                              <a href="#">
                                <img
                                  className="card-img img-fluid"
                                  src="assets/img/product_single_08.jpg"
                                  alt="Product Image 8"
                                />
                              </a>
                            </div>
                            <div className="col-4">
                              <a href="#">
                                <img
                                  className="card-img img-fluid"
                                  src="assets/img/product_single_09.jpg"
                                  alt="Product Image 9"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 mt-5">
                  <div className="card">
                    <div className="card-body">
                      <h1 className="h2">{data.title}</h1>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <h6>{data.created_at.split("T")[0]}</h6>
                        </li>
                      </ul>

                      <h6>Description:</h6>
                      <p>{data.description}</p>
                      <ul className="list-inline"></ul>

                      <form action="" method="GET">
                        <input
                          type="hidden"
                          name="product-title"
                          value="Activewear"
                        />
                        <div className="row"></div>
                        <div className="row pb-3">
                          <div className="col d-grid">
                            <button
                              type="submit"
                              className="btn btn-success btn-lg"
                              name="submit"
                              value="buy"
                            >
                              Chat On Whatsapp
                            </button>
                          </div>
                          {localStorage.getItem("user_type") == "worker" && (
                            <>
                              <div className="col d-grid">
                                <div
                                  onClick={() => {submitPost(data.id); setHome(data.homeowner)}}
                                  className="btn btn-success btn-lg"
                                >
                                  Submit
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>loading...</>
            )}
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
  );
};

export default Content;

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useParams } from "react-router-dom";
import profile from "../../assets/img/profile.jpg";
import "./profile.css"
const Profile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  let d = [];
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("login")).token;
  const decoded = jwt_decode(token);
  const [worker, setworker] = useState();
  const getPosts = async () => {
    if (localStorage.getItem("user_type") == "worker") {
      setworker(true);
    } else {
      setworker(false);
    }

    const headers = {
      "Content-Type": "application/json",
    };
    if (localStorage.getItem("user_type") == "worker") {
      await axios
        .get(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?accepted=${decoded.user_id}`,
          { headers }
        )
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (localStorage.getItem("user_type") == "homeowner") {
      await axios
        .get(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?homeowner=${decoded.user_id}`,
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
    } else {
      await axios
        .get(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/company-users/${decoded.user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setData(res.data.filter((e) => e.companyId != decoded.user_id));
        })
        .catch((err) => {
          setError(err.response.data[Object.keys(err.response.data)[0]][0]);
          console.log(err.response.data);
        });
    }
  };

  const deletePost = async (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .delete(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setData(res.data);
        navigate("/home");
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data[Object.keys(err.response.data)[0]][0]);
        console.log(err.response.data);
      });
    //await axios.get('http://localhost:3001/products').then(data => console.log(data))
  };

  const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/users/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserDetails((prev) => ({ ...prev, [userId]: response.data }));
    } catch (error) {
      console.error(`Error fetching user details for ID ${userId}:`, error);
    }
  };

  const getHomeUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/users/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserDetails((prev) => ({ ...prev, [userId]: response.data }));
    } catch (error) {
      console.error(`Error fetching user details for ID ${userId}:`, error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <>
        <section className="bg-light">
          <div className="container-sm py-5">
            <div className="row text-center py-3">
              <div className="col-lg-6 m-auto">
                {data.length > 0 && worker && (
                  <>
                    <h1 className="h1">My Accepted Posts</h1>
                  </>
                )}
                {data.length  < 1 && localStorage.getItem("user_type") == "company" && (
                  <>
                    <h1 className="h1">Company Has No Active Users</h1>
                  </>
                )}
                {data.length  > 0 && localStorage.getItem("user_type") == "company" && (
                  <>
                    <h1 className="h1">Active Users on Company</h1>
                  </>
                )}
                {data.length < 1 && worker && (
                  <>
                    <h1 className="h1">You Dont Have Any Active Posts</h1>
                  </>
                )}

                {data.length > 0 && localStorage.getItem("user_type") == "homeowner" && (
                  <>
                    <h1 className="h1">My Posts</h1>
                  </>
                )}
                {data.length < 1 && localStorage.getItem("user_type") == "homeowner" && (
                  <>
                    <h1 className="h1">You Dont Have Posts</h1>
                  </>
                )}
                <p></p>
                <div className="text-danger">{error}</div>
              </div>
            </div>
            <div className="row">
              {localStorage.getItem("user_type") != "company"
                ? data.map((e) => (
                    <>
                      <div className="col-12 col-md-4 mb-4 ">
                        <div className="card h-100">
                          <Link to={`/home/details/${e.id}`}>
                            <img
                              src={e.image}
                              className="card-img-top prof-post-image"
                              alt="..."
                            />

                            <div className="card-body">
                              <ul className="list-unstyled d-flex justify-content-between">
                                <li className="text-muted text-right">
                                  السعر: {e.price}
                                </li>
                              </ul>
                              {e.title}
                              <p className="card-text prof-desc ">{e.description}</p>

                              {localStorage.getItem("user_type") ==
                                "homeowner" && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => deletePost(e.id)}
                                    className="btn btn-danger"
                                  >
                                    delete
                                  </button>
                                </>
                              )}
                              {localStorage.getItem("user_type") ==
                                "worker" && <></>}
                            </div>
                          </Link>
                          {!userDetails[e.is_accepted] &&
                            localStorage.getItem("user_type") == "worker" && (
                              <>
                                <button
                                  onClick={() =>
                                    getHomeUserDetails(e.homeowner)
                                  }
                                  className="btn btn-info"
                                >
                                  Show Post Owner Info
                                </button>
                              </>
                            )}
                          {userDetails[e.homeowner] && (
                            <>
                              <div className="user-info">
                                <p>
                                  Username: {userDetails[e.homeowner].username}
                                </p>
                                <p>Email: {userDetails[e.homeowner].email}</p>
                                <p>phone: {userDetails[e.homeowner].phone}</p>
                              </div>
                            </>
                          )}

                          {e.is_accepted &&
                            !userDetails[e.is_accepted] &&
                            localStorage.getItem("user_type") ==
                              "homeowner" && (
                              <>
                                <button
                                  onClick={() => getUserDetails(e.is_accepted)}
                                  className="btn btn-info"
                                >
                                  Show Worker Info
                                </button>
                              </>
                            )}
                          {e.is_accepted && userDetails[e.is_accepted] && (
                            <>
                              <div className="user-info">
                                <p>
                                  Username:{" "}
                                  {userDetails[e.is_accepted].username}
                                </p>
                                <p>Email: {userDetails[e.is_accepted].email}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ))
                : data.map((worker, index) => (
                    <>
                      <div key={index} className="col-12 col-md-3 p-5 mt-3">
                        <a href="#">
                          <img
                            src={profile}
                            className="rounded-circle img-fluid worker-image"
                            alt="Worker Profile"
                          />
                        </a>
                        <h5 className="text-center mt-3 mb-3">
                          {worker.username}
                        </h5>
                        <p className="text-center mt-3 mb-3">
                          Address: {worker.address || "not"}
                        </p>
                        <p className="text-center">
                          <a
                            className="btn btn-success"
                            href={`https://wa.me/${worker.phone || ""}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Chat on WhatsApp
                          </a>
                        </p>
                      </div>
                    </>
                  ))}
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default Profile;

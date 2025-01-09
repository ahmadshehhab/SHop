import React, { useState, useEffect } from "react";
import "../carousel/Carousel.css";
import profile from "../../../assets/img/profile.jpg";
import axios from "axios";

const Category = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const getPosts = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.get("https://ahmadshehab19951995.pythonanywhere.com/prof/users/?user_type=worker", {
        headers,
      });
      setData(res.data);
      console.log(res.data)
    } catch (err) {
      const errorMessage = err.response?.data[Object.keys(err.response.data)[0]][0] || "An error occurred";
      setError(errorMessage);
      console.error(err.response?.data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <section className="container-sm py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Workers</h1>
            <p>
            
            </p>
          </div>
        </div>
        <div className="row">
          {data.length > 0 ? (
            data.slice(0, 3).map((worker, index) => (
              <div key={index} className="col-12 col-md-4 p-5 mt-3">
                <a href="#">
                  <img src={profile} className="rounded-circle img-fluid" alt="Worker Profile" />
                </a>
                <h5 className="text-center mt-3 mb-3">{worker.username}</h5>
                <p className="text-center">
                  <a className="btn btn-success" href={`https://wa.me/${worker.phone || ""}`} target="_blank" rel="noreferrer">
                    Chat on WhatsApp
                  </a>
                </p>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>{error || "Loading workers..."}</p>
            </div>
          )}
        </div>
        {data.length > 3 && (
          <div className="row text-center mt-4">
            <a className="btn btn-success" href="/home/workers-post">
              See More
            </a>
          </div>
        )}
      </section>
    </>
  );
};

export default Category;

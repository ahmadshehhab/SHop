import React from "react";
import "./Content.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Content = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
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
  }, []);
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
                              Chat With Home Owner
                            </button>
                          </div>
                          {localStorage.getItem("user_type") == "worker" && (
                            <>
                              <div className="col d-grid">
                                <button
                                  type="submit"
                                  className="btn btn-success btn-lg"
                                  name="submit"
                                  value="addtocard"
                                >
                                  Apply
                                </button>
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
    </>
  );
};

export default Content;

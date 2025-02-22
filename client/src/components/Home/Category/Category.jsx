import React, { useState, useEffect } from "react";
import "../carousel/Carousel.css";
import profile from "../../../assets/img/profile.jpg";
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Category = () => {
  const { t, i18n } = useTranslation();
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
            <h1 className="h1">{t('workers')}</h1>
            <p>
            
            </p>
          </div>
        </div>
        <div className="row">
          {data.length > 0 ? (
            data.slice(0, 3).map((worker, index) => (
              <MDBCol md="9" lg="7" xl="5" className="mt-5 ms-5 mb-5">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        style={{ width: '180px', borderRadius: '10px' }}
                        src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                        alt='Generic placeholder image'
                        fluid />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <MDBCardTitle>{worker.username}</MDBCardTitle>
                      <MDBCardText>{worker.workAs}</MDBCardText>
  
                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: '#efefef' }}>
                        <div>
                          <p className="small text-muted mb-1">Done Jobs</p>
                          <p className="mb-0">{worker.total_ratings}</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">City</p>
                          <p className="mb-0">{worker.address}</p>
                        </div>
                        <div>
                          <p className="small text-muted mb-1">Rating</p>
                          <p className="mb-0">{worker.rating}</p>
                        </div>
                      </div>
                      <div className="d-flex pt-1">
                        <a className="btn btn-outline-primary me-1 flex-grow-1" href={`https://wa.me/${worker.phone || ""}`}>Chat</a>
                        <Link to={`/home/worker/${worker.id}`} className="flex-grow-1">
                        <button className="btn btn-primary p-2" >{t('more')}</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
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

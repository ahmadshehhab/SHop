import React from "react";
import "./Content.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const Content = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("login")).token;
  const decoded = jwt_decode(token);
  

  const getWorker = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .get(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/users/${id}/`,
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
    getWorker();
  }, []);
  return (
    <>
   
 
                <>
   
                <MDBCol md="9" lg="7" xl="5" className="mt-5 ms-5 mb-5">
                <MDBCard style={{ border: 'none' }}>
                  <MDBCardBody className="p-4">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          style={{ width: '300px', borderRadius: '10px' }}
                          src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                          alt='Generic placeholder image'
                          fluid />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <MDBCardTitle>{data?.username}</MDBCardTitle>
                        <MDBCardText className="m-0 text-secondary">Work As: {data?.workAs}</MDBCardText>
                        <MDBCardText className="m-0 text-secondary">Phone: {data?.phone}</MDBCardText>
                        {data?.companyId && (<>
                        <MDBCardText className="m-0 text-secondary">Company: {data?.companyId.username}</MDBCardText>
                        </>)}
                        <MDBCardText className="p-0 m-0 text-secondary">Date Joined: {data?.user.date_joined.split('T')[0]}</MDBCardText>
                        <a target="_blank" href={`https://www.google.com/maps/place/${data?.latitude},${data?.longitude}`} className="text-secondary">Location: <i class="fas fa-map-marker-alt text-success"></i> </a>

                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: '#efefef' }}>
                          <div>
                            <p className="small text-muted mb-1">Done Jobs</p>
                            <p className="mb-0">{data?.total_ratings}</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">City</p>
                            <p className="mb-0">{data?.address}</p>
                          </div>
                          <div>
                            <p className="small text-muted mb-1">Rating</p>
                            <p className="mb-0">{data?.rating}</p>
                          </div>
                        </div>
                        <div className="d-flex pt-1">
                          <a className="btn btn-outline-primary me-1 flex-grow-1" href={`https://wa.me/${data?.phone || ""}`}>Chat</a>
                         
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
                </>
            



      
    </>
  );
};

export default Content;

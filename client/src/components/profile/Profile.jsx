import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useParams } from "react-router-dom";
import profile from "../../assets/img/profile.jpg";
import Select from "react-select";
import "./profile.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement ,ArcElement, PointElement, LineElement,Title, Tooltip, Legend } from "chart.js";
import { Bar , Line, Doughnut } from "react-chartjs-2";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { useRef } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Profile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("login")).token;
  const decoded = jwt_decode(token);
  const [worker, setWorker] = useState();
  const [rating, setRating] = useState(0);
  const [Showrating, setShowRating] = useState(false);
  const [workerRating, setworkerRating] = useState(null);
  const [DonePosts, setDonePosts] = useState([]);
  const [Home, setHome] = useState();
  const [ChatId, setChatId] = useState(null);
  const [CompanyUsers, setCompanyUsers] = useState(null);
  const [ActiveWorker, setActiveWorker] = useState(null);
  const [getMessages, setgetMessages] = useState(false);
  const [workerId, setworkerId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setProfileImage(file);
      console.log("Selected file:", file);
      uploadImage(file);
    }
  };
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("user", decoded.user_id);
    formData.append("img", file);
    formData.append("profile", "true"); // Sending profile as true

    try {
      const response = await axios.post(
        "https://ahmadshehab19951995.pythonanywhere.com/prof/images/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };
  console.log(CompanyUsers)
  const chartDataLine = {
    labels:  CompanyUsers?.map((user) => user.total_ratings ) ,
    datasets: [
      {
        label: "Worker Rating",
        data: CompanyUsers?.map((user) => user.rating),
        backgroundColor: "rgb(20, 136, 0)",
        borderColor: "rgb(20, 136, 0)",
        borderWidth: 1,
      },
    ],
  };

  const chartData = {
    labels: CompanyUsers?.map((user,index) => user.users[index].user.username),
    datasets: [
      {
        label: "Jobs Completed",
        data: CompanyUsers?.map((user) => user.total_ratings ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const cityCounts = CompanyUsers?.reduce((acc, user) => {
    const city = user.address; // Assuming 'address' contains city names
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  console.log(cityCounts)
  // Step 2: Convert to chart-friendly format
  const chartData2 = {
    labels: Object.keys(cityCounts || 0), // City names
    datasets: [
      {
        label: "Users Per City",
        data: Object.values(cityCounts || 0), // Number of users in each city
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };


  const deletePost = async (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .delete(
        'https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/${id}/',
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

  const changestatus = async (id , ) => {
    
    const formData = new FormData();
    formData.append("user_id", workerRating);
    formData.append("rating", rating);
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .post(
        'https://ahmadshehab19951995.pythonanywhere.com/prof/users/update-rating/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(async () => {
        const formData1 = new FormData();
        formData1.append("status", "done");
        await axios
      .post(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/${selectedPost}/update-status/`,
        formData1,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      ).then(() => {

        navigate("/home");
      })
      })
      .catch((err) => {
        
        console.log(err);
      });
  }
  
  const getCategorys = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/posts-category/`,
        { headers }
      );
      console.log(response.data)
      const optionsInfo = response.data.map((c) => ({
        value: c.category,
        label: c.category,
        id:c.id
      }));
      setOptions(optionsInfo);
    } catch (err) {
      setError(
        err.response?.data?.[Object.keys(err.response.data)[0]][0] ||
          "Failed to load categories."
      );
    }
  };
  const saveInterest = async () => {
    const formData1 = {
      user_id: decoded.user_id,
      category_ids: [+selectedCategory  ] // Pass the interests as an array
    };
    
    await axios
      .post(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/users/update-interests/`,
        formData1,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(res => console.log(res))
      .catch(err => console.error("Error updating interests:", err));
  };
  
  
  const getPosts = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (localStorage.getItem("user_type") === "worker") {
        setWorker(true);
        const response = await axios.get(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?is_accepted=${decoded.user_id}&status=active`,
          { headers }
        );
        setData(response.data);
      } else if (localStorage.getItem("user_type") === "homeowner") {
        const response = await axios.get(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?homeowner=${decoded.user_id}&status=active`,
          { headers }
        );
        setData(response.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.[Object.keys(err.response.data)[0]][0] ||
          "Failed to load posts."
      );
    }
  };
  const getDonePosts = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (localStorage.getItem("user_type") === "homeowner") {
        const response = await axios.get(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?homeowner=${decoded.user_id}&status=done`,
          { headers }
        ).then(res => setDonePosts(res.data));
        
      }
      if (localStorage.getItem("user_type") === "worker") {
        const response = await axios.get(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?homeowner=${decoded.user_id}&status=done`,
          { headers }
        ).then(res => setDonePosts(res.data));
        
      }
    } catch (err) {
      setError(
        err.response?.data?.[Object.keys(err.response.data)[0]][0] ||
          "Failed to load posts."
      );
    }
  };

  const getCompanyUsers = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      if (localStorage.getItem("user_type") === "company") {
        const response = await axios.get(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/company-users/${decoded.user_id}/`,
          { headers }
        ).then(res => {setCompanyUsers(res.data.filter(e => e.id != decoded.user_id));console.log(res.data.filter(e => e.id != decoded.user_id))});
        
      }
    } catch (err) {
      setError(
        err.response?.data?.[Object.keys(err.response.data)[0]][0] ||
          "Failed to load posts."
      );
    }
  };

  const getActiveWorker = async () => {
    try {
      const ActiveWorker = await axios.get(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/users/${decoded.user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then(res => {setActiveWorker(res.data); console.log(res.data)});
    } catch (error) {
      console.log(error)
    }
  }
  const getUserDetailsAndFetchMessages = async (userId, homeownerId) => {
    try {
      // Ensure the homeowner is set before proceeding
      setHome(homeownerId);
  
      // Fetch user details
      const userResponse = await axios.get(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/users/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setUserDetails((prev) => ({ ...prev, [userId]: userResponse.data }));
      console.log(userDetails)
      setSelectedWorker(userResponse.data);
  
      // Fetch chats to find the matching chat
      const chatResponse = await axios.get(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/chats/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Use the updated value of `homeownerId` directly
      const chat = chatResponse.data.find(
        (chat) =>
          chat.participants.includes(decoded.user_id) &&
          chat.participants.includes(homeownerId) // Use homeownerId instead of Home
      );
  
      if (chat) {
        const chatId = chat.id;
        await setChatId(chatId); // Ensure the state is set before fetching messages
        console.log("Chat ID:", chatId);
  
        // Fetch messages for the found chat
        const messagesResponse = await axios.get(
          `https://ahmadshehab19951995.pythonanywhere.com/prof/chats/${chatId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        setChatMessages(messagesResponse.data.messages);
        console.log(chatMessages)
        console.log("Messages:", messagesResponse.data.messages);
      } else {
        console.error("No matching chat found for the participants.");
      }
    } catch (error) {
      console.error("Error in getUserDetailsAndFetchMessages:", error);
    }
  };
  
  
  const sendMessage = async () => {
    if (!newMessage.trim()) return;



      // Send the message to the correct chat ID
      await axios.post(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/messages/`, // Replace with your endpoint for sending messages
        { chat: ChatId, sender: decoded.user_id, content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Message sent successfully");
      setNewMessage("");
      console.log(Home)  // Fetch updated messages after sending
      getUserDetailsAndFetchMessages(Home,Home)
  };
  const updateLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const formData1 = {
          longitude:await position.coords.longitude,
          latitude:await  position.coords.latitude,
        };
        try {
          navigator.geolocation.getCurrentPosition(async (p) => console.log(p))
          const response = await axios.patch(
            `https://ahmadshehab19951995.pythonanywhere.com/prof/users/${decoded.user_id}/`,
            formData1,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Location updated successfully:", response.data);
        } catch (err) {
          console.error("Error updating location:", err);
        }
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  };
  


  useEffect(() => {
    getPosts();
    getCategorys();
    saveInterest()
    getDonePosts()
    getCompanyUsers()
    console.log(+selectedCategory + 10)
    if(localStorage.getItem('user_type') == "worker"){

      getActiveWorker()
      if ( getMessages == true) {
        const interval = setInterval(() => {
          getUserDetailsAndFetchMessages(ActiveWorker?.companyId?.id, ActiveWorker?.companyId?.id);
        }, 3000);
    
        return () => clearInterval(interval); 
      }
    }
    if(localStorage.getItem('user_type') == "company"){
      if ( getMessages == true) {
        const interval = setInterval(() => {
          getUserDetailsAndFetchMessages(workerId , workerId);
        }, 3000);
    
        return () => clearInterval(interval); 
      }
    }
    if(localStorage.getItem('user_type') == "homeowner"){
      console.log(workerId)
        const interval = setInterval(() => {
          getUserDetailsAndFetchMessages(workerId , workerId);
        }, 3000);
    
        return () => clearInterval(interval); 
      
    }
    
   
    
  }, [Showrating , getMessages , selectedCategory]);

  return (
    <>

    <div className="d-flex align-content-center w-50">
  <button className="btn btn-light border-success ms-5 mt-5" onClick={() => updateLocation()}><i class="fas fa-map-marker-alt"></i> </button>
  {localStorage.getItem('user_type') == "worker" && ActiveWorker?.companyId != null && (<>
  
  <button className="btn btn-light border-success ms-3 mt-5" onClick={() => {
    getUserDetailsAndFetchMessages(ActiveWorker?.companyId.id,ActiveWorker?.companyId.id)
    setgetMessages(true)
  }} >Company Messages</button>
  
  
      
  </>) }
  {localStorage.getItem('user_type') == "worker" && (<>
    <select
        value={selectedCategory}
        className="btn btn-light border-warning ms-3 mt-5 bg-light"
        onChange={(e) => {setSelectedCategory(e.target.value)}}
      >
        <option value="">Select a category</option>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="mt-5 ms-3 ">
      <button 
        
        className="btn border-danger w-100"
        onClick={handleClick}
  
      >
        Profile Picture
      </button>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} 
      />
                  </div>
  </>)}
  </div>

  
{localStorage.getItem('user_type') == "company" && selectedWorker && (
        <div className="overlay">
          <div className="worker-info-box bg-light p-1">
            <button
              className="close-btn btn btn-danger"
              onClick={() =>{ setSelectedWorker(null);setgetMessages(false); setChatMessages([])}}
            >
              &times;
            </button>
            <h2>Chat with {selectedWorker.username}</h2>
            <p>Email: {selectedWorker.email}</p>
            <p>Phone: {selectedWorker.phone}</p>
            <div className="chat-container">
      <div className="chat-box">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender == decoded.user_id ? "user-message" : "worker-message"
            }`}
          >
            {msg.content} 
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="form-control"
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
          </div>
        </div>
      )}



       {localStorage.getItem('user_type') === "homeowner" && Showrating &&(
      <div className="overlay">
        <div className="worker-info-box bg-light p-2">
          <h2>Rate the worker</h2>
          <ul className="list-inline d-flex justify-content-around">
            {[1, 2, 3, 4, 5].map((value) => (
              <li key={value} onClick={() => {const formattedRating = value.toFixed(2); console.log(formattedRating);setRating(formattedRating); }}>
                <i className={`fa fa-star ${value <= rating ? "text-warning" : ""}`}></i>
              </li>
            ))}
          </ul>
          <button className="btn btn-success" onClick={() => changestatus()}>Mark as done</button>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    )}

      {localStorage.getItem('user_type') == "homeowner" && selectedWorker && (
        <div className="overlay">
          <div className="worker-info-box bg-light p-1">
            <button
              className="close-btn btn btn-danger"
              onClick={() => setSelectedWorker(null)}
            >
              &times;
            </button>
            <h2>Chat with {selectedWorker.username}</h2>
            <p>Email: {selectedWorker.email}</p>
            <p>Phone: {selectedWorker.phone}</p>
            <div className="chat-container">
      <div className="chat-box">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender == decoded.user_id ? "user-message" : "worker-message"
            }`}
          >
            {msg.content} 
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="form-control"
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
          </div>
        </div>
      )}
      {localStorage.getItem('user_type') == "worker" && selectedWorker && (
        <div className="overlay">
          <div className="worker-info-box bg-light p-1">
            <button
              className="close-btn btn btn-danger"
              onClick={() => {setSelectedWorker(null);setgetMessages(false);console.log(getMessages)}}
            >
              &times;
            </button>
            <h2>Chat with {selectedWorker.username}</h2>
            <p>Email: {selectedWorker.email}</p>
            <p>Phone: {selectedWorker.phone}</p>
            <div className="chat-box">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === decoded.user_id ? "user-message" : "worker-message"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="form-control"
              />
              <button onClick={sendMessage} className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      {localStorage.getItem('user_type') == "company" && (<>
<div className="d-flex justify-content-around container-fluid">

<div className="p-4 border rounded shadow-sm col-4 mt-5 ms-5">
        <h5 className="text-center mb-3">Workers Jobs Completed</h5>
        <Bar data={chartData} />
      </div>

      <div className="p-4 border rounded shadow-sm col-4 mt-5 ms-5">
        <h5 className="text-center mb-3">Workers Ratings</h5>
        <Line data={chartDataLine} />
      </div>

      <div className="p-4 border rounded shadow-sm col-2 mt-5 ms-5 ">
      <h5 className="text-center">Workers City</h5>
        <Doughnut data={chartData2}   />
      </div>
</div>
      </>)}

      <section className="bg-light">
        <div className="container-sm py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              {CompanyUsers?.length > 0 && localStorage.getItem('user_type') == "company" && <h1 className="h1">Company Workers</h1>}
              {CompanyUsers?.length === 0 && localStorage.getItem('user_type') == "company" && <h1 className="h1">No Workers</h1>}
              {data.length > 0 && worker && <h1 className="h1">My Accepted Posts</h1>}
              {data.length === 0 && worker && <h1 className="h1">No Posts Available</h1>}
              <div className="text-danger">{error}</div>
            </div>
          </div>
          <div className="row">
            {data.map((e) => (
            <>
              {console.log(e)}
              <div className="col-12 col-md-4 mb-4" key={e.id}>
                <div className="card h-100">
                  <Link to={`/home/details/${e.id}`}>
                    <img
                      src={e.image}
                      className="card-img-top prof-post-image"
                      alt="Post"
                    />
                  </Link>
                  <div className="card-body">
                    <h5>{e.title}</h5>
                    <p className="card-text prof-desc">{e.description}</p>
                    <p>Price: {e.price}</p>
                    <div className="d-flex justify-content-between">
                      
                    <p className="text-success">Date: {e.post_date}</p>
                    <p className="text-success">Time: {e.post_time?.slice(0,5)}</p>
                    </div>
                    {(e.is_accepted && localStorage.getItem("user_type") == "homeowner") && (
                      <button
                        onClick={() => {setworkerId(e.is_accepted);getUserDetailsAndFetchMessages(e.is_accepted , e.is_accepted);setHome(e.homeowner?.id); }}
                        className="btn btn-info"
                      >
                        Contact with Worker
                      </button>
                      
                    )} 
                    {(e.is_accepted && localStorage.getItem("user_type") == "worker") &&  (<>
                     <button

                        onClick={() => {setgetMessages(true);getUserDetailsAndFetchMessages(e.homeowner?.id, e.homeowner?.id); setHome(e.homeowner?.id);}}
                        className="btn btn-info"
                      >
                        Contact with HomeOwner {e?.homeowner.id}
                      </button>
                      
                    </>)}
                    {localStorage.getItem("user_type") ==
                                "homeowner" && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => deletePost(e.id)}
                                    className="btn btn-danger ms-2"
                                  >
                                    delete
                                  </button>
                                </>
                              )}
                              {localStorage.getItem("user_type") == "homeowner" && e.is_accepted && (<>
                              <i className="fa fa-edit ms-2 " onClick={() => {setworkerRating(e.is_accepted);setShowRating(true);setSelectedPost(e.id)}}></i>
                              </>) }
                  </div>
                </div>
              </div>
              </>
            ))}
          </div>

            {localStorage.getItem('user_type') == "company" && (<>

           

            <section className="container-sm py-5">
                    <div className="row text-center pt-3">
                      <div className="col-lg-6 m-auto">
                        <p>
                        
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      {CompanyUsers?.length > 0 ? (
                        CompanyUsers.map((worker, index) => (
                          <>
   <MDBCol md="9" lg="7" xl="5" className="mt-5 ms-5 mb-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={worker?.images?.filter(e => e.profile == true).slice(-1)[0]?.img ||'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp' }
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{worker.users[index].user.username}</MDBCardTitle>
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
                      <a className="btn btn-outline-primary me-1 flex-grow-1" onClick={() => {getUserDetailsAndFetchMessages(worker.id , worker.id);setgetMessages(true);setworkerId(worker.id)}}>Chat</a>
                      <Link to={`/home/worker/${worker.id}`} className="flex-grow-1">
                      <button className="btn btn-primary p-2" >More Details</button>
                      </Link>
                     
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

                        {/*   <div key={index} className="col-12 col-md-4 p-5 mt-3">
                            <a href="#">
                              <img src={profile} className="rounded-circle img-fluid" alt="Worker Profile" />
                            </a>
                            <h5 className="text-center mt-3 mb-3">{worker.users[0].user.username}</h5>
                            <div className="d-flex justify-content-around">

                            <p className="">City: {worker.address || "Not available"}</p>
                            <p className=""><i className="fa fa-star text-warning"></i> {worker.rating || "Not available"}</p>
                            </div>
                            <p className="text-center">
                              <a className="btn btn-success" onClick={() => {getUserDetailsAndFetchMessages(worker.id , worker.id);setgetMessages(true);setworkerId(worker.id)}} target="_blank" rel="noreferrer">
                                Send Message
                              </a>
                            </p>
                          </div> */}
                      </>
                        ))
                      ) : (
                        <div className="col-12 text-center">
                          <p>{error || "Loading workers..."}</p>
                        </div>
                      )}
                    </div>
                  
                  </section>
            </>)}


        </div>
      </section>
      {localStorage.getItem('user_type') == "homeowner" || localStorage.getItem('user_type') == "worker" & DonePosts != [] && (<>
      <section className="bg-light ms-5">
      <h2 className="ms-4 h-25">Done Posts</h2>
      <div className="row ms-3">
      {DonePosts.map((e) => (
              <div  className="col-12 col-md-4 mb-4" key={e.id}>
                <div className="card h-100 ">
                  <Link to={`/home/details/${e.id}`}>
                    <img
                      src={e.image}
                      className="card-img-top prof-post-image"
                      alt="Post"
                    />
                  </Link>
                  <div className="card-body">
                    <h5>{e.title}</h5>
                    <p className="card-text prof-desc">{e.description}</p>
                    <p>Price: {e.price}</p>
                    {(e.is_accepted && localStorage.getItem("user_type") == "homeowner") && (
                      <button
                        onClick={() => {getUserDetailsAndFetchMessages(e.is_accepted);setgetMessages(true)}}
                        className="btn btn-info"
                      >
                        Contact with Worker
                      </button>
                    )} 
                    {(e.is_accepted && localStorage.getItem("user_type") == "worker") &&  (<>
                     <button
                        onClick={() => getUserDetailsAndFetchMessages(e.homeowner)}
                        className="btn btn-info"
                      >
                        Contact with HomeOwner
                      </button>
                    </>)}
                    
                           
                  </div>
                </div>
              </div>
            ))}
      </div>
      </section>
      </>)}
    </>
  );
};

export default Profile;

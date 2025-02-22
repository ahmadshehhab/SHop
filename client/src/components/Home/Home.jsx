import React, { useEffect, useState } from "react";
import "./Home.css";
import Carouserl from "./carousel/Carousel";
import axios from "axios";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";
function Home() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [Username, setUsername] = useState("");
  const [user_type, setUser_type] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [PostCategory, setPostCategory] = useState('');
  const createPost = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("category", PostCategory);
    console.log(PostCategory)
    try {
      const token = JSON.parse(localStorage.getItem("login")).token;
      const response = await axios.post(
        "https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      ).then(res => setError('created')).catch((err) =>{ setError(err.response.data[Object.keys(err.response.data)[0]][0]); });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategorys = async () => {
    const headers = {
      'Content-Type': 'application/json'
    };
    await axios.get(`https://ahmadshehab19951995.pythonanywhere.com/prof/posts-category/`,{headers}).then(res => {
        
      setCategory(res.data)
      console.log(res.data)
     }).catch(err => {setError(err.response.data[Object.keys(err.response.data)[0]][0]); console.log(err.response.data)})
    }
  const sess = async () => {
    const token = JSON.parse(localStorage.getItem("login")).token;
    const decoded = jwt_decode(token);
    console.log(decoded)
    try {
      const response = await axios.get(
        `https://ahmadshehab19951995.pythonanywhere.com/prof/users/${decoded.user_id}/`
      ).then(res => {
       
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("user_type", res.data.user_type);
      })
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategorys();
    sess();
    
  }, []);

  return (
    <>
      <div>
      <button onClick={() => changeLanguage("en")} className="btn border-end rounded-0">English</button>
      <button onClick={() => changeLanguage("ar")} className="btn border-end rounded-0">العربية</button>
    </div>
      <Carouserl />

      {localStorage.getItem("user_type") === "homeowner" && (
        <>
         <div className="col-lg-6 m-5">
                <h1 className="h1">Create New Post</h1>
                
            </div>

          <div className="container-sm py-5">
            <div className="row py-5">
              <div className="col-md-9 m-auto  ">
                <div className="row">
                  <div className="form-group col-md-6 mb-3 ">
                 
                    <label htmlFor="inputTitle ">Title</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="inputTitle"
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6 mb-3 border-start">
                    <label htmlFor="inputDesc ">Description</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="inputDesc"
                      placeholder="Description"
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6 mb-3 ">
                    <label htmlFor="inputDesc">Category</label>
                    <select 
    className="form-select"
    value={PostCategory}
    onChange={(e) => {setPostCategory(e.target.value);}}
    >
    <option value="" disabled>
    Select a user type
  </option>
    {category.map((e,id) => (<>
    <option key={id} value={e.id} >{e.category}</option>
    </>))}
  </select>
                  </div>
                  <div className="form-group col-md-6 mb-3 border-start">
                    <label htmlFor="inputImage">Image</label>
                    <input
                      type="file"
                      className="form-control mt-1"
                      id="inputImage"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-end mt-2">
                    <button
                      type="button"
                      className="btn btn-success btn-lg px-3"
                      onClick={createPost}
                    >
                      Create Post
                    </button>
                    <div className="text-danger">
  {error }
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {localStorage.getItem("user_type") != "worker" && (
        <>  
        <Category />
        </>
      )}
      <Featured />
    </>
  );
}

export default Home;

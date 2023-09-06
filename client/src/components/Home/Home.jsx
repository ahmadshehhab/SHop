import React, { useEffect, useState } from "react";
import "./Home.css";
import Carouserl from './carousel/Carousel'
import axios from "axios";
import Modal from "./Modal/Modal";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";

function Home() {
  const [Username, setUsername] = useState('')
  const [Email, setEmail] = useState('')
  const sess = async () => {
    const token = JSON.parse(localStorage.getItem('login')).token
    console.log(token);
    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `Bearer ${token}`
        return config
  },error => {return Promise.reject(error)}
    )
    try {
      await axios.post('http://localhost:3001/').then(res => {
        setUsername(res.data.auth.id.username)
        setEmail(res.data.auth.id.email)
      })
      
        
    } catch (error) {
      console.log(error)
    }
		
    }
 useEffect(() => {
   sess()
 
   
 }, [])
 
  return (
    <>
     
     <Modal/>
     <Carouserl/>
     <p>{Username} {Email}</p>
     <Category/>
     <Featured/>
    </>
  );
}

export default Home;

import React from 'react'
import Article from './Article/Article'
import Content from './Content/Content'
import Modal from './Modal/Modal'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import './Shop.css'
import Featured from '../Home/Featured/Featured';
const Shop = () => {

  return (
    <>
    
    <Content/>
    <Featured/>
    </>
  )
}

export default Shop
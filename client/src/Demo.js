import * as React from 'react';
import './App.css';
import Home from './components/Home/Home.jsx'
import {Routes,Route}from 'react-router-dom'
import About from './components/About/About';
import Nav from './components/Nav/Nav';
import TopNav from './components/TopNav/TopNav';
import Footer from './components/Footer/Footer';
import AllShop from './components/AllShop/AllShop';
import Contact from './components/Contact/Contact';
import Shop from './components/Shop/Shop'
import Auth from './components/Auth/Auth';
import Login from './components/Login/Login';

function Demo() {
    return(
    <>
    <TopNav/>
    
   <Routes>
   <Route exact path='/' element={
     <>
     <Nav/>
     <Home/>
     <Footer/>
     </>
   } />  
   <Route exact path='/home' element={
     <>
     <Nav/>
     <Home/>
     <Footer/>
     </>
   } />  
 
   <Route path='/home/about' element={
     <>
     <Nav/>
     <About/>
     <Footer/>
     </>
} /> 
<Route path='/home/shop' element={
     <>
     <Nav/>
     <AllShop/>
     <Footer/>
     </>
} /> 
<Route path='/home/details' element={
     <>
     <Nav/>
     <Shop/>
     <Footer/>
     </>
} /> 
<Route path='/home/contact' element={
     <>
     <Nav/>
     <Contact/>
     <Footer/>
     </>
} /> 
<Route exact path='/home/register' element={
     <>
     <Auth/>
     </>
} /> 
<Route exact path='/home/login' element={
     <>
     <Login/>
     </>
} /> 
   </Routes>
 
  
    </>
    )
}


export default Demo
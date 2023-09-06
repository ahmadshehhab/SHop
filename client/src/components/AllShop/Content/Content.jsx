import React from 'react'
import './Content.css'

import { useState } from 'react'
import { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CircularIndeterminate from './Spinner/Spinner'
const Content = () => {
    const [IsLoading, setIsLoading] = useState(false)
    const [start, setstart] = useState(0)
    const [end, setend] = useState(6)
    const [links, setlinks] = useState({
        img: [],
        desc: [],
        price: [],
        urls: [],
    })
    const displayA = () => {
        if(document.getElementById('collapseTwo').dataset.value =="off"){

            document.getElementById('collapseTwo').classList.add("show")
            document.getElementById('collapseTwo').dataset.value = "on"
           
        }else{
            document.getElementById('collapseTwo').classList.remove("show")
            document.getElementById('collapseTwo').dataset.value = "off"
        }
    }
    const displayB = () => {
        if(document.getElementById('collapseThree').dataset.value =="off"){

            document.getElementById('collapseThree').classList.add("show")
            document.getElementById('collapseThree').dataset.value = "on"
           
        }else{
            document.getElementById('collapseThree').classList.remove("show")
            document.getElementById('collapseThree').dataset.value = "off"
        }
    }
    const displayC = () => {
        if(document.getElementById('collapseOne').dataset.value =="off"){

            document.getElementById('collapseOne').classList.add("show")
            document.getElementById('collapseOne').dataset.value = "on"
           
        }else{
            document.getElementById('collapseOne').classList.remove("show")
            document.getElementById('collapseOne').dataset.value = "off"
        }
    }
    const products = () => {
        setIsLoading(true)
        document.getElementById('pr').classList.add('opacity')
        axios.get('http://localhost:3001/').then(res => {
            setlinks({img:res.data.img,desc:res.data.desc});
            console.log(res.data);
        })
        .then(() => {setIsLoading(false); document.getElementById('pr').classList.remove('opacity')})
    }
    function FisLoading(props) {
        const spinner = props.isLoading
        if(IsLoading){

            return <CircularIndeterminate/>
        }else{
            return <></>
        }
    }
 useLayoutEffect(() => {
   products()
 
 },[start])
  return (
    <>
   
     <div className="container-sm py-5" id='pr'>
        <div className="row">

            <div className="col-lg-3">
                <h1 className="h2 pb-4">Categories</h1>
                <ul className="list-unstyled templatemo-accordion">
                    <li className="pb-3">
                        <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="#" onClick={displayC}>
                            Gender
                            <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id='collapseOne' className="collapse show  list-unstyled pl-3" data-value="on">
                            <li><a className="text-decoration-none" href="#">Men</a></li>
                            <li><a className="text-decoration-none" href="#">Women</a></li>
                        </ul>
                    </li>
                    <li className="pb-3">
                        <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="#" onClick={displayA}>
                            Sale
                            <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseTwo" className="collapse list-unstyled pl-3" data-value="off">
                            <li><a className="text-decoration-none" href="#">Sport</a></li>
                            <li><a className="text-decoration-none" href="#">Luxury</a></li>
                        </ul>
                    </li>
                    <li className="pb-3">
                        <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="#"  onClick={displayB}>
                            Product
                            <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseThree" className="collapse list-unstyled pl-3" data-value="off">
                            <li><a className="text-decoration-none" href="#">Bag</a></li>
                            <li><a className="text-decoration-none" href="#">Sweather</a></li>
                            <li><a className="text-decoration-none" href="#">Sunglass</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="col-lg-9">
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-inline shop-top-menu pb-3 pt-1">
                            <li className="list-inline-item">
                                <a className="h3 text-dark text-decoration-none mr-3" href="#">All</a>
                            </li>
                            <li className="list-inline-item">
                                <a className="h3 text-dark text-decoration-none mr-3" href="#">Men's</a>
                            </li>
                            <li className="list-inline-item">
                                <a className="h3 text-dark text-decoration-none" href="#">Women's</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 pb-4">
                        <div className="d-flex">
                            <select className="form-control">
                                <option>Featured</option>
                                <option>A to Z</option>
                                <option>Item</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row" >
                <FisLoading isLoading={IsLoading}/>
                    { links.img.map((e,i) => {
                        if(i < end){

                        return <div className="col-md-4" key={i}>
                        <div className="card mb-4 product-wap rounded-0">
                            <div className="card rounded-0">
                                <img className="card-img rounded-0 img-fluid" src={links.img[i]}/>
                                <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                    <ul className="list-unstyled">
                                        <li><a className="btn btn-success text-white" href="shop-single.html"><i className="fa fa-heart"></i></a></li>
                                        <li><Link className="btn btn-success text-white mt-2" to="/details"><i className="fa fa-eye"></i></Link></li>
                                        <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fa fa-cart-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <a href="shop-single.html" className="h3 text-decoration-none">{links.desc[start]}</a>
                                <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                    <li>M/L/X/XL</li>
                                    <li className="pt-2">
                                        <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                        <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                        <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                        <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                        <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                    </li>
                                </ul>
                                <ul className="list-unstyled d-flex justify-content-center mb-1">
                                    <li>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-muted fa fa-star"></i>
                                        <i className="text-muted fa fa-star"></i>
                                    </li>
                                </ul>
                                <p className="text-center mb-0">$250.00</p>
                            </div>
                        </div>
                    </div>
                        }
                    })

                  }
                    
                 
                </div>
                <div div="row">
                    <ul className="pagination pagination-lg justify-content-end">
                        
                        <li className="page-item"  onClick={() =>{  setend(end + 6)}}>
                            <a className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark" >more</a>
                        </li>
                       
                    </ul>
                </div>
            </div>

        </div>
    </div>
    </>
  )
}

export default Content
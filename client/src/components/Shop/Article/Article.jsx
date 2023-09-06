import React from 'react'
import './Article.css'
import '../../../assets/css/slick.min.css'
import '../../../assets/css/slick-theme.min.css'
import '../../../assets/css/fontawesome.min.css'
import r1 from '../../../assets/img/shop_08.jpg'
import r2 from '../../../assets/img/shop_09.jpg'
import r3 from '../../../assets/img/shop_10.jpg'
import r4 from '../../../assets/img/shop_11.jpg'

import Slider from 'react-slick'
const Article = () => {
    const settings = {
        infinite: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        dots: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3
                }
            }
        ]
    }
  return (
   <>
   <section className="py-5">
        <div className="container-sm ">
            <div className="row text-left p-2 pb-3">
                <h4>Related Products</h4>
            </div>

            <Slider id="carousel-related-product " {...settings}>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r1}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Red Clothing</a>
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
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-muted fa fa-star"></i>
                                </li>
                            </ul>
                            <p className="text-center mb-0">$20.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r2}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">White Shirt</a>
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
                            <p className="text-center mb-0">$25.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r3}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
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
                                    <i className="text-warning fa fa-star"></i>
                                    <i className="text-warning fa fa-star"></i>
                                </li>
                            </ul>
                            <p className="text-center mb-0">$45.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r4}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Black Fashion</a>
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
                            <p className="text-center mb-0">$60.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r1}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                <li className="">M/L/X/XL</li>
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
                            <p className="text-center mb-0">$80.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r2}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
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
                            <p className="text-center mb-0">$110.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r3}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
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
                            <p className="text-center mb-0">$125.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r4}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
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
                            <p className="text-center mb-0">$160.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r1}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
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
                            <p className="text-center mb-0">$180.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r3}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
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
                            <p className="text-center mb-0">$220.00</p>
                        </div>
                    </div>
                </div>

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r2}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
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

                <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                        <div className="card rounded-0">
                            <img className="card-img rounded-0 img-fluid" src={r4}/>
                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                <ul className="list-unstyled">
                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
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
                            <p className="text-center mb-0">$300.00</p>
                        </div>
                    </div>
                </div>

            </Slider>


        </div>
    </section>
   </>
  )
}

export default Article
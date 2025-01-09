import React from 'react'
import banner1 from '../../../assets/img/banner_img_01.jpg'
import banner2 from '../../../assets/img/banner_img_02.jpg'
import banner3 from '../../../assets/img/banner_img_03.jpg'
import alaw from '../../../assets/img/alaw.svg'
import './Carousel.css'
const Carouserl = () => {
  return (
    <>
    <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
       
        <div className="carousel-inner">
            <div className="carousel-item active">
                <div className="container-sm ">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img className="img-fluid alaw" src={alaw}  alt="kol" />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left align-self-center">
                                <h1 className="h1 text-success"><b>Professionals
                                </b> </h1>
                                <h3 className="h2">هل تبحث عن شخص  لمساعدتك</h3>
                                <p>
                                
                                بامكانك من خلال هذا الموقع البحث عن عمل من خلال التقديم على المشاريع المعروضة,
او بامكانك عرض مشكلة لديك ليقوم احد الخبراء بمساعدتك
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </div>
      
        
    </div>
    </>
  )
}

export default Carouserl
import React from 'react'
import './Modal.css'
import alaw from '../../../assets/img/alaw.svg'
const Modal = () => {
  return (
    <>
    <section className="bg-success py-5 ">
        <div className="container-sm ">
            <div className="row align-items-center py-5">
                <div className="col-md-8 text-white">
                    <h1>About Us</h1>
                    <p>
                  موقع الكتروني يتيح لاصحاب المهن البحث عن عمل وللمستخدمين لحل مشاكلهم ، نقدم من خلال موقعنا عدة خصائص منها امكانية تسجيل الدخول ك "شركة" ويتيح موقعنا للمستخدمين  البحث عن اصحاب المهن والتواصل معهم 
                    </p>
                </div>
                <div className="col-md-4">
                    <img src={alaw} alt="About Hero" />
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Modal
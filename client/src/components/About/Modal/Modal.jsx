import React from 'react'
import './Modal.css'
import hero from '../../../assets/img/about-hero.svg'
const Modal = () => {
  return (
    <>
    <div className="allModal">
    <div className="modal fade bg-white " id="templatemo_search" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="w-100 pt-1 mb-5 text-right">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" method="get" className="modal-content modal-body border-0 p-0">
                <div className="input-group mb-2">
                    <input type="text" className="form-control" id="inputModalSearch" name="q" placeholder="Search ..." />
                    <button type="submit" className="input-group-text bg-success text-light">
                        <i className="fa fa-fw fa-search text-white"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>



    <section className="bg-success py-5 ">
        <div className="container-sm ">
            <div className="row align-items-center py-5">
                <div className="col-md-8 text-white">
                    <h1>About Us</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className="col-md-4">
                    <img src={hero} alt="About Hero" />
                </div>
            </div>
        </div>
    </section>
    </div>
    </>
  )
}

export default Modal
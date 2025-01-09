import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
const Contact = () => {
     const [error, setError] = useState("");
     const [subject, setSubject] = useState("");
     const [message, setMessage] = useState("");
    const sendMessage = async () => {
        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("message", message);
        formData.append("recipient", "ahmadshehab11177@gmail.com");
    
        try {
          
          const response = await axios.post(
            "https://ahmadshehab19951995.pythonanywhere.com/prof/send-email/",
            formData,
            {
              headers: {
               
                "Content-Type": "multipart/form-data",
              },
            }
          ).then(res => setError('sent')).catch((err) =>{ setError(err.response.data[Object.keys(err.response.data)[0]][0]); });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
  return (
    <>
    <div className="container-fluid bg-light py-5">
        <div className="col-md-6 m-auto text-center">
            <h1 className="h1">Contact Us</h1>
            <p>
                Proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet.
            </p>
        </div>
    </div>


 
    <div className="container-sm py-5">
        <div className="row py-5">
            <form className="col-md-9 m-auto" method="post" role="form">
                <div className="row">
                    
                </div>
                <div className="mb-3">
                    <label htmlFor= "inputsubject">Subject</label>
                    <input type="text" className="form-control mt-1" id="subject" name="subject" placeholder="Subject" onChange={e => setSubject(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor= "inputmessage">Message</label>
                    <textarea className="form-control mt-1" id="message" name="message" placeholder="Message" rows="8" onChange={e => setMessage(e.target.value)}></textarea>
                </div>
                <div className="row">
                    <div className="col text-end mt-2">
                        <button type="button" onClick={sendMessage} className="btn btn-success btn-lg px-3">send</button>
                    </div>
                    <div className="text-danger">
  {error }
</div>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Contact
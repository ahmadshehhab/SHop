import React from 'react'

const Contact = () => {
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

   {/*  <div id="mapid" style="width: 100%; height: 300px;"></div>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
    <script>
        var mymap = L.map('mapid').setView([-23.013104, -43.394365, 13], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Zay Telmplte | Template Design by <a href="https://templatemo.com/">Templatemo</a> | Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);

        L.marker([-23.013104, -43.394365, 13]).addTo(mymap)
            .bindPopup("<b>Zay</b> eCommerce Template<br />Location.").openPopup();

        mymap.scrollWheelZoom.disable();
        mymap.touchZoom.disable();
    </script> */}
 
    <div className="container-sm py-5">
        <div className="row py-5">
            <form className="col-md-9 m-auto" method="post" role="form">
                <div className="row">
                    <div className="form-group col-md-6 mb-3">
                        <label htmlFor= "inputname">Name</label>
                        <input type="text" className="form-control mt-1" id="name" name="name" placeholder="Name" />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                        <label htmlFor= "inputemail">Email</label>
                        <input type="email" className="form-control mt-1" id="email" name="email" placeholder="Email" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor= "inputsubject">Subject</label>
                    <input type="text" className="form-control mt-1" id="subject" name="subject" placeholder="Subject" />
                </div>
                <div className="mb-3">
                    <label htmlFor= "inputmessage">Message</label>
                    <textarea className="form-control mt-1" id="message" name="message" placeholder="Message" rows="8"></textarea>
                </div>
                <div className="row">
                    <div className="col text-end mt-2">
                        <button type="submit" className="btn btn-success btn-lg px-3">Let’s Talk</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Contact
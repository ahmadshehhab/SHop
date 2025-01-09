import React from "react";
import "./Article.css";
import "../../../assets/css/slick.min.css";
import "../../../assets/css/slick-theme.min.css";
import "../../../assets/css/fontawesome.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const Article = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  let d = [];
  const getPosts = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .get("https://ahmadshehab19951995.pythonanywhere.com/prof/jobposts/?notAccepted=1", {
        headers,
      })
      .then((res) => {
        setData(res.data.filter((e) => e.id != id));
      })
      .catch((err) => {
        setError(err.response.data[Object.keys(err.response.data)[0]][0]);
        console.log(err.response.data);
      });
  };
  useEffect(() => {
    getPosts().then(console.log(d));
  }, []);
  const settings = {
    infinite: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <>
      <section className="py-5">
        <div className="container-sm ">
          <div className="row text-left p-2 pb-3">
            <h4>Related Products</h4>
          </div>

          <Slider id="carousel-related-product " {...settings}>
            {data ? (
              data.map((e) => (
                <>
                  <div className="p-2 pb-3">
                    <div className="product-wap card rounded-0">
                      <div className="card rounded-0">
                        <img
                          className="card-img rounded-0 img-fluid"
                          src={e.image}
                        />
                      </div>
                      <div className="card-body">
                        <a
                          href="shop-single.html"
                          className="h3 text-decoration-none"
                        >
                          {e.title}
                        </a>

                        <p className="text-center mb-0">$20.00</p>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <>Loading</>
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Article;

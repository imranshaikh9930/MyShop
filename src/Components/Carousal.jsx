import React from "react";
import Slider from "react-slick";
import bg1 from "../assets/bannerImgOne.jpg";
import bg2 from "../assets/bannerImgTwo.jpg";
import bg3 from "../assets/bannerImgThree.jpg";
import bg4 from "../assets/bannerImgFour.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousal = () => {
  const images = [bg1, bg2, bg3, bg4];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white">
      {/* Heading */}
      <div className="text-center pt-6 mb-4">
        {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          🛍️ Product Advertisement
        </h2> */}
        <h2 className="text-gray-500 text-3xl md:text-4xl mt-2">
          Discover the latest arrivals and exclusive offers!
        </h2>
      </div>

      {/* Slider Container */}
      <div className="w-full max-w-[1440px] px-2 md:px-6 mx-auto overflow-hidden rounded-xl relative">
        <Slider {...settings}>
          {images.map((item, i) => (
            <div
              key={i}
              className="h-[70vh] w-full flex justify-center items-center bg-gray-100 rounded-xl "
            >
              <img
                src={item}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover rounded-xl "
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Dots Custom Style */}
      <style>
        {`
          .slick-dots {
            bottom: 15px;
          }
          .slick-dots li button:before {
            font-size: 12px;
            color: #888;
          }
          .slick-dots li.slick-active button:before {
            color: #111;
          }
          .slick-prev, .slick-next {
            z-index: 50;
            width: 40px;
            height: 40px;
            background-color: rgba(0,0,0,0.4);
            border-radius: 50%;
          }
          .slick-prev::before, .slick-next::before {
            font-size: 20px;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default Carousal;

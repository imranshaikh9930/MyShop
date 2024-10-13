import React from 'react';
import Slider from "react-slick";
import bg1 from "../assets/bannerImgOne.jpg";
import bg2 from "../assets/bannerImgTwo.jpg";
import bg3 from "../assets/bannerImgThree.jpg";
import bg4 from "../assets/bannerImgFour.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousal = () => {
  const arr = [bg1, bg2, bg3, bg4];

  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Enable infinite scrolling
    speed: 800, // Transition speed (500ms)
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 4000, // Autoplay interval (2 seconds)
    pauseOnHover: true, // Pause autoplay on hover
    responsive: [
      {
        breakpoint: 1024, // Screens larger than 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600, // Screens larger than 600px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480, // Screens larger than 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="w-[100vw]  items-center -mt-4 md:mt-10  text-black relative -z-10">
      <Slider {...settings}>
        {arr.map((item, i) => (
          <div className="flex" key={i}>
            <img
              src={item}
              alt={`Slide ${i + 1}`}
              className="w-full h-auto object-cover mt-[5rem] md:mt-10"
            />
          </div>
        ))}
      </Slider>
       {/* <Slider {...settings} className='flex justify-center items-center'>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider> */}
  
     
    </div>
  );
};

export default Carousal;

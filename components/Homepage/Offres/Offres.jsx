"use client";
import "./Offres.css";
import ServicesCard from "../../Utilities/ServicesCard/ServicesCard";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
export default function Offres({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  let showRigthArrow = true;
  if (currentSlide >= totalSlides - 2.1 && window.innerWidth >= 701) {
    showRigthArrow = false;
  }
  if (currentSlide >= totalSlides - 1.2 && window.innerWidth <= 700) {
    showRigthArrow = false;
  }
  const NextArrow = (props) =>
    showRigthArrow ? (
      <div
        className="custom-arrow custom-prev-arrow"
        style={{
          backgroundColor: "#fff",
          width: "30px",
          height: "30px",
          position: "absolute",
          top: "50%",
          right: "10px",
          zIndex: "999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          borderRadius: " 50%",
          cursor: "pointer",
        }}
        onClick={props.onClick}
      >
        <span className="icon-navigate_next"></span>
      </div>
    ) : null;
  const PrevArrow = (props) =>
    currentSlide === 0 ? null : (
      <div
        className="custom-arrow custom-prev-arrow"
        style={{
          backgroundColor: "#fff",
          width: "30px",
          height: "30px",
          position: "absolute",
          top: "50%",
          left: "10px",
          zIndex: "999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          borderRadius: " 50%",
          cursor: "pointer",
        }}
        onClick={props.onClick}
      >
        <span className="icon-navigate_before"></span>
      </div>
    );
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const[number,setNumber]=useState(0)
  useEffect(()=>{
    if(window.innerWidth>700){
      setNumber(710)
    }else{
      setNumber(300)
    }
  },[window.innerWidth])
  let offersRef=useRef(null);
  const [sectionTop, setSectionTop] = useState(0);
  useEffect(() => {
    if (offersRef.current) {
      setSectionTop(offersRef.current.offsetTop);
    }
  }, [offersRef]);
  let {scrollY}=useScroll();
  let translateY=useTransform(scrollY,[sectionTop-number,sectionTop-(number-80)],[200,0])
  let opacity=useTransform(scrollY,[sectionTop-number,sectionTop-(number-80)],[0,1]);
  return (
    <>
    <motion.section className="offers"
    ref={offersRef}
    style={{translateY,opacity,transition:"1.5s"}}
    >
      {data && (
        <>
          <div className="offers-content">
            {data.map((data, index) => (
              <ServicesCard
                key={index}
                link={data.link}
                img={data.image}
                text={data.text}
                head={data.head}
              />
            ))}
          </div>
          <Slider {...settings}>
            {data.map((data, index) => (
              <div className="slider-style" key={index}>
                <ServicesCard
                  link={data.link}
                  img={data.image}
                  text={data.text}
                  head={data.head}
                />
              </div>
            ))}
          </Slider>
        </>
      )}
    </motion.section>
    </>
  );
}

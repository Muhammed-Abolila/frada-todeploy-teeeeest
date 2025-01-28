"use client";
import { Container } from "react-bootstrap";
import im1 from "../../../public/Images/new/subCategory-home/1.jpg";
import im2 from "../../../public/Images/new/subCategory-home/2.jpg";
import im3 from "../../../public/Images/new/subCategory-home/3.jpg";
import im4 from "../../../public/Images/new/subCategory-home/4.jpg";
import im5 from "../../../public/Images/new/subCategory-home/5.jpg";
import im6 from "../../../public/Images/new/subCategory-home/6.jpg";
import "./SubCategoryLinks.css";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
export default function SubCategoryLinks() {
  const [slideToShow, setSlideToShow] = useState(0);
  useEffect(() => {
    if (window.innerWidth <= 450) {
      setSlideToShow(1.5);
    } else if (window.innerWidth <= 1024) {
      setSlideToShow(2.3);
    } else if (window.innerWidth > 1024) {
      setSlideToShow(5.5);
    }
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const totalSlides = 6;
  const NextArrow = (props) => {
    setIsLastSlide(currentSlide >= totalSlides - props.slidesToShow);
    return isLastSlide ? null : (
      <div
        className="custom-arrow custom-prev-arrow"
        style={{
          backgroundColor: "#fff",
          width: "40px",
          height: "40px",
          position: "absolute",
          top: "50%",
          right: "25px",
          zIndex: "999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          borderRadius: " 50%",
          cursor: "pointer",
        }}
        onClick={props.onClick}
      >
        <span className="icon-navigate_next"></span>
      </div>
    );
  };
  const PrevArrow = (props) =>
    currentSlide === 0 ? null : (
      <div
        className="custom-arrow custom-prev-arrow"
        style={{
          backgroundColor: "#fff",
          width: "40px",
          height: "40px",
          position: "absolute",
          top: "50%",
          left: "25px",
          zIndex: "999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
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
    infinite: true,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 700,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slideToShow,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: slideToShow,
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
      setNumber(550)
    }
  },[window.innerWidth])
  let subCategoryHomeRef=useRef(null);
  const [sectionTop, setSectionTop] = useState(0);
  useEffect(() => {
    if (subCategoryHomeRef.current) {
      setSectionTop(subCategoryHomeRef.current.offsetTop);
    }
  }, [subCategoryHomeRef]);
  let {scrollY}=useScroll();
  let translateY=useTransform(scrollY,[sectionTop-number,sectionTop-(number-60)],[200,0])
  let opacity=useTransform(scrollY,[sectionTop-number,sectionTop-(number-60)],[0,1])
  return (
    <div style={{overflow:"hidden"}}>
    <motion.section
      className="subCategory-home"
      ref={subCategoryHomeRef}
      style={{translateY,opacity,transition:"1.5s"}}
    >
      <Slider
        {...settings}
        nextArrow={
          <NextArrow
            slidesToShow={settings.slidesToShow}
            currentSlide={currentSlide}
            totalSlides={totalSlides}
          />
        }
        prevArrow={
          <PrevArrow
            slidesToShow={settings.slidesToShow}
            currentSlide={currentSlide}
          />
        }
      >
        <div className="slider-style">
          <div className="sub-card">
            <Link
              href="/category/5/subcategory/13"
              as="/category/5/subcategory/13"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <div className="content">
                <Image src={im2} alt="إكتشف أجود الخامات" />
                <div className="caption">
                  <p>إكتشف العقال</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="slider-style">
          <div className="sub-card">
            <Link
              href="/category/6"
              as="/category/6"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <div className="content">
                <Image src={im3} alt="إكتشف أجود الخامات" />
                <div className="caption">
                  <p>إكتشف أجود الخامات</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="slider-style">
          <div className="sub-card">
            <Link
              href="/category/6"
              as="/category/6"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <div className="content">
                <Image src={im6} alt="إكتشف الإكسسوارات" />
                <div className="caption">
                  <p>إكتشف الإكسسوارات</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="slider-style">
          <div className="sub-card">
            <Link
              href="/category/5/subcategory/10"
              as="/category/5/subcategory/10"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <div className="content">
                <Image src={im4} alt="إكتشف الأشمغة" />
                <div className="caption">
                  <p>إكتشف الأشمغة</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="slider-style">
          <div className="sub-card">
            <Link
              href="/category/1"
              as="/category/1"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <div className="content">
                <Image src={im1} alt="إكتشف النعال" />
                <div className="caption">
                  <p>إكتشف النعال</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="slider-style">
          <div className="sub-card">
            <Link
              href="/category/2"
              as="/category/2"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <div className="content">
                <Image src={im5} alt="إكتشف الأحذية" />
                <div className="caption">
                  <p>إكتشف الأحذية</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Slider>
    </motion.section>
    </div>
  );
}

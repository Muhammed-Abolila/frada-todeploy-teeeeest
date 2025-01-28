"use client";
import "./HomeProducts.css";
import Slider from "react-slick";
import ProductCard from "../../Utilities/ProductCard/ProductCard";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCookie } from "cookies-next";
import SnapTrackEvents from "../../../src/customHooks/SnapTrackEvents/SnapTrackEvents";
export default function HomeProducts({ allProducts, addToCard }) {
  console.log("all products", allProducts);
  useEffect(() => {
    const email = getCookie("Email");
    const phone = getCookie("Phone");
    SnapTrackEvents(
      "PAGE_VIEW",
      null,
      null,
      null,
      null,
      null,
      email,
      phone,
      null,
      null,
      null,
      null,
      null
    );
  }, [allProducts]);
  const NextArrow = (props) => (
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
  );
  const PrevArrow = (props) => (
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
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [number, setNumber] = useState(0);
  useEffect(() => {
    if (window.innerWidth > 700) {
      setNumber(710);
    } else {
      setNumber(700);
    }
  }, [window.innerWidth]);
  let homeProductsRef = useRef(null);
  const [sectionTop, setSectionTop] = useState(0);
  useEffect(() => {
    if (homeProductsRef.current) {
      setSectionTop(homeProductsRef.current.offsetTop);
    }
  }, [homeProductsRef]);
  let { scrollY } = useScroll();
  let translateY = useTransform(
    scrollY,
    [sectionTop - number, sectionTop - (number - 110)],
    [200, 0]
  );
  let opacity = useTransform(
    scrollY,
    [sectionTop - number, sectionTop - (number - 110)],
    [0, 1]
  );
  return (
    <>
      <motion.div
        ref={homeProductsRef}
        className="HomeProducts"
        style={{ translateY, opacity, transition: "1s" }}
      >
        <Slider {...settings}>
          {allProducts
            ? allProducts.map((item) => (
                <div
                  className="slider-style"
                  style={{ outline: "none", border: "none" }}
                  key={item.ProductID}
                >
                  <ProductCard item={item} addToCard={addToCard} />
                </div>
              ))
            : null}
        </Slider>
      </motion.div>
    </>
  );
}

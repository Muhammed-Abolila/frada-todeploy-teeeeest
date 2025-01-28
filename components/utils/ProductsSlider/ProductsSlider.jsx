"use client";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

const ProductsSlider = ({ title, products, link }) => {
  console.log("products",products);
  
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <GrFormPrevious />,
    nextArrow: <MdOutlineNavigateNext />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="carousel-3 mb-5 flex flex-col   px-10">
      <h4 className="text-right text-lg font-bold pr-2  text-blackColor mt-[10px] lg:mx-[30px] md:mx-5">
        {title}
      </h4>
      <Slider {...settings}>
        {products.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
      </Slider>
      <Link
        href={`/${link}`}
        className="bg-mainColor text-whiteColor ml-2 mt-0 px-4 py-1 block  rounded-lg  md:mx-5 lg:mx-[30px]   w-fit text-nowrap text-center"
      >
        تصفح المزيد
      </Link>
    </div>
  );
};

export default ProductsSlider;

"use client";
import Slider from "react-slick";
import HeroCard from "./HeroSectionAtoms/HeroCard/HeroCard";
import Services from "../../../components/Services/Services";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const HeroSection = ({ bannerData }) => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    arrows: false,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",

  };
  return (
    <>
      {/* Start Hero Section */}
      <div className="hidden lg:block relative mb-36">
        <Slider {...settings} className={``}>
          {bannerData.map((item, index) => {
            return <HeroCard item={item} key={index} />;
          })}
        </Slider>
        <div className="absolute  right-1/2 transform translate-x-2/4 -translate-y-1/2 md:w-[85%] lg:max-w-[1200px] m-auto">
          <Services />          
        </div>
      </div>
      {/* End Hero Section */}
    </>
  );
};

export default HeroSection;

"use client";
import React, { useEffect, useState } from "react";
import imgExpired from "../../../public/images/expired.svg";
export default function ContTimeDown({ offer }) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    localStorage.setItem("countTimeDown", offer?.offer_date);
    localStorage.setItem("offer_percentage", offer?.percentage);
  }, []);
  const calcTimeDown = () => {
    let savedTime = localStorage.getItem("countTimeDown");
    let endTime = new Date(savedTime);
    let now = new Date();
    let difference = endTime - now;

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    const timer = setInterval(calcTimeDown, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex justify-center items-center gap-5  xs:flex-row-reverse lg:flex-col md:p-0 order-1 min-w-80 mt-2 lg:mt-0  ">
      <div className="bg-darkOrange lg:px-7 text-white md:py-5 md:px-3  w-[100px] py-1 md:w-[200px] lg:w-[100%] relative flex xs:flex-col items-center justify-center sm:mt-4 lg:mt-0 lg:shadow-none   " style={{boxShadow:"8px 8px black"}}>
        <span className="text-3xl md:text-6xl text-center">
          {`${window.localStorage.getItem("offer_percentage")}%`}
        </span>
        <span className="text-xl md:text-3xl text-center md:text-white">
          OFF
        </span>
      </div>

      <div className="flex  sm:flex-row  justify-start items-center gap-2 py-2 px-2  ">
        <img src={imgExpired.src} alt="..." className="max-w-[100px] md:max-w-[130px]" />
        <p className="text-md md:text-2xl font-bold flex  flex-1">
          <span>{timeLeft.days}</span> <span>d</span> :
          <span>{timeLeft.hours}</span> <span>h</span> :
          <span>{timeLeft.minutes}</span> <span>m</span> :
          <span>{timeLeft.seconds}</span> <span>s</span>
        </p>
      </div>
    </div>
  );
}

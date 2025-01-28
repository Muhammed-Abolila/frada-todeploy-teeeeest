"use client";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import cartImage from "../../../public/Images/cart.png";
import logoImage from "../../../public/Images/Logos/logo-white.svg";
import "./HomeLayerPhone.css";
import Image from "next/image";
import { useState } from "react";
const HomeLayerPhone = () => {
  const [showLayer, setShowLayer] = useState("flex");
  return (
    <section
      className={`home-layer sm:hidden ${showLayer} fixed top-0 left-0  w-full   flex-col h-[100vh] justify-between  text-right z-[1000] `}
    >
      <div className="flex justify-center py-2">
        <Image src={logoImage} width={200} height={200} alt="frada ksa store" />
      </div>
      <div className="content  w-full flex flex-col gap-7 items-end  bg-blackOpacity  py-10 px-6 rounded-t-3xl">
        <p className="text-3xl flex flex-col font-bold gap-2">
          <span className="text-white">نهـــج جديــد</span>
          <span className="text-darkOrange">للتســوق</span>
        </p>
        <p className="text-sm  text-white leading-6">
          مرحباً بكم في تطبيق التسوق الخاص بنا، حيث تلتقي الراحة مع الأناقة،
          وإستكشف مجموعة كبيرة من المنتجات، وإعثر على .عروض لا تصدق وتسوق بثقة
        </p>
        <button
          className="flex bg-darkOrange items-center text-white w-full justify-between p-2 rounded-lg "
          onClick={() => setShowLayer("hidden")}
        >
          <img
            src={cartImage.src}
            className="border rounded-full"
            style={{
              borderColor: "white",
              borderWidth: "10px",
              backgroundColor: "white",
            }}
            alt="frada ksa store"
          />
          <span className="text-xl">تسوق الان</span>
          <MdKeyboardDoubleArrowRight className="text-3xl" />
        </button>
      </div>
    </section>
  );
};

export default HomeLayerPhone;

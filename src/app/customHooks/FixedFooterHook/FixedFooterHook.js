import fradaShape from "../../../../public/Images/ICONS-phone/fradaShape.svg";
import fradaShapeMobile from "../../../../public/Images/ICONS-phone/mobile/fradaShape.svg";
import cartShape from "../../../../public/Images/ICONS-phone/cartShape.svg";
import cartShapeMobile from "../../../../public/Images/ICONS-phone/mobile/cartShape.svg";
import contactShape from "../../../../public/Images/ICONS-phone/contactShape.svg";
import contactShapeMobile from "../../../../public/Images/ICONS-phone/mobile/contactShape.svg";
import wishShape from "../../../../public/Images/ICONS-phone/wishShap.svg";
import wishShapeMobile from "../../../../public/Images/ICONS-phone/mobile/wishShap.svg";
import accShap from "../../../../public/Images/ICONS-phone/accountShap.svg";
import accShapMobile from "../../../../public/Images/ICONS-phone/mobile/accountShap.svg";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
const FixedFooterHook = () => {
  let pathName = usePathname();
  const [activeIndex, setActiveIndex] = useState(2);
  const [shape, setShape] = useState(fradaShape);
  const router = useRouter();
  const navigateToRoute = (param) => {
    router.push(`/${param}`);
    if (param == "dashboard" && getCookie("access_token") == undefined) {
      router.push(`/login`);
    }
  };
  useEffect(() => {
    if (pathName == "/cart") {
      setActiveIndex(1);
    } else if (pathName == "/wishes") {
      setActiveIndex(3);
    } else if (pathName == "/dashboard") {
      setActiveIndex(4);
    } else {
      setActiveIndex(2);
    }
  }, [pathName]);
  useEffect(() => {
    const listElements = document.querySelectorAll(".list");
    const activeLink = (index) => {
      listElements.forEach((item) => item.classList.remove("active"));
      listElements[index].classList.add("active");
    };
    const handleClick = (index) => {
      setActiveIndex(index);
    };
    listElements.forEach((item, index) => {
      item.addEventListener("click", () => {
        activeLink(index);
        handleClick(index);
      });
    });

    if (activeIndex === 0) {
      if (window.innerWidth < 400) {
        setShape(contactShapeMobile);
      } else {
        setShape(contactShape);
      }
    } else if (activeIndex === 1) {
      if (window.innerWidth < 400) {
        setShape(cartShapeMobile);
      } else {
        setShape(cartShape);
      }
    } else if (activeIndex === 2) {
      if (window.innerWidth < 400) {
        setShape(fradaShapeMobile);
      } else {
        setShape(fradaShape);
      }
    } else if (activeIndex === 3) {
      if (window.innerWidth < 400) {
        setShape(wishShapeMobile);
      } else {
        setShape(wishShape);
      }
    } else if (activeIndex === 4) {
      if (window.innerWidth < 400) {
        setShape(accShapMobile);
      } else {
        setShape(accShap);
      }
    }
    // Cleanup event listeners on component unmount
    return () => {
      listElements.forEach((item, index) => {
        item.removeEventListener("click", () => {
          activeLink(index);
          handleClick(index);
        });
      });
    };
  }, [activeIndex]);
  return [shape, activeIndex, navigateToRoute];
};
export default FixedFooterHook;

"use client";
import Otheroffer from "./Otheroffer/Otheroffer";
import Panelhome from "./Panelhome/Panelhome";
import Offres from "./Offres/Offres";
import HomeProducts from "./HomeProducts/HomeProducts";
import HomePageHook from "../../src/customHooks/HomePageHook/HomePageHook";
import LoadingPage from "../Utilities/LoadingPage/LoadingPage";
import SubCategoryLinks from "./SubCategoryLinks/SubCategoryLinks";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import im1 from "../../public/Images/new/14.jpg";
import im2 from "../../public/Images/new/36.jpg";
import im3 from "../../public/Images/new/19.jpg";
import im4 from "../../public/Images/new/16.jpg";
import im5 from "../../public/Images/new/38.jpg";
import im6 from "../../public/Images/new/40.jpg";
import ProductDetailsMenu from "./../Utilities/ProductDetailsMenu/ProductDetailsMenu";
export default function Homepage() {
  let pathName = getCookie("pathName");
  const [allProducts, loading] = HomePageHook();
  async function catchToken() {
    if (window?.location?.search) {
      const urlParams = new URLSearchParams(window.location.search);
      let tokenCode = urlParams.get("token_code");
      if (tokenCode != null) {
        setCookie("access_token", tokenCode);
        window.location.href = `${pathName}`;
        deleteCookie("pathName");
      }
    }
  }
  useEffect(() => {
    catchToken();
  }, []);
  const WeekoffersData = [
    {
      link: 5,
      image: im1,
      text: "أساسيات الأناقة",
      head: "الزي السعودي",
    },
    {
      link: 2,
      image: im2,
      text: "الأحذية الرسمية",
      head: "وصل حديثاً",
    },
    {
      link: 1,
      image: im3,
      text: "تجربة سحرية للقدمين",
      head: "النعال",
    },
  ];
  const BottomData = [
    {
      link: 5,
      image: im5,
      text: "رمز الهوية والتراث العريق",
      head: "الزي السعودي",
    },
    {
      link: 6,
      image: im4,
      text: "رمز الهوية والتراث العريق",
      head: "العطور",
    },
    {
      link: 5,
      image: im6,
      text: "رمز الهوية والتراث العريق",
      head: "الإكسسوارات",
    },
  ];
  const [showProductDetailsMenu, setShowProductDetailsMenu] = useState(false);
  const [productId, setProductId] = useState(null);
  const addToCard = (id) => {
    setProductId(id);
    setShowProductDetailsMenu(true);
  };
  useEffect(() => {
    const handleCloseProductDetailsMenu = (event) => {
      if (
        showProductDetailsMenu &&
        !event.target.closest(".product-details-menu")
      ) {
        setShowProductDetailsMenu(false);
      }
    };
    ["mousedown", "keydown"].forEach((userEvent) =>
      document.addEventListener(userEvent, handleCloseProductDetailsMenu)
    );
    return () => {
      ["mousedown", "keydown"].forEach((userEvent) =>
        document.removeEventListener(userEvent, handleCloseProductDetailsMenu)
      );
    };
  }, [showProductDetailsMenu]);
  return (
    <>
      {loading == false ? (
        <div>
          <Panelhome />
          <HomeProducts
            allProducts={allProducts.slice(10, 18)}
            addToCard={addToCard}
          />
          <SubCategoryLinks />
          <Offres data={WeekoffersData} />
          <Otheroffer
            allProducts={allProducts.slice(40, 48)}
            addToCard={addToCard}
          />
          <Offres data={BottomData} />
        </div>
      ) : (
        <LoadingPage />
      )}
      <ProductDetailsMenu
        showProductDetailsMenu={showProductDetailsMenu}
        setShowProductDetailsMenu={setShowProductDetailsMenu}
        productId={productId}
      />
      <ToastContainer />
    </>
  );
}

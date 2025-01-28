import React, { useEffect, useRef, useState } from "react";
import "./ProductCardImageHolder.css";
import Slider from "react-slick";
import Link from "next/link";
import { motion } from "framer-motion";
import whitewish from "../../../../public/Images/new/heart.svg";
// import WishListHook from "../../../../src/customHooks/WishListHook/WishListHook";
import Image from "next/image";
import WishListHook from "@/app/customHooks/WishListHook/WishListHook";
const ProductCardImageHolder = ({
  setShowSearchPopup,
  item,
  choosedColor,
  addToCard,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  let sliderRef = useRef(null);
  useEffect(() => {
    if (isHovered == true) {
      sliderRef.slickPlay();
    } else if (isHovered == false) {
      sliderRef.slickPause();
    }
  }, [isHovered]);
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 600,
    waitForAnimate: true,
  };
  const geToProductDetails = () => {
    if (setShowSearchPopup) {
      setShowSearchPopup(false);
    }
  };
  // Wish List Logic
  const [wishData, onDeleteItem, addProductToWishList] = WishListHook();
  const [favProductId, setFavProductId] = useState([]);
  useEffect(() => {
    if (wishData) {
      let wishDataID = wishData.map((productId) => productId.ProductID);
      setFavProductId(wishDataID);
    }
  }, [wishData]);
  let favProduct = favProductId.includes(item.ProductID);
  return (
    <div
      className="product-card-img"
      onClick={() => geToProductDetails()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="wish-icon"
        animate={{scale:isHovered?1:0}}
        transition={{duration:.2}}
        style={{
          backgroundColor: favProduct ? "black" : "gray",
          cursor: "pointer",
        }}
        onClick={() =>
          favProduct
            ? onDeleteItem(item.ProductID)
            : addProductToWishList(item.ProductID)
        }
      >
        <Image src={whitewish} width="22px" height="22px" alt={item.Name} />
      </motion.div>
      <Link
        href={`/category/${item.CategoryID}${
          item.SubcategoryID ? `/subcategory/${item.SubcategoryID}` : ""
        }/product/${item.ProductID}`}
        style={{ textDecoration: "none", color: "unset" }}
      >
        <div className="slider-container">
          <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
            {choosedColor?.Image &&
              choosedColor.Image?.length > 0 &&
              choosedColor?.Image.map((color, index) => (
                <div key={index}>
                  <img
                    src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${
                      item.ProductID
                    }/${
                      choosedColor?.ColorID ? choosedColor?.ColorID : ""
                    }/${color}`}
                    className="w-100"
                    alt={item.Name}
                  />
                </div>
              ))}
          </Slider>
        </div>
      </Link>
      <motion.div
        animate={{ scale: isHovered ? 1 : 0 }}
        whileTap={{ scale: 0.85, rotate: "2.2deg" }}
        transition={{ duration: 0.3 }}
        onClick={() => addToCard(item.ProductID)}
        className="add-card"
      >
        إضافة للسلة
      </motion.div>
    </div>
  );
};

export default ProductCardImageHolder;

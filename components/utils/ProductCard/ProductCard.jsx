"use client";
// import Stars from "../../../../utilities/stars/Stars";
import { IoHeartCircle } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import Quantity0 from "./Quantity0/Quantity0";
import "./ProductCard.css";
import Link from "next/link";
import { useShowProductDetailsAside } from "@/context/showProductDetailsAside";
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_SRC;
export default function ProductCard({ product }) {
  const {
    showProductDetailsAside,
    setShowProductDetailsAside,
    productId,
    setProductId,
  } = useShowProductDetailsAside();
  const addToCart = (id) => {
    setProductId(id);
    setShowProductDetailsAside(true);
  };
  return (
    <>
      <div className="card relative rounded-lg px-3 py-2 mx-2 cursor-pointer hover:border-mainColor duration-300 ">
        {/* Offers  */}
        {/* {product && product.allQuantity > 0 && (
        <div
          className="flex absolute right-0 flex-col gap-1 bg-green-600"
          style={{ transform: "rotate(-90deg)" }}
        > 
          {product?.Discount && (
            <span className="bg-black text-white w-[85px] px-2 text-center text-sm  ">
              {product.Discount} % OFF
            </span>
          )}
          {product.offers.length > 0 && (
            <span className="bg-black text-white w-[85px] px-2 text-center text-sm  ">
              {product.offers[0]}
            </span>
          )}
        </div>
      )} */}

        <div className="w-full">
          {/* Product Price */}
          {/* <div className="w-full ">
          <div className="flex-grow "> */}
          <div className="flex items-center gap-2 flex-1 text-base">
            <div
              className={`
                  bg-black
                 text-white py-1 px-3 rounded-lg flex gap-1 `}
              style={{ flexDirection: "row-reverse" }}
            >
              <span> {product.Price} </span>
              <span>ر.س</span>
            </div>
            <div
              className={`
                  opacity-30
                  text-sm
                 text-black
                 flex items-center font-bold gap-1 before:content-[""] relative before:absolute before:top-[50%] before:left-0 before:right-0 before:h-[2px] before:bg-black`}
              style={{ flexDirection: "row-reverse" }}
            >
              <span> {product.SellPricePlusTax}</span> <span>ر.س</span>
            </div>
          </div>
          {/* </div>
        </div> */}
          {/* <RatingStars product={product} /> */}
          {/* product Image */}
          <div className="flex flex-col justify-center h-full   ">
            <Image
              src={`${IMAGE_URL}/${product.ProductID}/${
                product?.Colors?.[0]?.ColorID || ""
              }/${product?.Colors?.[0]?.Image || ""}`}
              width={1000}
              height={1000}
              alt={product.Name}
              className="mx-auto"
              style={{ width: "100%", aspectRatio: "13/12" }}
            />
          </div>
        </div>

        {/* product color image */}
        <div className="flex gap-2 w-full justify-end items-center my-1">
          {product?.Colors && product?.Colors?.length > 3 && (
            <span>+{product.Colors.length - 3}</span>
          )}
          {product.Colors?.map((i, index) => {
            if (index <= 2) {
              return (
                <p key={index}>
                  <img
                    src={`${IMAGE_URL}/${product.ProductID}/${
                      product?.Colors?.[index]?.ColorID || ""
                    }/${product?.Colors?.[index]?.Image || ""}`}
                    width={200}
                    height={200}
                    alt={product.Name}
                    className="w-[40px] h-[40px] flex rounded"
                  />
                </p>
              );
            }
          })}
        </div>
        {/* Product Quantity */}
        {product && product.allQuantity <= 0 && <Quantity0 />}
        {/* Product Name And Barcode */}
        <div className="w-full text-right">
          <p>{product?.Name}</p>
          <p className="text-sm text-gray-500 my-2">{product.Barcode}</p>
        </div>
        {/* Card Footer Icons */}
        <div className="flex justify-between w-full">
          <div className="flex items-center flex-1 gap-4 ">
            <IoHeartCircle className="opacity-[1] text-4xl cursor-pointer" />
            <Link href={`/category/1/subcategory/4/product/75`}>
              <FaChevronRight className="bg-black text-white px-2  py-2 rounded-full cursor-pointer text-3xl" />
            </Link>
          </div>

          <button className={`add-cart-btn `}>
            <FaCartArrowDown />
            <span
              className="add-cart"
              onClick={() => {
                addToCart(product?.ProductID);
              }}
            >
              أضف للسلة
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

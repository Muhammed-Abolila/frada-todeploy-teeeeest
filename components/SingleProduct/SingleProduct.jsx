"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RatingsAndReviews from './SingleProductAtoms/RatingsAndReviews/RatingsAndReviews';
import SingleProductCard from "./SingleProductAtoms/SingleProductCard/SingleProductCard";
import ProductDescription from './SingleProductAtoms/ProductDescription/ProductDescription';
import ItemReviewsHook from "@/app/customHooks/ItemDetailsHook/ItemReviewsHook";
import { GetProductDetails } from "@/app/Redux/Actions/ItemDetailsActions";
export default function SingleProduct({productID}) {
  const [AllReviews, reload, setReload] = ItemReviewsHook(productID);
    // Get All Data
    let dispatch=useDispatch()
    useEffect(() => {
      const getProductData = () => {
          dispatch(GetProductDetails(productID?productID:""));
      };
      getProductData()
    }, [productID]);
    const productDetailsRes = useSelector(
      (state) => state.ItemDetailsReducer.ProductDetails.data
    );
  return (
    <>
      <SingleProductCard AllReviews={AllReviews} />
      {/* <ProductDescription productData={productDetailsRes}/> */}
      {/* <RatingsAndReviews
        AllReviews={AllReviews}
        reload={reload}
        setReload={setReload}
      /> */}
    </>
  );
}

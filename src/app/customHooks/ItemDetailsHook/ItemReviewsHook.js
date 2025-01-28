"use client"
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllReviews } from './../../Redux/Actions/Ratings&ReviewsActions';
const ItemReviewsHook=(productID)=>{
    const [reload,setReload]=useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllReviewsFunc = async () => {
      await dispatch(GetAllReviews(productID));
    };
    getAllReviewsFunc();
  }, [reload]);
  let AllReviewsRes=useSelector(state=>state.Ratings_ReviewsReducer.GetAllReviews);
  let AllReviews;
    try{
      if(AllReviewsRes?.data){
        AllReviews=AllReviewsRes.data.data
      }
    }catch(e){
      console.log(e);
    }
    return[
        AllReviews, reload,setReload
    ]
}
export default ItemReviewsHook
import axios from "axios"
import { ADD_REVIEW, API_URL, DELETE_REVIEW, GET_ALL_REVIEWS, config } from "../Types";
// Get All  Reviews
export const GetAllReviews=(productId)=>{
    return async(dispatch)=>{
        try{
            let response=await axios.get(`${API_URL}/getReviews/${productId}`,config);
            dispatch({
                type:GET_ALL_REVIEWS,
                payload:response
            })
        }catch(e){
            dispatch({
                type:GET_ALL_REVIEWS,
                payload:e.response
            })
        }
    }
}
// Make Review
export const MakeReview=(formData)=>{
    return async(dispatch)=>{
        try{
            let response=await axios.post(`${API_URL}/makeReview`,formData,config);
            dispatch({
                type:ADD_REVIEW,
                payload:response.data
            })
        }catch(e){
            dispatch({
                type:ADD_REVIEW,
                payload:e.response
            })
        }
    }
}
// Delete Review
export const DeleteReview=(reviewId)=>{
    return async(dispatch)=>{
        try{
            let response=await axios.delete(`${API_URL}/deleteReview/${reviewId}`,config);
            console.log("DeleteReview",response);
            dispatch({
                type:DELETE_REVIEW,
                payload:response.data
            })
        }catch(e){
            dispatch({
                type:DELETE_REVIEW,
                payload:e.response
            })
        }
    }
}
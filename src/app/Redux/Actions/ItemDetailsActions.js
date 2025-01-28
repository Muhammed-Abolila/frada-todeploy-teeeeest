import axios from "axios";
import { FETCH_DATA_FAILURE, GET_PRODUCT_DETAILS, API_URL, ADD_ITEM_TO_CART } from "../Types";
import { getCookie } from "cookies-next";
// Get Product Details Action
export const GetProductDetails = (ProductID) => {
    return async (dispatch) => {
        try {
            let response = await axios.get(`${API_URL}/getProduct/${ProductID}`);
            dispatch({
                type: GET_PRODUCT_DETAILS,
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: FETCH_DATA_FAILURE,
                payload: e.response
            })
        }
    }
}
// Add To Cart Action
export const AddToCart=(formData)=>{
    return async(dispatch)=>{
        try{
            let response=await axios.post(`${API_URL}/addItem?SessionID=${getCookie("session_id")}`, formData);
            dispatch({
                type:ADD_ITEM_TO_CART,
                payload:response.data
            })
        }catch(e){
            dispatch({
                type:ADD_ITEM_TO_CART,
                payload:e.response
            })
        }
    }
}
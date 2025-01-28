import axios from "axios"
import {
  API_URL,
  GET_ALL_COLLECTIONS,
  GET_SINGLE_COLLECTION,
  ADD_COLLECTION_TO_CART
} from "./../Types";
import { getCookie } from "cookies-next";
// Get All Collections
export const GetAllCollections = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_URL}/collection`);
      dispatch({
        type: GET_ALL_COLLECTIONS,
        payload: response.data.Collections,
      });
    } catch (e) {
      dispatch({
        type: GET_ALL_COLLECTIONS,
        payload: e.response,
      });
    }
  };
};
// Get Single Collection Depend On CollectionID
export const GetSingleCollection = (collectionID) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${API_URL}/collection/${collectionID}`);
      dispatch({
        type: GET_SINGLE_COLLECTION,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_SINGLE_COLLECTION,
        payload: e.response,
      });
    }
  };
};
//Add Collection To Cart
export const AddCollectionToCart=(formData)=>{
  console.log("formData",formData);
  return async(dispatch)=>{
      try{
          let response=await axios.post(`${API_URL}/storeCartItem?SessionID=${getCookie("session_id")}`, formData);
      console.log("response",response);
          dispatch({
              type:ADD_COLLECTION_TO_CART,
              payload:response.data
          })
      }catch(e){
          dispatch({
              type:ADD_COLLECTION_TO_CART,
              payload:e.response
          })
      }
  }
}
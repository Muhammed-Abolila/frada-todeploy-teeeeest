import axios from "axios";
import {
  API_URL,
  CHANGE_ITEM_QTY,
  DELETE_CART_ITEM,
  GET_CART_DATA,
  GET_VARIANT_ITEMS_STOCK_QUANTITY,
  MAKE_ORDER,
  config,
  REGECTED_ORDER,
  token,
} from "../Types";
import NotificationComp from "../../customHooks/NotificationComp/NotificationComp";
import { getCookie } from "cookies-next";
import SnapTrackEvents from "../../customHooks/SnapTrackEvents/SnapTrackEvents";
const [Notify] = NotificationComp();
// GET CART DATA
export const GetCartData = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${API_URL}/getMyCart?SessionID=${getCookie("session_id")}`,
        config
      );
      dispatch({
        type: GET_CART_DATA,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_CART_DATA,
        payload: e.response,
      });
    }
  };
};
// DELETE SINGLE CART ITEM
export const DeleteCartItem = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${API_URL}/deleteItem/${id}?SessionID=${getCookie("session_id")}`,
        config
      );
      dispatch({
        type: DELETE_CART_ITEM,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: DELETE_CART_ITEM,
        payload: e.response,
      });
    }
  };
};
// CHANGE ITEM QUANTITY
export const ChangeItemQuantity = (updateType, formData) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${API_URL}/${updateType}?SessionID=${getCookie("session_id")}`,
        formData,
        config
      );
      dispatch({
        type: CHANGE_ITEM_QTY,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: CHANGE_ITEM_QTY,
        payload: e.response,
      });
    }
  };
};
// this function to fetch pexil api to send data to snapchat pexil
const petchPexilApi = async () => {
  try {
    let response = await axios.get(`${API_URL}/getLastOne/pixel`, config);
    if (response?.data?.data?.status === 201) {
      SnapTrackEvents(
        "PURCHASE",
        (qty = response?.data?.data?.number_items),
        "KSA",
        (price = response?.data?.data?.price),
        (Barcode = response?.data?.data?.item_ids),
        (paymentInfoState = response?.data?.data?.payment_info_available),
        (email = response?.data?.data?.user_email),
        (phone = response?.data?.data?.user_phone_number),
        (transactionId = response?.data?.data?.transaction_id),
        (numberItems = response?.data?.data?.number_items),
        (state = response?.data?.data?.success),
        (firstname = response?.data?.data?.firstname),
        (lastname = response?.data?.data?.lastname),
        (city = response?.data?.data?.geo_city)
      );
    }
  } catch (e) {}
};
// Make Order
export const MakeOrder = (formData, choosedPaymentMethod) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${API_URL}/makeOrder`, formData, config);
      if (response.status === 201) {
        console.log("response",response);
        
        Notify("جاري إنشاء الطلب", "success");
        let formData = new FormData();
        formData.append("order_id", response.data?.data?.OrderID);
        try {
          if (choosedPaymentMethod == "tabby") {
            const response = await axios.post(
              `${API_URL}/checkout/tabby`,
              formData,
              config
            );
            petchPexilApi();
            window.location.href = response.data.data;
          } else {
            const response = await axios.post(
              `${API_URL}/checkout/telr`,
              formData,
              config
            );
            petchPexilApi();
            window.location.href = response.data.data;
          }
          Notify("تم إنشاء الطلب بنجاح", "success");
        } catch (error) {
          dispatch({
            type: REGECTED_ORDER,
            payload: error.response,
          });
        }
      }
      dispatch({
        type: MAKE_ORDER,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: MAKE_ORDER,
        payload: e.response,
      });
    }
  };
};

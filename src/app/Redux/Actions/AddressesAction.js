import axios from "axios";
import {
  API_URL,
  GET_USER_DATA,
  GET_USER_FRIEND_DATA,
  config,
} from "../Types";
// Get User Data
export const GetUserData = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_URL}/userProfile`, config);
      dispatch({
        type: GET_USER_DATA,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_USER_DATA,
        payload: e.response,
      });
    }
  };
};
// Get User friend Data
export const GetUserFriendData = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_URL}/getGift`, config);
      dispatch({
        type: GET_USER_FRIEND_DATA,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_USER_FRIEND_DATA,
        payload: e.response,
      });
    }
  };
};

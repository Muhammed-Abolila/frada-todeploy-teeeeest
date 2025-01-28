import { API_URL, LOGIN } from "../Types";
import axios from "axios";
export const Login = (data) => {
  console.log("data", data);
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${API_URL}/auth/login?email_or_phone=${data.email_or_phone}&password=${data.password}`
      );
      setCookie("userName", response.data?.user?.Username, {
        maxAge: 60 * 60 * 24 * 7,
      }); //7 days
      setCookie("access_token", response.data?.access_token, {
        maxAge: 60 * 60 * 24 * 7,
      });
      dispatch({
        type: LOGIN,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: LOGIN,
        payload: e.response,
      });
    }
  };
};

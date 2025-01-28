import axios from "axios";
import { API_URL, FORGOT_PASSWORD, RESET_PASSWORD } from "../Types";
// forgot password
export const ForgotPasswordAction = (formData) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${API_URL}/auth/forgot-password`,
        formData
      );
      dispatch({
        type: FORGOT_PASSWORD,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: e.response,
      });
    }
  };
};
// reset Password
export const ResetPasswordAction=(token,email,formData)=>{
  return async(dispatch)=>{
    try{
      let response = await axios.post(
        `${API_URL}/auth/reset-password?token=${token}&email=${email}`,
        formData
      );
      dispatch({
        type:RESET_PASSWORD,
        payload: response.data,
      })
    }catch(e){
      dispatch({
        type:RESET_PASSWORD,
        payload: e.response,
      })
    }
  }
}

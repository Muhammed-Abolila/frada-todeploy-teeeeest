import axios from "axios";
import { API_URL, GET_COUPON, config } from "../Types";
import NotificationComp from "../../customHooks/NotificationComp/NotificationComp";
const [Notify] = NotificationComp();
export const GetCoupon = (formData) => {
    return async (dispatch) => {
        try {
            let response = await axios.post(
                `${API_URL}/getCoupon`,
                formData,
                config
            );
            if (response.data.message.includes("Coupon applied successfully")) {
                Notify("تم تطبيق الكوبون بنجاح", "success");
            } else if (
                response.data.message.includes(
                    "This coupon is already taken before"
                ) ||
                response.data.message.includes("Coupon not found or expired")
            ) {
                Notify("هذا الكوبون منتهى الصلاحية أو تم إستخدامه من قبل", "error");
            }
            dispatch({
                type: GET_COUPON,
                payload: response
            })
        } catch (e) {
            dispatch({
                type: GET_COUPON,
                payload: e.response
            })
        }
    }
}
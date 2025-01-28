import axios from "axios"
import { API_URL, GET_MY_ORDERS, config } from "../Types"
export const GetMyOrders = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/getMyOrders`, config);
            console.log("response",response);
            dispatch({
                type: GET_MY_ORDERS,
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: GET_MY_ORDERS,
                payload: e.response
            })
        }
    }
}


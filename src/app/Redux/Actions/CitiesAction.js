import axios from "axios"
import { API_URL, GET_CITIES } from "../Types"
export const getCities = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/getCities`);
            dispatch({
                type: GET_CITIES,
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: GET_CITIES,
                payload: e.response
            })
        }
    }
}
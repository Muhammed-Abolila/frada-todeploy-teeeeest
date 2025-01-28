import { GET_MY_ORDERS } from "../Types";
const initialState = {
    MyOrders: []
}
export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_ORDERS:
            return {
                ...state,
                MyOrders: action.payload
            }
        default:
            return state
    }
}
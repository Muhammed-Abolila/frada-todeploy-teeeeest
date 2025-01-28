import { GET_COUPON } from "../Types";
const initialValue = {
    GetCoupon: {}
}
export const CouponReducer = (state = initialValue, action) => {
    switch (action.type) {
        case GET_COUPON:
            return {
                ...state,
                GetCoupon: action.payload
            }
        default:
            return state
    }
}
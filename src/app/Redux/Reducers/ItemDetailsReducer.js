import { ADD_ITEM_TO_CART, FETCH_DATA_FAILURE, GET_PRODUCT_DETAILS } from "../Types";
const initialValue = {
    ProductDetails: [],
    AddToCart:{},
    error: null
}
export const ItemDetailsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case GET_PRODUCT_DETAILS:
            return {
                ...state,
                ProductDetails: action.payload
            };
            case ADD_ITEM_TO_CART:
                return{
                    ...state,
                    AddToCart:action.payload
                }
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
import { GET_CITIES } from "../Types"
const initialValue = {
    Cities: []
}
export const CitiesReducer = (state = initialValue, action) => {
    switch (action.type) {
        case GET_CITIES:
            return {
                ...state,
                Cities: action.payload
            }
        default:
            return state
    }
}
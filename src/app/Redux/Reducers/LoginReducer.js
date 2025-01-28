import { LOGIN } from "../Types"
const initialValue = {
    login: {},
    token:null
}
export const LoginReducer = (state = initialValue, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: action.payload,
                token:action.payload?.data?.access_token
            }
        default:
            return state
    }
}





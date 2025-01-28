import {FORGOT_PASSWORD, RESET_PASSWORD} from "../Types"
const initialState={
    forgotPassword:{},
    resetPassword:{}
}
export const ForgotPasswordReducer=(state=initialState,action)=>{
    switch(action.type){
        case FORGOT_PASSWORD:
            return {
                ...state,
                forgotPassword:action.payload
            }
            case RESET_PASSWORD:
            return {
                ...state,
                resetPassword:action.payload
            }
            default:
                return state
    } 
}
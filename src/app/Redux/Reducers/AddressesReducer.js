import { ADD_USER_FRIEND, GET_USER_DATA, GET_USER_FRIEND_DATA } from "../Types"
const initialState = {
    UserData: {},
    UpdateUserData: {},
    UserFriendData: {},
    loading:true
}
export const AddressesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                UserData: action.payload,
                loading:false
            }
        case GET_USER_FRIEND_DATA:
            return {
                ...state,
                UserFriendData: action.payload,
                loading:false
            }
        default:
            return state
    }
}
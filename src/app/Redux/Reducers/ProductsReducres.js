import { GET_ALL_PRODUCTS, SEARCH_PRODUCTS, SEARCH_PRODUCTS_BY_CLICK} from "../Types";
const initialValue={
    AllProducts:[],
    SearchProducts:[],
    SearchProductsByOnChange:[],
    SearchProductsByOnClick:[]
}
export const ProductsReducers=(state=initialValue,action)=>{
switch(action.type){
case GET_ALL_PRODUCTS:
    return{
        ...state,
        AllProducts:action.payload
    }
    case SEARCH_PRODUCTS:
    return{
        ...state,
        SearchProducts:action.payload
    }
    case SEARCH_PRODUCTS_BY_CLICK:
    return{
        ...state,
        SearchProductsByOnClick:action.payload
    }
    default:
        return state
}
}
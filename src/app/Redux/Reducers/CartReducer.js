"use client"
import { CHANGE_ITEM_QTY, DELETE_CART_ITEM, GET_CART_DATA, GET_VARIANT_ITEMS_STOCK_QUANTITY, MAKE_ORDER, REGECTED_ORDER } from "../Types";
let initialValue = {
    CartData: [],
    CartDelete: {},
    VariantItemsStockQuantity: 0,
    ItemQty: 0,
    MakeOrder: {},
    RegectedOrder:null
}
export const CartReducer = (state = initialValue, action) => {
    switch (action.type) {
        case GET_CART_DATA:
            return {
                ...state,
                CartData: action.payload,
            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                CartDelete: action.payload,
            }
        case CHANGE_ITEM_QTY:
            return {
                ...state,
                ItemQty: action.payload
            }
        case MAKE_ORDER:
            return {
                ...state,
                MakeOrder: action.payload
            }
            case REGECTED_ORDER:
                return{
                    ...state,
                    RegectedOrder:action.payload
                }
        default:
            return state;
    }
}
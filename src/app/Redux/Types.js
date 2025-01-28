"use client";
import { getCookie } from "cookies-next";
export const token=getCookie("access_token");
export const API_URL = "https://back.fradaksa.net/api";
export let config;
try {
    if (token) {
        config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
    }
} catch (e) {
    console.log(e);
}
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const SEARCH_PRODUCTS="SEARCH_PRODUCTS";
export const SEARCH_PRODUCTS_BY_CLICK="SEARCH_PRODUCTS_BY_CLICK";
export const SEARCH_PRODUCTS_BY_CHANGE="SEARCH_PRODUCTS_BY_CHANGE";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const GET_CART_DATA = "GET_CART_DATA";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const GET_VARIANT_ITEMS_STOCK_QUANTITY = "GET_VARIANT_ITEMS_STOCK_QUANTITY ";
export const CHANGE_ITEM_QTY = "CHANGE_ITEM_QTY";
export const GET_COUPON = "GET_COUPON";
export const MAKE_ORDER = "MAKE_ORDER";
export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_FRIEND_DATA = "GET_USER_FRIEND_DATA";
export const ADD_USER_FRIEND = "ADD_USER_FRIEND";
export const GET_MY_ORDERS = "GET_MY_ORDERS";
export const GET_CITIES = "GET_CITIES";
export const LOGIN = "LOGIN";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const RESET_PASSWORD="RESET_PASSWORD";
export const GET_ALL_REVIEWS="GET_ALL_REVIEWS";
export const ADD_REVIEW="ADD_REVIEW";
export const DELETE_REVIEW="DELETE_REVIEW";
export const REGECTED_ORDER="REGECTED_ORDER";
export const ADD_ITEM_TO_CART="ADD_ITEM_TO_CART";
export const TOGGLE_CART_RELOAD = 'TOGGLE_CART_RELOAD';
export const GET_ALL_COLLECTIONS = 'GET_ALL_COLLECTIONS';
export const GET_SINGLE_COLLECTION = 'GET_SINGLE_COLLECTION';
export const ADD_COLLECTION_TO_CART = 'ADD_COLLECTION_TO_CART';
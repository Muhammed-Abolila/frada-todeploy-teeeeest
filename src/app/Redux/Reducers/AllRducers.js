"use client"
import { combineReducers } from "redux";
import { CartReducer } from "./CartReducer";
import { CouponReducer } from "./CouponReducer";
import { AddressesReducer } from "./AddressesReducer";
import { OrderReducer } from "./OrdersReducer";
import { CitiesReducer } from "./CitiesReducer";
import { LoginReducer } from "./LoginReducer";
import { ItemDetailsReducer } from "./ItemDetailsReducer";
import {ForgotPasswordReducer} from "./ForgotPasswordReducer";
import {Ratings_ReviewsReducer} from "./Ratings&ReviewsReducer";
import {ProductsReducers} from "./ProductsReducres";
import { CollectionReducer } from './CollectionReducer';
export const AllReducers = combineReducers({
    CartReducer: CartReducer,
    CouponReducer: CouponReducer,
    AddressesReducer: AddressesReducer,
    OrderReducer: OrderReducer,
    CitiesReducer: CitiesReducer,
    LoginReducer: LoginReducer,
    ItemDetailsReducer: ItemDetailsReducer,
    ForgotPasswordReducer:ForgotPasswordReducer,
    Ratings_ReviewsReducer:Ratings_ReviewsReducer,
    ProductsReducers:ProductsReducers,
    CollectionReducer:CollectionReducer
})
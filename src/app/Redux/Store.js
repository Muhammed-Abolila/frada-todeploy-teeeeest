"use client";
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import { AllReducers } from "../Redux/Reducers/AllRducers";
export let Store = createStore(
  AllReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
// export let Store = createStore(AllReducers, applyMiddleware(thunk))

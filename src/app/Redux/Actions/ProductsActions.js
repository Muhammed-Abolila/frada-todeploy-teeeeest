import axios from "axios";
import { API_URL, GET_ALL_PRODUCTS, SEARCH_PRODUCTS, SEARCH_PRODUCTS_BY_CLICK} from "../Types";
// Get All Products and Products By Category and SubCategory
export const GetProductsByQueryString = (queryString) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_URL}/products?${queryString}`);
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: e.response,
      });
    }
  };
};
// Get Search Products
export const GetProductsBySearch = (searchQuery) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_URL}/products?${searchQuery}`);
      dispatch({
        type: SEARCH_PRODUCTS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: SEARCH_PRODUCTS,
        payload: e.response,
      });
    }
  };
};
// Get Search Products By Click on Show All In Search aside
export const GetProductsSearchByOnClick = (searchQuery) => {
  console.log(searchQuery,"searchQuery");
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_URL}/products?${searchQuery}&per_page=12`);
      dispatch({
        type: SEARCH_PRODUCTS_BY_CLICK,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: SEARCH_PRODUCTS_BY_CLICK,
        payload: e.response,
      });
    }
  };
};

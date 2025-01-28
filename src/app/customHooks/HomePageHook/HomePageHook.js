import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsByQueryString } from "../../Redux/Actions/ProductsActions";
const HomePageHook = () => {
  // Get All Products
  const dispatch = useDispatch()
  useEffect(() => {
    const getAllProductsFunc = () => {
      dispatch(GetProductsByQueryString())
    };
    getAllProductsFunc();
  }, []);
  let AllProductsRes = useSelector(state => state.ProductsReducers.AllProducts);
  let allProducts = [];
  let loading = true;
  try {
    if (AllProductsRes.data) {
      allProducts = AllProductsRes.data.products.filter(
        item => item.Trademark.TrademarkID == 1
      );
      loading = false;
    } else {
      loading = true
    }
  } catch (e) {
    console.log(e);
  }
  return [allProducts, loading]
}
export default HomePageHook
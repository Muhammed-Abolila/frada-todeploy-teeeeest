import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
const SearchHook = () => {
  // Show Search Products
  const searchProductsResponse = useSelector((state) => state.ProductsReducers.SearchProducts);
  let SearchProducts=[];
  try {
    if (searchProductsResponse.data) {
      SearchProducts=searchProductsResponse.data
    }
  } catch (e) {
    console.log(e);
  }
  const [sliceNumber, setSliceNumber] = useState(7);
  useEffect(() => {
    if (window.innerWidth > 1920) {
      setSliceNumber(10);
    }
  }, [window.innerWidth]);
  return [SearchProducts,sliceNumber];
};
export default SearchHook;

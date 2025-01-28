"use client";
import "./SearchPage.css";
import CategoryProductCard from "../Category/CategoryAtoms/CategoryProductCard/CategoryProductCard";
import NoProduct from "../Utilities/NoProduct/NoProduct";
import { ToastContainer } from "react-toastify";
import FilterAndSortBar from "../Utilities/FilterAndSortBar/FilterAndSortBar";
import { useEffect, useState } from "react";
import FilterComp from "../Utilities/FilterComp/FilterComp";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsSearchByOnClick } from "@/app/Redux/Actions/ProductsActions";
export default function SearchPage() {
  const [filter, setFilter] = useState(false);
  const [grid, setGrid] = useState(true);
  const [searchProducts, setSearchProducts] = useState([]);
  const [showApplyAndDeleteBtn, setShowApplyAndDeleteBtn] = useState(false);
  const [queryStringfromFilter, setQueryStringfromFilter] = useState([]);
  const [searchword, setSearchWord] = useState('');
  const[currentPage,setCurrentPage]=useState(1)
  const dispatch=useDispatch()
// get products data depend on search word
  const searchProductsResponse = useSelector((state) => state.ProductsReducers.SearchProductsByOnClick);
  useEffect(()=>{
    try {
      if (searchProductsResponse.data) {
        setSearchProducts(searchProductsResponse.data);
        setSearchWord(searchProductsResponse.data.keys.search);
      }
    } catch (e) {
      console.log(e);
    }
  },[searchProductsResponse.data])
  const queryParams=[searchword&&`search=${searchword}`]
  // get products data depend on Filtred Data
  useEffect(()=>{
    const getdataDependOnFilterQuery=async()=>{
      if(searchword!=''){
        const newQuery=[...queryParams,...queryStringfromFilter,`page=${currentPage}`].filter(Boolean);
        const queryString = `${newQuery.join("&")}`;
        await dispatch(GetProductsSearchByOnClick(queryString));
      }
    }
    getdataDependOnFilterQuery()
  },[queryStringfromFilter,searchword]);
  // when click delete Filter in small screens
  const onDeleteFilter = async () => {
    try {
      queryParams.filter(Boolean);
      const queryString = `${queryParams.join("&")}`;
      await dispatch(
        GetProductsSearchByOnClick(queryString)
      );
    }catch(e){
      console.log(e);
    }
  }
  return (
    <section className="search-comp">
      {searchProducts.products? (
        <>
          <FilterAndSortBar
            categoryId=''
            subCategoryId=''
            grid={grid}
            setGrid={setGrid}
            filter={filter}
            setFilter={setFilter}
            setShowApplyAndDeleteBtn={setShowApplyAndDeleteBtn}
          />
          <div className="filter-and-products-container">
           <FilterComp
              filter={filter}
              setFilter={setFilter}
              showApplyAndDeleteBtn={showApplyAndDeleteBtn}
              setShowApplyAndDeleteBtn={setShowApplyAndDeleteBtn}
              products={searchProducts}
              setQueryStringfromFilter={setQueryStringfromFilter}
              onDeleteFilter={onDeleteFilter}
            />
          <div className="cards-holder" style={{ fontSize: "15px" }}>
        {searchProducts.products.length > 0? searchProducts.products.map((product) => (
              <CategoryProductCard
              product={product}
              categoryId=''
              subCategoryId=''
              width={grid == true ? "24.75%" : "33%"}
              key={product.ProductID}
              />
            )): <NoProduct text="لا توجد منتجات في البحث يرجي البحث عن منتج"/>}
          </div>
          </div>
        </>
      ) : <NoProduct text="لا توجد منتجات في البحث يرجي البحث عن منتج"/> }
      <ToastContainer/>
    </section>
  );
}
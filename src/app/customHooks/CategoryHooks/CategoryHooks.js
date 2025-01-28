import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsByQueryString } from "../../Redux/Actions/ProductsActions";
const CategoryHooks = (categoryID,subCategoryID) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(false);
  const [grid, setGrid] = useState(true);
  const [showApplyAndDeleteBtn, setShowApplyAndDeleteBtn] = useState(false);
  const [queryStringfromFilter, setQueryStringfromFilter] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(12);
  const dispatch = useDispatch();
  // Scroll to the top of the page when the component start
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Get Products Data When Category And SubCategory And Sort Change
  const queryParams = [
    `CategoryID=${categoryID}`,
    subCategoryID && `SubcategoryID=${subCategoryID}`,
    `sort=${selectedSort}`,
    `per_page=${productsPerPage}`,
  ];
  useEffect(() => {
    const getData = async () => {
      queryParams.filter(Boolean);
      const newQuery = [...queryParams, ...queryStringfromFilter].filter(
        Boolean
      );
      const queryString = `${newQuery.join("&")}`;
      setLoading(true);
      await dispatch(GetProductsByQueryString(queryString));
      setLoading(false);
    };
    getData();
  }, [ queryStringfromFilter, selectedSort, productsPerPage]);
  // when click delete Filter in small screens
  const onDeleteFilter = async () => {
    try {
      queryParams.filter(Boolean);
      const queryString = `${queryParams.join("&")}`;
      await dispatch(GetProductsByQueryString(queryString));
    } catch (e) {
      console.log(e);
    }
  };

  // Show Data In Product Cards
  let CategoryProductsRes = useSelector(
    (state) => state.ProductsReducers.AllProducts
  );
  useEffect(() => {
    try {
      if (CategoryProductsRes?.data) {
        setProducts(CategoryProductsRes?.data?.products);
      }
    } catch (e) {
      console.log(e);
    }
  }, [CategoryProductsRes?.data]);
  // Start Scroll Pagination
  const productSectionRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (productSectionRef.current && !loading) {
        const sectionTop = productSectionRef.current.offsetTop;
        const sectionHeight = productSectionRef.current.offsetHeight;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight - 130 >= sectionTop + sectionHeight) {
          if (
            CategoryProductsRes?.data?.length ==
            CategoryProductsRes?.data?.products.length
          ) {
            setProductsPerPage(productsPerPage);
            setLoading(false);
          } else {
            setProductsPerPage(productsPerPage + 8);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [productsPerPage, loading]);
  return[
    loading,
    products,
    grid,
    setGrid,
    filter,
    setFilter,
    selectedSort,
    setSelectedSort,
    productSectionRef,
    showApplyAndDeleteBtn,
    setShowApplyAndDeleteBtn,
    CategoryProductsRes,
    setQueryStringfromFilter,
    onDeleteFilter,
    productsPerPage,
  ]
}

export default CategoryHooks
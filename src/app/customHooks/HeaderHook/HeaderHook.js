"use client"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "../../Redux/Types";
import { GetProductsBySearch, GetProductsSearchByOnClick } from "../../Redux/Actions/ProductsActions";
const HeaderHook = () => {
  let envagloApiKey = process.env.NEXT_PUBLIC_API_URL;
 
  // console.log("envagloApiKey",envagloApiKey);
  
  // Show SideBar
  let [showSidebar, setShowSidebar] = useState(false);
  // fetch category & subcategory
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      
      try {
        const response =await axios.get(`${envagloApiKey}/categories`);
        
        setCategories(response.data.data?.categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  // Start Search Logic
  const router = useRouter();
  const dispatch = useDispatch();
  let [searchWord, setSearchWord] = useState("");
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const onSearch = async (event) => {
    console.log("event.target.value",event.target.value);
    if (event.target.value == "") {
      setShowSearchPopup(false);
      setSearchWord("");
    } else {
      setShowSearchPopup(true);
      setSearchWord(event.target.value);
      setTimeout(async () => {
        await dispatch( GetProductsBySearch(`search=${event.target.value}`));
      }, 1000);
    }
    
  };
  const showallProductsPage = async () => {
    setShowSearchPopup(false);
    await dispatch( GetProductsSearchByOnClick(`search=${searchWord}`));
    router.push("/search");
  };
  // End Search Logic
  return [
    onSearch,
    searchWord,
    categories,
    setShowSidebar,
    showSidebar,
    loading,
    showSearchPopup,
    setShowSearchPopup,
    showallProductsPage,
  ];
};
export default HeaderHook;

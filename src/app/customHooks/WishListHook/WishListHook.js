import { useEffect, useState } from "react";
import axios from "axios";
import NotificationComp from "../NotificationComp/NotificationComp";
import { API_URL, config, token } from "../../Redux/Types";
const WishListHook = (setShowLoginPopup) => {
  const [reload, setReload] = useState(false)
  const [wishData, setWishData] = useState();
  const [Notify] = NotificationComp();
  // Get Wish List Products
  useEffect(() => {
    const getWishData = async () => {
      try {
        let response = await axios.get(`${API_URL}/getMyWishList`, config);
        
        setWishData(response.data.data);
      } catch (e) {
        console.log(e);
      }

      
    };
    getWishData();
  }, [reload]);
  // Add Product To Wish List
  const addProductToWishList = async (id) => {
      let formData = {
        productID: id,
      };
      try {
        let response = await axios.post(
          `${API_URL}/addItemWish`,
          formData,
          config
        );
        if (response.data.status == 201) {
          Notify("تم إضافةالمنتج للأمنيات بنجاح", "success");
          setReload(!reload)
        }
      } catch (e) {
        console.log(e);
      }
  };
  //Delete Item From WishList
  const onDeleteItem = async (id) => {
    try {
      let response = await axios.delete(`${API_URL}/deleteWishItem/${id}`, config);
      if (response.status === 200) {
        Notify("تم حذف المنتج من الأمنيات بنجاح", "success");
        setReload(!reload)
      }
    } catch (e) {
      console.log(e);
    }
  }
  return [wishData, onDeleteItem,addProductToWishList]
}
export default WishListHook

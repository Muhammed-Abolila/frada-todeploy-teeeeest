import { useState } from "react";
import NotificationComp from "../../../NotificationComp/NotificationComp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL, config } from "../../../../Redux/Types";
import { friendSchema } from "../../../Forms/Schema/FormsSchema";
import GetSaudiCities from "../../GetSaudiCities/GetSaudiCities";
const AddFriendHook = (setShowAddPopup,friendDataReload,setFriendDataReload) => {
  const [saudiCities] = GetSaudiCities();
  const [Notify] = NotificationComp();
  const {
    register,
    formState: { errors,isDirty },
    handleSubmit,
    reset
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(friendSchema),
  });
  const [responseError, setResponseError] = useState();
  const sendFriendData = async(data) => {
    let formData = {
      Name: data.friendName,
      Address:data.friendAddress,
      CityID: data.FriendCityId,
      Phone:data.friendPhone
    };
    try{
      let response = await axios.post(
        `${API_URL}/addGiftAddress`,
        formData,
        config
      );
      if(response.status==201){
        Notify("تم إضافة عنوان الصديق بنجاح", "success");
        setResponseError("");
        reset()
        setTimeout(() => {
          setShowAddPopup(false);
          setFriendDataReload(!friendDataReload);
        }, 600);
      }
    }catch(e){
      setResponseError(e);
    }
  };
  const onCloseAddPopup = e => {
    e.preventDefault();
    setShowAddPopup(false);
  };
  return [saudiCities,register,isDirty,errors,handleSubmit,sendFriendData,responseError,setResponseError,onCloseAddPopup];
};
export default AddFriendHook;

import { useEffect, useState } from "react";
import NotificationComp from "../../../NotificationComp/NotificationComp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL, config } from "../../../../Redux/Types";
import { friendSchema } from "../../../Forms/Schema/FormsSchema";
import GetSaudiCities from "../../GetSaudiCities/GetSaudiCities";
const EdditFriendHook = (singleFriendData, setShowEditPopup, friendDataReload, setFriendDataReload,setFriendAddress) => {
  const defaultValues= {
    friendName: singleFriendData?.Name,
    friendPhone: singleFriendData?.Phone,
    friendAddress: singleFriendData?.Address,
    FriendCityId: singleFriendData?.CityID,
  };
  const [saudiCities] = GetSaudiCities();
  const [Notify] = NotificationComp();
  const [responseError, setResponseError] = useState();
  const {
    register,
    formState: { errors,isDirty },
    handleSubmit,
    reset
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(friendSchema),
    defaultValues
  });
  useEffect(() => {
    reset({
      friendName: singleFriendData?.Name,
      friendPhone: singleFriendData?.Phone,
      friendAddress: singleFriendData?.Address,
      FriendCityId: singleFriendData?.CityID,
    });
  }, [singleFriendData, reset]);
  const onUpdateFriendData = async (data) => {
      let formData = {
      giftID: singleFriendData?.GiftAddressID,
      Name: data.friendName,
      CityID: data.FriendCityId,
      Address: data.friendAddress,
      Phone: data.friendPhone,
    };
    try {
      let response = await axios.post(
        `${API_URL}/updateGiftAddress`,
        formData,
        config
      );
      if (response.status == 201) {
        Notify("تم تعديل عنوان الصديق بنجاح", "success");
        setResponseError("");
        setTimeout(() => {
          setShowEditPopup(false);
          setFriendDataReload(!friendDataReload);
          if(setFriendAddress){
            setFriendAddress(response.data.data)
          }
        }, 600);
      }
    } catch (e) {
      setResponseError(e.response?.data)
    }
  };
  const onCloseEditPopup = (e) => {
    e.preventDefault();
    setShowEditPopup(false);
  };
  return [saudiCities, responseError, setResponseError, register,isDirty, errors, handleSubmit, onUpdateFriendData, onCloseEditPopup]
}
export default EdditFriendHook

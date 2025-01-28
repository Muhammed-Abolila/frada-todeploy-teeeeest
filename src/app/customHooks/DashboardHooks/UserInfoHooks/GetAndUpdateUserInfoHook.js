import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCookie } from "cookies-next";
import NotificationComp from "../../NotificationComp/NotificationComp";
import { GetUserData } from "../../../Redux/Actions/AddressesAction";
import GetSaudiCities from "../GetSaudiCities/GetSaudiCities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL, config } from "../../../Redux/Types";
import { userInfoSchema } from "../../Forms/Schema/FormsSchema";
const GetAndUpdateUserInfoHook = (changeUserNameReload,setChangeUserNameReload) => {
  const [Notify] = NotificationComp();
  const [saudiCities] = GetSaudiCities();
  const [responseError, setResponseError] = useState("");
  const [reloadUserInfo,setReloadUserInfo]=useState(false)
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserData());
  }, [reloadUserInfo]);
  let UserDataRes = useSelector((state) => state.AddressesReducer);
  let userData = [];
  try {
    if (UserDataRes.loading == false) {
      if (UserDataRes.UserData) {
        userData = UserDataRes.UserData.data;
      }
    }
  } catch (e) {
    console.log(e);
  }
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      LastName: userData?.LastName,
      FirstName: userData?.FirstName,
      Phone: userData?.Phone,
      Address: userData?.Address,
      CityId: userData?.CityID,
    },
  });
  // useEffect to reset data in useForm defaultValues
  useEffect(() => {
    if (userData) {
      reset({
        UserName: userData?.Username,
        LastName: userData?.LastName,
        FirstName: userData?.FirstName,
        Phone: userData?.Phone,
        Address: userData?.Address,
        CityId: userData?.CityID,
        ZIP: userData?.ZIP,
      });
    }
  }, [userData]);
  const UpdateUserData = async (data) => {
    let formData = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: userData?.Email,
      CityID: data.CityId,
      Address: data.Address,
      Phone: data.Phone
    };
    try {
      let response = await axios.post(
        `${API_URL}/updateUser`,
        formData,
        config
      );
      if (response.data?.status == 201) {
        Notify("تم تعديل البيانات بنجاح", "success");
        setCookie("firstName", formData.FirstName, {
          maxAge: 60 * 60 * 24 * 7,
        }); //7 days
        setCookie("lastName", formData.LastName, {
          maxAge: 60 * 60 * 24 * 7,
        });
        setChangeUserNameReload(!changeUserNameReload);
        setResponseError("");
        reset(data);
      }
    } catch (e) {
      console.log(e);
      setResponseError(e.response?.data);
    }
  };
  return [
    UserDataRes,
    handleSubmit,
    UpdateUserData,
    isDirty,
    register,
    errors,
    responseError,
    setResponseError,
    userData,
    setReloadUserInfo,
    reloadUserInfo,
    saudiCities,
  ];
};

export default GetAndUpdateUserInfoHook;

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "../../Redux/Types";
import { setCookie } from "cookies-next";
import SnapTrackEvents from "../SnapTrackEvents/SnapTrackEvents";
import NotifyHook from './../NotifyHook/NotifyHook';
const RegisterHook = (Schema ,type,setStep,phoneNumber) => {
  const [notify, setNotify] = NotifyHook();
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [responseError, setResponseError] = useState("");
    const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
    } = useForm({
      mode: "onTouched",
      resolver: zodResolver(Schema),
    });
    let UserName = watch("UserName");
    let Email = watch("Email");
    let Phone = watch("Phone");
    let password = watch("password");
    let confirmPassword = watch("confirmPassword");
    // useEffect  To Compare Between Email And Phone in inputs And DataBase
    useEffect(() => {
      setTimeout(async () => {
        let formData = {
          Username: UserName ? UserName : undefined,
          Email: Email ? Email : undefined,
          Phone: Phone ? Phone : undefined,
        };
        try {
          let response = await axios.post(
            `${API_URL}/auth/checkCredential`,
            formData
          );
          if (response.data?.status == 201) {
            setResponseError("");
          }
        } catch (e) {
          setResponseError(e.response?.data);
        }
      }, [1500]);
    }, [UserName, Email, Phone]);
    // Logic To password Reguler Expression
    const passValidation = [
      { passLength: false },
      { passLowerCase: false },
      { passCapitalize: false },
      { passNumber: false },
    ];
  
    // Submit Function
    const registerSubmit = async (data) => {
      if(type==="register"){
        let formData = {
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.Email,
          Phone: data.Phone,
          password: data.password,
        };
        if (responseError == "") {
          setLoading(true)
          try {
            const response = await axios.post(`${API_URL}/auth/register`, formData);
            if (response.status === 201) {
              setNotify({ msg: "تم إنشاء الحساب بنجاح", state: "success" });
              setTimeout(() => {
                router.push("/login");
              }, 1000);
            }
          } catch (error) {
            setResponseError(error?.response?.data);
          }
          setLoading(false)
        }
      }else if(type==="cart"){
        let formData = {
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.Email,
          Phone: phoneNumber,
          CityID: data.CityID,
          Address:data.Address,
          password: data.password,
        };
        if(responseError == "" ){
          setLoading(true)
          try {
            const response = await axios.post(`${API_URL}/auth/registerForCart`, formData);
            try{
              if (response.status == 200) {
                setNotify({ msg: "تم إكمال بياناتك بنجاح", state: "success" });
                setCookie("firstName", response?.data?.user?.FirstName, {
                  maxAge: 60 * 60 * 24 * 7,
                }); //7 days
                setCookie("lastName", response?.data?.user?.LastName, {
                  maxAge: 60 * 60 * 24 * 7,
                }); //7 days
                setCookie("access_token", response?.data?.access_token, {
                  maxAge: 60 * 60 * 24 * 7,
                }); // 7days
                  window.location.href = window.location.pathname;
                  setStep(2)
              }
              SnapTrackEvents(
                "SIGN_UP",
                null,
                null,
                null,
                null,
                null,
                response?.data?.user?.Email,
                response?.data?.user?.Phone,
                null,
                null,
                null,
                response?.data?.user?.FirstName,
                response?.data?.user?.LastName,
                response?.data?.user?.Address,
              );
            }catch(e){}
          } catch (error) {
            setResponseError(error?.response?.data);
          }
          setLoading(false)
        }
      }
      
    };
    return[
        handleSubmit,
        registerSubmit,
        register,
        errors,
        responseError,
        showPassword,
        password,
        setShowPassword,
        showConfirmPassword,
        confirmPassword,
        setShowConfirmPassword,
        notify,
        loading,
      ]
}

export default RegisterHook
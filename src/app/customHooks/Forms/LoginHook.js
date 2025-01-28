import { deleteCookie, setCookie } from "cookies-next";
import { loginSchema } from "./Schema/FormsSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "../../Redux/Types";
import axios from "axios";
import SnapTrackEvents from "../SnapTrackEvents/SnapTrackEvents";
import NotifyHook from "./../NotifyHook/NotifyHook";
const LoginHook = () => {
  const [notify, setNotify] = NotifyHook();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });
  const passwordValue = watch("password");
  const loginSubmit = async (data) => {
    setLoading(true);
    try {
      let response = await axios.post(
        `${API_URL}/auth/login?email_or_phone=${data.email_or_phone}&password=${data.password}`
      );
      if (response.status == 200) {
        setNotify({ msg: "تم تسجيل الدخول بنجاح", state: "success" });
        setCookie("Email", response?.data?.user?.Email, {
          maxAge: 60 * 60 * 24 * 7,
        }); // 7days
        setCookie("Phone", response?.data?.user?.Phone, {
          maxAge: 60 * 60 * 24 * 7,
        }); // 7days
        setCookie("firstName", response?.data?.user?.FirstName, {
          maxAge: 60 * 60 * 24 * 7,
        }); //7 days
        setCookie("lastName", response?.data?.user?.LastName, {
          maxAge: 60 * 60 * 24 * 7,
        }); //7 days
        setCookie("access_token", response?.data?.access_token, {
          maxAge: 60 * 60 * 24 * 7,
        }); // 7days
        setTimeout(() => {
          if (window.location.pathname == "/login") {
            window.location.href = "/";
            deleteCookie("pathName")
          } else {
            window.location.href = window.location.pathname;
            deleteCookie("pathName")
          }
        }, 500);
        SnapTrackEvents(
          "LOGIN",
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
          response?.data?.user?.Address
        );
      }
    } catch (e) {
      setNotify({
        msg: "البريد الإلكتروني أو كلمة المرور خطأ",
        state: "error",
      });
    }
    setLoading(false);
  };
  return [
    loading,
    handleSubmit,
    loginSubmit,
    register,
    errors,
    passwordValue,
    showPassword,
    setShowPassword,
    isDirty,
    notify,
  ];
};

export default LoginHook;

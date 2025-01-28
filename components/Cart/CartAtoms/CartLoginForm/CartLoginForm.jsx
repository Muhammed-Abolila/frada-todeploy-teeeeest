import { setCookie } from "cookies-next";
import { SubmitButton } from "../../../Utilities/FormAtoms/SubmitButton/SubmitButton";
import { GoogleAndApple } from "../../../Utilities/FormAtoms/GoogleAndApple/GoogleAndApple";
import { InputComp } from "../../../Utilities/FormAtoms/InputComp/InputComp";
// import LoginHook from "../../../../src/customHooks/Forms/LoginHook";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { phoneSchema } from "../../../../src/customHooks/Forms/Schema/FormsSchema";
import VerificationInput from "react-verification-input";
import axios from "axios";
// import { API_URL } from "../../../../src/Redux/Types";
// import SnapTrackEvents from "../../../../src/customHooks/SnapTrackEvents/SnapTrackEvents";
import NotifyComp from "./../../../Utilities/NotifyComp/NotifyComp";
import NotifyHook from "@/app/customHooks/NotifyHook/NotifyHook";
import LoginHook from "@/app/customHooks/Forms/LoginHook";
import { phoneSchema } from "@/app/customHooks/Forms/Schema/FormsSchema";
import { API_URL } from "@/app/Redux/Types";
import SnapTrackEvents from "@/app/customHooks/SnapTrackEvents/SnapTrackEvents";
// import NotifyHook from "./../../../../src/customHooks/NotifyHook/NotifyHook";
import { LuRefreshCcw } from "react-icons/lu";

const CartLoginForm = ({ setShowForm }) => {
  const [
    loading,
    loginHandleSubmit,
    loginSubmit,
    loginRegister,
    loginErrors,
    passwordValue,
    showPassword,
    setShowPassword,
    isDirtyEmail,
    loginNotify,
  ] = LoginHook();
  const [notify, setNotify] = NotifyHook();
  const [loginForm, setLoginForm] = useState("phone");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(phoneSchema),
  });
  const [sentVerficationCode, setSentVerficationCode] = useState(false);
  const [verficationError, setVerficationError] = useState(false);
  const [phoneNumber, stPhoneNumber] = useState(0);
  const loginByPhone = async (data) => {
    stPhoneNumber(data.Phone);
    let formData = {
      phone: data.Phone,
    };
    try{
      let response = await axios.post(`${API_URL}/auth/sendOtp`, formData);
      if(response.status==200){
        setNotify({ msg: "تم إرسال رمز التحقق بنجاح", state: "success" });
        setSentVerficationCode(true);
      }
    }catch(e){
      console.log(e)
    }
  };
  const checkVerficationCode = async (value) => {
    let formData = {
      phone: phoneNumber,
      otp: value,
    };
    try {
      let response = await axios.post(`${API_URL}/auth/verifyOtp`, formData);
      try {
        if (response.status == 200) {
          setNotify({ msg: "تم تسجيل الدخول بنجاح", state: "success" });
          setCookie("firstName", response?.data?.user?.FirstName, {
            maxAge: 60 * 60 * 24 * 7,
          }); //7 days
          setCookie("lastName", response?.data?.user?.LastName, {
            maxAge: 60 * 60 * 24 * 7,
          }); //7 days
          setCookie("access_token", response.data?.access_token, {
            maxAge: 60 * 60 * 24 * 7,
          }); // 7days
          setTimeout(() => {
            window.location.href = window.location.pathname;
          }, 500);
          SnapTrackEvents (
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
          )
        }
      } catch (e) {}
    } catch (e) {
      if (e.response.status == 404) {
        setCookie("phoneNumber", phoneNumber);
        setShowForm("register");
      } else {
        setNotify({ msg: "كود التحقق خطأ", state: "error" });
        setVerficationError(true);
      }
    }
  };
  return (
    <>
      {loginForm == "phone" ? (
        <>
            <form
              className="form"
              style={{
                display: "flex",
              }}
              onSubmit={handleSubmit(loginByPhone)}
            >
              {notify.msg != "" && <NotifyComp notify={notify} />}
              <div className="login-phone-container">
                <InputComp
                  register={register}
                  registerValue={"Phone"}
                  placeholder={"أدخل رقم الهاتف"}
                  inputType="text"
                  errors={errors.Phone}
                />
                <div
                  className="login-email"
                  onClick={() => setLoginForm("email")}
                >
                  <LuRefreshCcw/>
                  {/* <span className="icon icon-refresh"></span> */}
                  <span>الدخول بالبريد الإلكتروني</span>
                </div>
              </div>
              <SubmitButton title={"التحقق من الهاتف"} loading={loading} />
              {sentVerficationCode === true && (
              <div className="verfication-container">
                <div className="verfication">
                  <h6>أدخل رمز التحقق</h6>
                  <VerificationInput
                    length={4}
                    validChars="0-9"
                    inputProps={{ autoComplete: "one-time-code" }}
                    onComplete={(value) => checkVerficationCode(value)}
                    classNames={{
                      container: "container",
                      character: `character ${
                        verficationError == true && "invalid"
                      }`,
                      characterInactive: "character--inactive",
                      characterSelected: "character--selected",
                      characterFilled: "character--filled",
                    }}
                  />
                </div>
              </div>
            )}
              <GoogleAndApple pathName="/cart" title="تسجيل الدخول بإستخدام" />
            </form>
          
        </>
      ) : (
        <form
          className="form"
          style={{
            display: "flex",
          }}
          onSubmit={loginHandleSubmit(loginSubmit)}
        >
          {loginNotify.mgs != "" && <NotifyComp notify={loginNotify} />}
          <InputComp
            register={loginRegister}
            registerValue={"email_or_phone"}
            placeholder={"البريد الإلكتروني أو رقم الهاتف"}
            inputType="text"
            errors={loginErrors.email_or_phone}
          />
          <InputComp
            register={loginRegister}
            registerValue={"password"}
            placeholder={"كلمة المرور"}
            inputType={showPassword ? "text" : "password"}
            errors={loginErrors.password}
            passwordValue={passwordValue}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <div className="forgot-password-and-login-email-container">
            <div className="forgot-password-link">
              <Link href="/forgot-password" style={{ textDecoration: "none" }}>
                هل نسيت كلمة السر؟
              </Link>
            </div>

            <div className="login-email" onClick={() => setLoginForm("phone")}>
              <span className="icon icon-refresh"></span>
              <span>الدخول برقم الهاتف</span>
            </div>
          </div>

          <SubmitButton
            title={"الدخول والتقدم للشحن"}
            loading={loading}
            disabled={!isDirtyEmail}
          />
          <GoogleAndApple pathName="cart" title="تسجيل الدخول بإستخدام" />
        </form>
      )}
    </>
  );
};

export default CartLoginForm;

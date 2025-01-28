"use client";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { FormHead } from "../../Utilities/FormAtoms/FormHead/FormHead";
import { InputComp } from "../../Utilities/FormAtoms/InputComp/InputComp";
import { GoogleAndApple } from "../../Utilities/FormAtoms/GoogleAndApple/GoogleAndApple";
import { SubmitButton } from "../../Utilities/FormAtoms/SubmitButton/SubmitButton";
import { FormFooter } from "../../Utilities/FormAtoms/FormFooter/FormFooter";
// import LoginHook from "../../../src/customHooks/Forms/LoginHook";
import NotifyComp from '../../Utilities/NotifyComp/NotifyComp';
import LoginHook from "@/app/customHooks/Forms/LoginHook";
export default function LoginComp() {
  const [
    loading,
    handleSubmit,
    loginSubmit,
    register,
    errors,
    passwordValue,
    showPassword,
    setShowPassword,
    isDirty,
    notify
  ] = LoginHook();
  return (
    <section className="login-section">
      <div className="login">
        <div className="msg">
          {notify.msg!=''&&<NotifyComp notify={notify}/>}
        </div>
        <FormHead title={"تسجيل الدخول"} />
        <form className="form" onSubmit={handleSubmit(loginSubmit)}>
          <InputComp
            register={register}
            registerValue={"email_or_phone"}
            placeholder={"البريد الإلكتروني أو رقم الهاتف"}
            inputType="text"
            errors={errors.email_or_phone}
          />
          <InputComp
            register={register}
            registerValue={"password"}
            placeholder={"كلمة المرور"}
            inputType={showPassword ? "text" : "password"}
            errors={errors.password}
            passwordValue={passwordValue}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <div className="forgot-password-link">
            <Link href="/forgot-password" style={{ textDecoration: "none" }}>
              هل نسيت كلمة السر؟
            </Link>
          </div>
          <SubmitButton
            title={"تسجيل الدخول"}
            loading={loading}
            disabled={!isDirty}
          />
        </form>
        <GoogleAndApple pathName="/" title="تسجيل الدخول بإستخدام" />
        <FormFooter
          link="/register"
          title="إنشاء حساب جديد"
          subTitle="ليس لديك حساب؟"
        />
      </div>
      <ToastContainer />
    </section>
  );
}

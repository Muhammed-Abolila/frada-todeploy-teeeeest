"use client";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { FormHead } from "../../Utilities/FormAtoms/FormHead/FormHead";
import { InputComp } from "../../Utilities/FormAtoms/InputComp/InputComp";
import { SubmitButton } from "../../Utilities/FormAtoms/SubmitButton/SubmitButton";
import { GoogleAndApple } from "../../Utilities/FormAtoms/GoogleAndApple/GoogleAndApple";
import { PasswordSecurityBar } from "../../Utilities/FormAtoms/PasswordSecurityBar/PasswordSecurityBar";
import { FormFooter } from "../../Utilities/FormAtoms/FormFooter/FormFooter";
import { DashboardInput } from "../../Utilities/FormAtoms/DashboardInput/DashboardInput";
import NotifyComp from './../../Utilities/NotifyComp/NotifyComp';
import RegisterHook from "@/app/customHooks/Forms/RegisterHook";
import { registerSchema } from "@/app/customHooks/Forms/Schema/FormsSchema";
export default function LoginComp() {
  const [
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
  ] = RegisterHook(registerSchema, "register");
  return (
    <section className="register-section">
      <div className="register">
      <div className="msg">
          {notify.msg!=''&&<NotifyComp notify={notify}/>}
        </div>
        <FormHead title={"إنشاء حساب جديد"} />
        <form className="form" onSubmit={handleSubmit(registerSubmit)}>
          <InputComp
            register={register}
            registerValue={"FirstName"}
            placeholder={"الإسم الأول"}
            inputType="text"
            errors={errors.FirstName}
            responseError={responseError.message?.FirstName}
          />
          <InputComp
            register={register}
            registerValue={"LastName"}
            placeholder={"إسم العائلة"}
            inputType="text"
            errors={errors.LastName}
            responseError={responseError.message?.LastName}
          />
          <InputComp
            register={register}
            registerValue={"Email"}
            placeholder={"البريد الإلكتروني"}
            inputType="text"
            errors={errors.Email}
            responseError={responseError.message?.Email}
          />
          <InputComp
            register={register}
            registerValue={"Phone"}
            placeholder={"رقم الهاتف مثال (*******05)"}
            inputType="text"
            errors={errors.Phone}
            responseError={responseError.message?.Phone}
          />
          <InputComp
            register={register}
            registerValue={"password"}
            placeholder={"كلمة المرور"}
            inputType={showPassword ? "text" : "password"}
            errors={errors.password}
            passwordValue={password}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            responseError={responseError.message?.password}
          />
          <InputComp
            register={register}
            registerValue={"confirmPassword"}
            placeholder={"تأكيد كلمة المرور"}
            inputType={showConfirmPassword ? "text" : "password"}
            errors={errors.confirmPassword}
            passwordValue={confirmPassword}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />
          <div className="security">
            <p>بالنقر علي &quot;إنشاء حساب&quot; فإنك توافق على </p>
            <Link href="/" style={{ textDecoration: "none" }}>
              سياسة الخصوصية ,
            </Link>
            <Link href="/" style={{ textDecoration: "none" }}>
              شروط الخدمة ,
            </Link>
            <Link href="/" style={{ textDecoration: "none" }}>
              تلقي الأخبار والإشعارات
            </Link>
          </div>
          <SubmitButton title={"إنشاء الحساب"} loading={loading} />
        </form>
        <GoogleAndApple pathName="/" title="تسجيل الدخول بإستخدام" />
        <FormFooter
          link="/login"
          title="تسجيل الدخول"
          subTitle="لدي حساب بالفعل؟"
        />
      </div>
      <ToastContainer />
    </section>
  );
}

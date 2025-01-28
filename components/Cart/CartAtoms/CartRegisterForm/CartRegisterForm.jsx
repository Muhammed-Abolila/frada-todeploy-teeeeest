// import RegisterHook from "../../../../src/customHooks/Forms/RegisterHook";
// import { CartRegisterSchema } from "../../../../src/customHooks/Forms/Schema/FormsSchema";
import { SubmitButton } from "../../../Utilities/FormAtoms/SubmitButton/SubmitButton";
import { InputComp } from "../../../Utilities/FormAtoms/InputComp/InputComp";
// import GetSaudiCities from "../../../../src/customHooks/DashboardHooks/GetSaudiCities/GetSaudiCities";
import { PasswordSecurityBar } from "../../../Utilities/FormAtoms/PasswordSecurityBar/PasswordSecurityBar";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import NotifyComp from "../../../Utilities/NotifyComp/NotifyComp";
import RegisterHook from "@/app/customHooks/Forms/RegisterHook";
import { CartRegisterSchema } from "@/app/customHooks/Forms/Schema/FormsSchema";
import GetSaudiCities from "@/app/customHooks/DashboardHooks/GetSaudiCities/GetSaudiCities";
const CartRegisterForm = ({ setStep}) => {
  const [phoneNumber,setPhoneNumber]=useState()
  const [
    handleSubmit,
    registerSubmit,
    register,
    errors,
    responseError,
    showPassword,
    password,
    setShowPassword,
    passwordStrength,
    showConfirmPassword,
    confirmPassword,
    setShowConfirmPassword,
    notify,
    loading,
  ] = RegisterHook(CartRegisterSchema, "cart", setStep,phoneNumber);
  const[saudiCities]=GetSaudiCities();
  useEffect(()=>{
    setPhoneNumber(getCookie("phoneNumber"))
  })
  return (
    <form
      className="form register-form"
      style={{
        display: "flex",
      }}
      onSubmit={handleSubmit(registerSubmit)}
    >
       {notify.msg!=''&&<NotifyComp notify={notify}/>}
      <h6>بيانات التواصل</h6>
      <InputComp
        register={register}
        registerValue={"Email"}
        placeholder={"البريد الإلكتروني"}
        inputType="text"
        errors={errors.Email}
        responseError={responseError?.message?.Email}
      />
      <h6>عنوان الشحن</h6>
      <InputComp
        register={register}
        registerValue={"KSA"}
        placeholder={"المملكة العربية السعودية"}
        inputType="text"
        readOnly={true}
      />
      <InputComp
        register={register}
        registerValue={"FirstName"}
        placeholder={"الإسم الأول"}
        inputType="text"
        errors={errors.FirstName}
        responseError={responseError?.message?.FirstName}
      />
      <InputComp
        register={register}
        registerValue={"LastName"}
        placeholder={"إسم العائلة"}
        inputType="text"
        errors={errors.LastName}
        responseError={responseError?.message?.LastName}
      />
      
      <div className="input-container">
      <input
      value={phoneNumber}
      style={{opacity:".5"}}
        readOnly
      />     
    </div>
      
      <div className="select-city-container">
        <select
          {...register("CityID", {
            valueAsNumber: true,
          })}
          style={{
            border: errors?.CityID
              ? "1px solid #b00020"
              : "1px solid #05060538",
          }}
        >
          <option value="">إختر مدينة</option>
          {saudiCities &&
            saudiCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nameAr}
              </option>
            ))}
        </select>
        {errors?.CityID && (
          <>
            <span className="icon-notice"></span>
            <span className="error-msg">{errors.CityID?.message}</span>
          </>
        )}
      </div>
      <InputComp
        register={register}
        registerValue={"Address"}
        placeholder={"عنوان الشحن"}
        inputType="text"
        errors={errors.Address}
        responseError={responseError?.message?.Address}
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
            responseError={responseError?.message?.password}
          />
          <PasswordSecurityBar passwordStrength={passwordStrength} />
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
      <SubmitButton title={"إنشاء الحساب والتقدم للشحن"} loading={loading} />
    </form>
  );
};
export default CartRegisterForm;
"use client";
import "./ResetPasswordComp.css";
import { ToastContainer } from "react-toastify";
import { FormHead } from "../../Utilities/FormAtoms/FormHead/FormHead";
import { InputComp } from "../../Utilities/FormAtoms/InputComp/InputComp";
import { SubmitButton } from "../../Utilities/FormAtoms/SubmitButton/SubmitButton";
import { PasswordSecurityBar } from "../../Utilities/FormAtoms/PasswordSecurityBar/PasswordSecurityBar";
import ResetPassword from "@/app/customHooks/Forms/ResetPassword";
const ResetPasswordComp = () => {
  const[
    handleSubmit,
    resetPass,
    register,
    password,
    showPassword,
    setShowPassword,
    confirmPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    responseError,
    passwordStrength,
    loading
  ]=ResetPassword()
  return (
    <section className="reset-pass-section">
      <div className="reset-pass">
      <FormHead title={"تغيير كلمة المرور"} />
        <form className="form" onSubmit={handleSubmit(resetPass)}>
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
          <PasswordSecurityBar passwordStrength={passwordStrength}/>
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
          <SubmitButton title="تغيير كلمة المرور" loading={loading}/>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};
export default ResetPasswordComp;

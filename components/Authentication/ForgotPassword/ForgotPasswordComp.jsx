"use client";
import { useState } from "react";
import "./ForgotPasswordComp.css";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { FormHead } from "../../Utilities/FormAtoms/FormHead/FormHead";
import { InputComp } from "../../Utilities/FormAtoms/InputComp/InputComp";
import { SubmitButton } from "../../Utilities/FormAtoms/SubmitButton/SubmitButton";
import { API_URL } from "@/app/Redux/Types";
import { ForgotPasswordSchema } from "@/app/customHooks/Forms/Schema/FormsSchema";
export default function ForgotPasswordComp() {
  const [loading,setLoading]=useState(false)
  const [sendLink, setSendLink] = useState(false);
  const [responseError, setResponseError] = useState("");
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onTouched", resolver: zodResolver(ForgotPasswordSchema) });
  const sendEmail = async(data) =>{
    let formData={
      email:data.email
    }
    setLoading(true)
    try{
      let response=await axios.post(`${API_URL}/auth/forgot-password`,formData);
      if(response.status==200){
        setSendLink(true)
      }
    }catch(e){
      setResponseError(e.response.data);
    }
    setLoading(false)
  }
  return (
    <section className="forgot-password">
      <div className="content">
        <Link href="/login" style={{color:"unset",textDecoration:"none"}}>
      <div className="icon-arrow-up-left2"></div>
      </Link>
        <FormHead title={"إعادة تعيين كلمةالمرور"} />
        {sendLink == false ? (
          <form className="form" onSubmit={handleSubmit(sendEmail)}>
            <div className="notify">
              <p>
                أدخل عنوان البريد الإلكتروني الخاص بك وسنرسل لك رابط إعادة تعيين
                كلمة المرور.
              </p>
            </div>
            <InputComp
            register={register}
            registerValue={"email"}
            placeholder={"أدخل البريد الإلكتروني"}
            inputType="text"
            errors={errors.email}
            responseError={responseError.message?.email}
          />
          <SubmitButton title={"إرسال الرابط"} loading={loading}/>
          </form>
        ) : (
          <p>
            تحقق من بريدك الإلكتروني للحصول على رابط لإعادة تعيين كلمة المرور
            الخاصة بك. إذا لم يظهر خلال بضع دقائق، فتحقق من مجلد الرسائل غير
            المرغوب فيها
          </p>
        )}
      </div>
      <ToastContainer />
    </section>
  );
}

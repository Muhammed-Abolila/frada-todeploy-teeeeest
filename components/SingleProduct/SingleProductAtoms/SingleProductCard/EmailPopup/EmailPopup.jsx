import { useForm } from "react-hook-form";
import "./EmailPopup.css";
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema } from "@/app/customHooks/Forms/Schema/FormsSchema";
import { InputComp } from "../../../../Utilities/FormAtoms/InputComp/InputComp";
const EmailPopup = ({ setShowEmailLayout }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
      mode:"onTouched",
      resolver:zodResolver(emailSchema)
  });
  const sendEmail=(data)=>{
    console.log("hjgjhkjhk")
    console.log("data",data)
  }
  return (
    <div className="email-popup-container">
      <div className="email-popup">
        <div className="email-popup-top">أدخل البريد الإلكتروني</div>
        <InputComp
            register={register}
            registerValue={"email_or_phone"}
            placeholder={"البريد الإلكتروني أو رقم الهاتف"}
            inputType="text"
            errors={errors.email_or_phone}
          />
        <div className="email-popup-footer">
          <button className="cancel" onClick={() => setShowEmailLayout(false)}>
            إلغاء
          </button>
          <button className="accept" onClick={handleSubmit(sendEmail)}>تأكيد</button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;

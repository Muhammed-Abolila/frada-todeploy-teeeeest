import { useState,useEffect } from 'react';
import NotificationComp from './../NotificationComp/NotificationComp';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassSchema } from './Schema/FormsSchema';
import { API_URL } from '../../Redux/Types';
const ResetPassword = () => {
    const [loading,setLoading]=useState(false)
    const [Notify] = NotificationComp();
    let router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
    } = useForm({
      mode: "onTouched",
      resolver: zodResolver(resetPassSchema),
    });
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    useEffect(() => {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get("token"));
        setEmail(urlParams.get("email"));
      }
    }, []);
      // Logic To password Reguler Expression
      const passValidation = [
        { passLength: false },
        { passLowerCase: false },
        { passCapitalize: false },
        { passNumber: false },
      ];
      const [passwordStrength, setPasswordStrength] = useState(0);
      useEffect(() => {
        let passLength = password?.length >= 8;
        let passLowerCase = new RegExp(/[a-z]/).test(password);
        let passCapitalize = new RegExp(/[A-Z]/).test(password);
        let passNumber = new RegExp(/[0-9]/).test(password);
        passValidation[0].passLength = passLength;
        passValidation[1].passLowerCase = passLowerCase;
        passValidation[2].passCapitalize = passCapitalize;
        passValidation[3].passNumber = passNumber;
        const trueValues = passValidation.filter((item) => {
          return Object.values(item).includes(true);
        });
        setPasswordStrength(trueValues.length);
      }, [password]);
    
    const resetPass = async (data) => {
      if(passwordStrength>=2){
      let formData = {
        password: data.password,
        password_confirmation: data.confirmPassword,
      };
      setLoading(true)
      try {
        let response = await axios.post(
          `${API_URL}/auth/reset-password?token=${token}&email=${email}`,
          formData
        );
        if (response.status == 200) {
          Notify("تم تعديل كلمة المرور بنجاح", "success");
          setTimeout(() => {
            router.replace("/login");
          }, [1500]);
        }
      } catch (e) {
        console.log("e.response",e);
        
        setResponseError(e.response.data);
        if (e.response.status == 498) {
          Notify("هذا الرابط منتهي الصلاحية أو تم إستخدامه من قبل", "error");
        }
      }
      setLoading(false)
    }else{
        Notify("كلمة السر ضعيفة", "error");
    }
    };
    return[
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
    ]
}

export default ResetPassword
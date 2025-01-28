import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ResetPasswordAction } from "../../Redux/Actions/ForgotPasswordAction";
import NotificationComp from "../../customHooks/NotificationComp/NotificationComp";
const ResetPasswordHook=()=>{
    const [Notify] = NotificationComp();
    const [token,setToken]=useState("")
    const [email,setEmail]=useState("")
    useEffect(() => {
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          setToken(urlParams.get('token'));
          setEmail(urlParams.get("email"));
        }
      }, []);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const changePassword = async () => {
      if (rePassword != password) {
        setErrMsg("عفواََ الرقم السري غير متطابق");
      } else {
        let formData = {
          password: password,
          password_confirmation: rePassword,
        };
        await dispatch(ResetPasswordAction(token, email, formData));
      }
    };
    const resetPassRes = useSelector(
      (state) => state.ForgotPasswordReducer.resetPassword
    );
    useEffect(() => {
      try {
        if (resetPassRes) {
          if (resetPassRes.status == "success") {
            Notify("تم تغيير كلمة السر بنجاح", "success");
            setErrMsg("")
            setTimeout(() => {
              router.push("/signin");
            }, 1000);
          } else if (resetPassRes.status == 422) {
            setErrMsg("الرقم السري يجب ألا يقل عن 8 حروف وأرقام");
          } else if (resetPassRes.status == 498) {
            setErrMsg("هذا الرابط منتهي الصلاحية أو تم إستخدامه من قبل");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }, [resetPassRes.status]);

    return[password,setPassword,rePassword,setRePassword,errMsg,changePassword]
}
export default ResetPasswordHook
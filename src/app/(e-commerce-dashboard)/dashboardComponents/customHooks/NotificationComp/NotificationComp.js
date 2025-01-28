import {toast } from "react-toastify";
const NotificationComp=()=>{
    const Notify=(msg,type)=>{
        if(type=="success"){
             toast.success(msg,{autoClose:1500})
        }else if(type=="error"){
             toast.error(msg,{autoClose:1500})
        }
    }
    return [Notify]
}
export default NotificationComp
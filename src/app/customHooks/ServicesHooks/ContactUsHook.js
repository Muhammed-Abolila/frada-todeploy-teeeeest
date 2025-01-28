import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { contactUsSchema } from "../Forms/Schema/FormsSchema";
import { API_URL } from "../../Redux/Types";
import NotificationComp from "../NotificationComp/NotificationComp";
const ContactUsHook = () => {
    const [Notify] = NotificationComp();
    const {
      register,
      formState: { errors },
      handleSubmit,
      reset
    } = useForm({
      mode: "onTouched",
      resolver: zodResolver(contactUsSchema),
    });
    const sendData = async (data) => {
      let formData = {
        name: data.userName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        message: data.message,
      };
      try {
        let response = await axios.post(`${API_URL}/sendMessage`, formData);
        if (response.status == 200) {
          Notify("شكرا علي إستفسارك", "success");
          reset()
        }
      } catch (e) {
        Notify("حدث خطأ ما", "error");
      }
    };
    return [register,errors,handleSubmit,sendData]
}
export default ContactUsHook
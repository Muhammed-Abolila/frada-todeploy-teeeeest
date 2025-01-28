import ContactUsHook from "@/app/customHooks/ServicesHooks/ContactUsHook";
import "./ContactUsComp.css";
// import ContactUsHook from "../../../../src/customHooks/ServicesHooks/ContactUsHook"
import { ToastContainer } from "react-toastify";
const ContactUsComp = () => {
  const [register,errors,handleSubmit,sendData]=ContactUsHook()  
  return (
    <section className="contact-us-content">
      <div className="contact-us-caption">
        <p>
          نحن سعداء بمساعدتك حول أي أسئلة أو استفسارات. يتوفر فريق خدمة العملاء
          لدينا عبر البريد الإلكتروني والهاتف والواتساب، خلال أيام الأسبوع بين
          الساعة 9 صباحًا و6 مساءً بتوقيت المملكة العربية السعودية. يمكنك أيضًا
          تصفح الأسئلة الأكثر شيوعاََ.
        </p>
        <p>
          إذا كانت لديك أي أسئلة بخصوص معلومات الشحن أو الطلبات، أو سياسات
          الإرجاع أو الخصوصية الخاصة بنا، ستجد التفاصيل التي تطلع إلى معرفتها
          على صفحات تلك الخدمات المُخصصة.
        </p>
        <p>
          يرجى استخدام الرابط أدناه لإرسال بريد إلكتروني إلينا أو الاتصال بنا
          على
        </p>
        <p className="tel">
          <a href="tel:+966557665585">+966-55-766-5585</a>
        </p>
        <p>نسعى الى سماع استفساراتك ومساعدتك دائمًا.</p>
      </div>
      <form onSubmit={handleSubmit(sendData)}>
        <h4>معلومات الإتصال</h4>
        <div className="input-container">
          <label htmlFor="name">
            <span className="name">الإسم</span>
            <span className="star">*</span>
          </label>
          <input
            style={{
              border: errors?.userName?.message
                ? "0.0625rem solid #b00020"
                : "0.0625rem solid #e0e0e0",
            }}
            {...register("userName")}
            type="text"
            id="name"
          />
          {errors?.userName ? (
            <span className="input-alert">{errors.userName?.message}</span>
          ) : null}
        </div>
        <div className="input-container">
          <label htmlFor="email">
            <span className="name">البريد الإلكتروني</span>
            <span className="star">*</span>
          </label>
          <input
            style={{
              border: errors?.email?.message
                ? "0.0625rem solid #b00020"
                : "0.0625rem solid #e0e0e0",
            }}
            {...register("email")}
            type="text"
            id="email"
          />
          {errors?.email ? (
            <span className="input-alert">{errors.email?.message}</span>
          ) : null}
        </div>
        <div className="input-container">
          <label htmlFor="phone">
            <span className="name">الهاتف</span>
            <span className="star">*</span>
          </label>
          <input
            style={{
              border: errors?.phone?.message
                ? "0.0625rem solid #b00020"
                : "0.0625rem solid #e0e0e0",
            }}
            {...register("phone")}
            type="text"
            id="phone"
          />
          {errors?.phone ? (
            <span className="input-alert">{errors.phone?.message}</span>
          ) : null}
        </div>
        <div className="input-container">
          <label htmlFor="address">
            <span className="name">العنوان</span>
            <span className="star">*</span>
          </label>
          <input
            style={{
              border: errors?.address?.message
                ? "0.0625rem solid #b00020"
                : "0.0625rem solid #e0e0e0",
            }}
            {...register("address")}
            type="text"
            id="address"
          />
          {errors?.address ? (
            <span className="input-alert">{errors.address?.message}</span>
          ) : null}
        </div>
        <div className="input-container">
          <label htmlFor="message">
            <span className="name">الرسالة</span>
            <span className="star">*</span>
          </label>
          <textarea
            style={{
              border: errors?.message?.message
                ? "0.0625rem solid #b00020"
                : "0.0625rem solid #e0e0e0",
            }}
            {...register("message")}
            id="message"
          ></textarea>
          {errors?.message ? (
            <span className="input-alert">{errors.message?.message}</span>
          ) : null}
        </div>
        <button type="submit">إرسال</button>
      </form>
      <ToastContainer/>
    </section>
  );
};

export default ContactUsComp;

"use client";
import "./ServicesComp.css";
import PoliciesSideBar from "../../Utilities/PoliciesAndInfoAtoms/PoliciesSideBar/PoliciesSideBar";
import PoliciesHeader from "../../Utilities/PoliciesAndInfoAtoms/PoliciesHeader/PoliciesHeader";
import ContactUsComp from "../Services/ContactUsComp/ContactUsComp";
import ShippingInfo from "../Services/ShippingInfo/ShippingInfo";
import ReturnsAndRefunds from "../Services/ReturnsAndRefunds/ReturnsAndRefunds";
import Faq from "../Services/Faq/Faq";
import { usePathname } from "next/navigation";
import bgImage from "../../../public/Images/new/servicesBg.jpeg";
const ServicesComp = () => {
  let pathname = usePathname();
  const sidebarLinks = [
    {
      title: "تواصل معنا",
      href: "/services/contact-us",
    },
    {
      title: "معلومات الشحن",
      href: "/services/shipping-info",
    },
    {
      title: "الإستبدال والإسترجاع",
      href: "/services/returns-and-refunds",
    },
    {
      title: " (FAQ) الأسئلة الأكثر شيوعاََ",
      href: "/services/faq",
    },
  ];
  const sidebarCaption = [
    {
      caption:
        "إذا كنت بحاجة إلى مساعدة، فلا تتردد في التواصل مع فريق خدمة العملاء لدينا",
    },
    {
      caption: "نحن نتطلع إلى مساعدتك في استفسارك",
    },
  ];
  return (
    <section className="services">
      <PoliciesSideBar
        title="بخدمتكم"
        sidebarCaption={sidebarCaption}
        pathname={pathname}
        sidebarLinks={sidebarLinks}
      />
      <div className="services-content">
        <PoliciesHeader
          sidebarLinks={sidebarLinks}
          pathname={pathname}
          bgImage={bgImage}
        />
        <div className="services-child">
          {pathname == "/services/contact-us" && <ContactUsComp />}
          {pathname == "/services/shipping-info" && <ShippingInfo />}
          {pathname == "/services/returns-and-refunds" && <ReturnsAndRefunds />}
          {pathname == "/services/faq" && <Faq />}
        </div>
      </div>
    </section>
  );
};
export default ServicesComp;

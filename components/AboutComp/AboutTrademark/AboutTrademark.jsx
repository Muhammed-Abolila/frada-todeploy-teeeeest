import "./AboutTrademark.css";
import AboutUsTitles from "../AboutUsTitles/AboutUsTitles";
import Image from "next/image";
import image1 from "../../../public/Images/new/about/about-1.jpg";
export default function AboutTrademark(){
    return(
<div className="trademark-concept-section">
          <div className="trademark-content">
            <div className="trademark-content-top">
              <AboutUsTitles text="مفهوم العلامة التجارية" />
              <p>
                تتمحور فكرة فرادا حول توفير تجربة تسوق استثنائية للرجال في
                المملكة العربية السعودية. يتميز كل منتج بالدقة والاهتمام
                بالتفاصيل، وتستخدم المواد عالية الجودة لضمان الأداء المتفوق
                والمتانة. تقدم فرادا مجموعة متنوعة من الملابس والإكسسوارات التي
                تلبي احتياجات الشباب والرجال البالغين وكبار السن، وتعكس أسلوبهم
                الفريد وتزيد من أناقتهم الشخصية
              </p>
            </div>
            <div className="trademark-content-bottom">
              <AboutUsTitles text="تحقيق التميز" />
              <p>
                تتحقق فرادا من خلال توفير تشكيلة متنوعة من الأحذية والجزم
                والعديد من الإكسسوارات الرجالية عالية الجودة والأنيقة، تلبي
                احتياجات وتفضيلات الرجال في المملكة العربية السعودية. تعكس
                العلامة التجارية الرؤية والرسالة من خلال تصاميمها الفريدة
                والتفاصيل الدقيقة، وتسعى لتميز الرجال وزيادة ثقتهم الذاتية من
                خلال أناقتهم الشخصية. اختيار فرادا تعني الانتقال إلى عالم
                الأناقة والتميز
              </p>
            </div>
            <div className="image-container">
              <Image src={image1} />
            </div>
          </div>
        </div>
    )
    
}
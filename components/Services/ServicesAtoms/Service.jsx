import refundImage from "../../../public/images/refund.svg"
import shippingImage from "../../../public/images/shipping.svg"
import supportImage from "../../../public/images/support.svg"
export default function Service() {
  let data = [
    {
      img: refundImage,
      title: "استبدال مجاني",
      p: "من هنا او من اقرب فرع",
    },
    {
      img: shippingImage,
      title: "شحن سريع",
      p: "24 ساعة داخل الرياض",
    },
    {
      img: supportImage,
      title: "خدمة عملاء",
      p: "24 ساعة / 7 ايام",
    },
  ];

  return (
    <div className="flex flex-grow px-1 md:p-0 order-2   ">
      <div className="flex  m-auto " style={{ flexGrow: "1" }}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-start  items-center  flex-col flex-1  sm:col-1   "
            >
              <img
                src={item.img.src}
                alt="..."
                className="w-[55px] h-[55px] md:h[[auto] md:w-[auto] "
              />

              <p className="text-center text-darkOrange font-bold text-sm md:text-mg lg:text-lg mt-[5px]">
                {item.title}
              </p>
              <p className="text-center text-[10px] md:text-sm font-bold">
                {item.p}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

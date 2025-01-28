import React from "react";

export default function OrderClientDetails({ user, days, day }) {
  let data = [
    {
      key: "الإسم",
      value: user.name,
    },

    {
      key: "التاريخ",
      value: day,
    },
    {
      key: "رقم الهاتف",
      value: user.phone,
    },
    {
      key: "الدوله",
      value: user.Country,
    },
    {
      key: "المدينه",
      value: user.city,
    },
    {
      key: "العنوان",
      value: user.Address,
    },
  ];
  return (
    <div
      className="p-3 my-5 flex-1 rounded-lg  "
      style={{ border: "1px solid #E6E6E6" }}
    >
      <h2
        className="text-darkGray text-md pb-2 lg:text-2xl  mb-4"
        style={{ borderBottom: "1px solid #E6E6E6" }}
      >
        تفاصيل المستلم
      </h2>

      <div className="flex flex-col gap-2">
        {data.map((item, index) => {
          return (
            <p
              key={index}
              className="text-darkGray text-sm md:text-md lg:text-lg"
            >
              <span>{item.key}</span> <span>:</span> <span>{item.value}</span>
            </p>
          );
        })}
      </div>
      <button className="bg-orange text-white rounded py-1 px-5 mt-3 xl:mt-0 lg:float-start text-[12px] md:text-md lg:text-lg">
        التوصيل خلال {days} أيام
      </button>
    </div>
  );
}

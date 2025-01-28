import Image from "next/image";
import LoyaltyPointsLevels from "./loyaltyPointsAtoms/loyaltyPointsLevels/LoyaltyPointsLevels";
import "./loyaltyPoints.css";
const apiKey = process.env.NEXT_PUBLIC_API_URL;
const getPoints = async () => {
  try {
    const response = await fetch(`${apiKey}/points/layer`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer  ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2suZW52YWdsby5uZXQvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MzU1NDU2MzIsIm5iZiI6MTczNTU0NTYzMiwianRpIjoiY05VbzlNWHRwdjhGV1F3VyIsInN1YiI6IjE4MjYiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.e0nf6Z8ypyLwkEIvDvlFC7vNohKSXQtZNKdvpm4GFTQ"}`,
      },
    });
    if (!response.ok) {
      throw new Error("حدث خطأ ما");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export default async function LoyaltyPoints() {
  let data = await getPoints();
  let progressPercentage =
    (data?.currentPoints / data?.nextLayer?.layerPoints) * 100;
  console.log(data);
  return (
    <div>
      <div className="relative  w-full  flex items-center banner  ">
        <p className="absolute text-white text-center gap-3 lg:text-2xl font-[700] md:mx-20 lg:mx-40 py-8 px-14  bg-orangeOpacity text">
          إكتسب المزيد من النقاط <br /> لمزيد من الخصومات
        </p>
      </div>
      <div className="w-[100%] lg:max-w-[80vw] xl:max-w-[1100px] m-auto mt-2  px-[10px] sm:p-4 md:p-10">
        <div
          className={`flex justify-between gap-2 md:gap-5 flex-wrap  rounded-xl py-3 px-[10px] sm:p-4 md:p-10`}
          style={{ backgroundColor: data?.currentLayer?.layerBgColor }}
        >
          <div className="text-center flex flex-col gap-3 font-[600] m-auto text-[10px]  sm:text-[14px] md:text-md lg:text-lg ">
            <p>المستوى التالي</p>
            <p>{data?.nextLayer?.layerPoints}</p>
          </div>
          <div className="flex flex-col gap-4 m-auto ">
            <Image
              src={
                data?.currentLayer?.layerName == "فضي"
                  ? "/assets/images/silver.svg"
                  : data?.currentLayer?.layerName == "بلاتيني"
                  ? "/assets/images/blue.svg"
                  : data?.currentLayer?.layerName == "برونزي"
                  ? "/assets/images/brown.svg"
                  : data?.currentLayer?.layerName == "ذهبي"
                  ? "/assets/images/gold.svg"
                  : null
              }
              width={65}
              height={65}
              alt="نقاط"
              className="m-auto w-[40px] h-[40px] md:w-[65px] md:h-[65px]"
            />
            <div className="text-center flex flex-col gap-3 font-[600] text-[10px]  sm:text-[14px] md:text-md lg:text-lg ">
              <p>إجمالي النقاط </p>
              <p>{data?.totalPoints}</p>
            </div>
          </div>
          <div className="text-center flex flex-col gap-3 font-[600] m-auto text-[10px] sm:text-[14px] md:text-md  lg:text-lg ">
            <p>عدد النقاط الحالي</p>
            <p>{data?.currentPoints}</p>
          </div>
        </div>
        {data?.currentLayer?.layerName !== "بلاتيني" && (
          <div className="m-auto w-full flex flex-col gap-4 my-5">
            <p className="flex justify-between  text-[10px]  sm:text-[14px] md:text-md lg:text-lg font-[600]">
              <span>{data?.nextLayer?.layerName}</span>
              <span>{data.currentLayer?.layerName}</span>
            </p>

            <div className="h-6 sm:h-8 md:h-9 lg:h-10 rounded-3xl w-full m-auto flex justify-end  border-[1px] border-solid border-lightBrown">
              <div
                className={`bg-lightPink h-full rounded-3xl`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
        <LoyaltyPointsLevels loyaltyData={data} />
      </div>
    </div>
  );
}

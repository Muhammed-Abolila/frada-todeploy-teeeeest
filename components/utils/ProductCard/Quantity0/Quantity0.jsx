export default function Quantity0() {
  return (
    <div className="layer z-[0]  absolute top-0 left-0 w-full h-full flex justify-center items-end rounded-lg">
      <div className="absolute w-full h-full bg-opacity opacity-[0.7] z-0 rounded-lg"></div>
      <div className="z-10 pb-10">
        <div
          className="w-[130px] h-[130px] border-darkOrange rotate-[-35deg] bg-black rounded-full flex font-bold flex-col  items-center justify-center "
          style={{ borderColor: "rgba(233,194,175,255)", borderWidth: "8px" }}
        >
          <span className="text-white">لم يعد</span>
          <span className="text-darkOrange">الصنف</span>
          <span className="text-white">متوفر</span>
        </div>
      </div>
    </div>
  );
}

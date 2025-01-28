import { MdLocalShipping } from "react-icons/md";
import "./TrackOrderTimeLine.css";
import { timeLine } from "./timeLine.js";
import { GoDotFill } from "react-icons/go";

export default function TrackOrderTimeLine({ tracking, order }) {
  console.log("order", order);
  console.log("tracking", tracking?.trackingStatus);

  return (
    <div className="lg:py-5 flex w-[100%] xl:w-[calc(100%_-_196.12px)]">
      <div className="flex-1">
        <ul className="timeline flex justify-between  flex-row-reverse items-center  ">
          {timeLine?.map((item, index) => (
            <div key={index} >
              {(order.status == "قيد المراجعة" && index == 0) ||
              (order.status == "قيد الإعداد" && index == 1) ||
              (order.status == "قيد الشحن" && index == 2) ||
              (order.status == "قيد التوصيل" && index == 3) ? (
                <div className="flex flex-col justify-center items-center">
                  <div
                    className={`p-1.5 rounded-full lg:hidden  ${
                      tracking.trackingStatus[`step${index + 2}`] == "Completed"
                        ? " bg-orange"
                        : "bg-lightGray"
                    } `}
                  >
                    <svg
                      className={`lg:hidden  `}
                      xmlns={timeLine[index].svg.xmlns}
                      xmlnsXlink={timeLine[index].svg.xmlnsXlink}
                      width={25}
                      height={25}
                      viewBox={timeLine[index].svg.viewBox}
                      fill={`${
                        tracking.trackingStatus[`step${index + 1}`] ==
                        "Completed"
                          ? "#D27A51"
                          : "white"
                      }`}
                    >
                      {timeLine[index].path}
                    </svg>
                  </div>
                  <p className={`text-[10px] font-[800] lg:hidden text-nowrap`}>
                    {timeLine[index].step}
                  </p>
                </div>
              ) : order.status == "تم التوصيل" && index == 4 ? (
                <MdLocalShipping
                  className={`text-lg ${
                    tracking.trackingStatus[`step7`] == "Completed"
                      ? "text-orange"
                      : "text-lightGray"
                  }`}
                />
              ) : (
                <GoDotFill
                  className={`text-xl lg:hidden w-[15px] h-[15px] ${
                    tracking.trackingStatus[`step${index + 1}`] == "Completed"
                      ? "text-orange"
                      : "text-lightGray"
                  }`}
                />
              )}
              <li key={index} className={`flex  ${index != 3 && "flex-1"}`}>
                <div className="timeline-middle flex flex-col justify-center flex-1 gap-2">
                  <p className="text-[14px] text-center hidden lg:flex text-nowrap justify-center">
                    {item.status}
                  </p>
                  {index < timeLine.length - 1 && (
                    <div
                      className={`w-full rounded-full min-w-[20px]  h-1 lg:max-h-2   flex-1 border-solid border-[1px] lg:border-[#DDD]  ${
                        tracking.trackingStatus[`step${index + 2}`] ==
                        "Completed"
                          ? " border-orange"
                          : ""
                      } `}
                    >
                      <div
                        className="bg-orange  h-0 lg:h-2  rounded-full float-end"
                        style={{
                          width: `${
                            tracking.trackingStatus[`step${index + 2}`] ==
                            "Completed"
                              ? "100%"
                              : "0%"
                          }`,
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className=" flex-col gap-2 items-center svg transform translate-y-7 hidden lg:flex">
                  {item.svg && (
                    <svg
                      xmlns={item.svg.xmlns}
                      xmlnsXlink={item.svg.xmlnsXlink}
                      width={item.svg.width}
                      height={item.svg.height}
                      viewBox={item.svg.viewBox}
                      fill={`${
                        tracking.trackingStatus[`step${index + 1}`] ==
                        "Completed"
                          ? "#D27A51"
                          : "#d3d3d3"
                      }`}
                    >
                      {item.path}
                    </svg>
                  )}
                  <p
                    className={`text-center ${`${
                      tracking.trackingStatus[`step${index + 1}`] == "Completed"
                        ? "text-orange"
                        : "black"
                    }`}`}
                  >
                    {item.step}
                  </p>
                </div>
              </li>
            </div>
          ))}

          <li className={`flex   flex-1`}>
            <div className=" flex-col  items-center svg transform translate-y-7 hidden lg:flex">
              <MdLocalShipping
                className={`text-5xl ${
                  tracking.trackingStatus[`step7`] == "Completed"
                    ? "text-orange"
                    : "text-lightGray"
                }`}
              />
              <p
                className={`text-center ${`${
                  tracking.trackingStatus.step7 == "Completed"
                    ? "text-orange"
                    : "black"
                }`}`}
              >
                تم التوصيل
              </p>
            </div>
            <GoDotFill
              className={`text-xl lg:hidden w-[15px] h-[15px]  ${
                tracking.trackingStatus[`step7`] == "Completed"
                  ? "text-orange"
                  : "text-lightGray"
              }`}
            />

            <div className="timeline-middle flex flex-col justify-center flex-1 gap-2">
              <p className="text-[14px] text-center hidden lg:flex text-nowrap justify-center">
                جاري التوصيل اليك
              </p>
              <div className="w-full rounded-full min-w-[20px]  max-h-1 lg:max-h-2   flex-1 lg:border-solid lg:border-[1px] lg:border-[#DDD]">
                <div
                  className={` ${
                    tracking.trackingStatus[`step7`] == "Completed"
                      ? "bg-orange "
                      : "border-[1px] border-solid border-[#DDD] lg:border-none"
                  }  h-[2px] lg:h-2  rounded-full float-end`}
                  style={{
                    width: `${
                      tracking.trackingStatus[`step7`] == "Completed"
                        ? "100%"
                        : "100%"
                    }`,
                  }}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

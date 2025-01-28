// "use client";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// export default function TrackOrderCompletePercentage({ percentage }) {
//   return (
//     <div
//       className="absolute h-[100%] top-0 left-0  flex-col justify-center items-center w-[196.125px] hidden xl:flex"
//       style={{ boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 8px 0px inset" }}
//     >
//       <CircularProgressbar
//         className="w-[82px] h-[82px]"
//         value={percentage.split("%")[0]}
//         styles={{
//           path: {
//             stroke: "black",
//             strokeWidth: 8,
//           },
//           trail: {
//             stroke: "white",
//             strokeWidth: 8,
//           },
//           text: {
//             fill: "black",
//             fontSize: "18px",
//             fontWeight: "bold",
//           },
//         }}
//         text={`${percentage}`}
//       />
//       <p className="text-center my-2">نسبة الإكتمال</p>
//     </div>
//   );
// }

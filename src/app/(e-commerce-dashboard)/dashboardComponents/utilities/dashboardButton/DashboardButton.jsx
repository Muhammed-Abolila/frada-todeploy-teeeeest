export default function DashboardButton({ text, disable, status , onClick}) {
  console.log(disable, status);
  return (
    <button
      className={`bg-orange text-white px-7  max-h-[37px] w-fit py-1.5 rounded  text-sm lg:text-md ${
        (disable == "Completed" && status == "قيد الإعداد") ||
        status == "قيد المراجعة"
          ? "opacity-[1] hover:shadow-md cursor-pointer"
          : "opacity-[0.5]"
      }`}
      disabled={
        (disable == "Completed" && status == "قيد المراجعة") ||
        status == "قيد الإعداد"
          ? false
          : true
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
}

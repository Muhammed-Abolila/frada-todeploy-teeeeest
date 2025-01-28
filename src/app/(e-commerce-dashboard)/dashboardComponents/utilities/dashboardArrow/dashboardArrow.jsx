"use client";
import { IoMdArrowDropdownCircle } from "react-icons/io";
const DashboardArrow = ({ className, onClick }) => {
  return (
    <div className="flex justify-end mt-2">
      <IoMdArrowDropdownCircle className={className} onClick={onClick} />
    </div>
  );
};
export default DashboardArrow;

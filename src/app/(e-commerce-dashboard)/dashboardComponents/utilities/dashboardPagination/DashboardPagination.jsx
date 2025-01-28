"use client";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const DashboardPagination = ({
  data,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const pages =
    data?.length > 0 ? [...Array(totalPages).keys()].map((i) => i + 1) : [];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 cursor-pointer"
      >
        <IoIosArrowForward />
      </button>

      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(pageNumber);
          }}
          className={`flex items-center mx-2 ${
            pageNumber === currentPage ? "text-orange" : ""
          }`}
          href="#"
          passHref
        >
          {pageNumber}
        </Link>
      ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 cursor-pointer"
      >
        <IoIosArrowForward className="transform -rotate-180" />
      </button>
    </div>
  );
};

export default DashboardPagination;

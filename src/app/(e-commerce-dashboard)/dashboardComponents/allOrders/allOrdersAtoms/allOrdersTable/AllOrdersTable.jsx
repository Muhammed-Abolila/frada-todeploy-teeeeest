"use client";
import { HiDotsHorizontal } from "react-icons/hi";
import OrderDetails from "../orderDetails/OrderDetails";
import { useState } from "react";
import DashboardPagination from "../../../utilities/dashboardPagination/DashboardPagination";
import Image from "next/image";
import NoProduct from "../../../../../../../components/Utilities/NoProduct/NoProduct";
export default function AllOrdersTable({ data }) {
  let [close, setClose] = useState(true);
  let [order, setOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsPerPage = data?.orders.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log("data?.orders", data?.orders);
  const totalPages = Math.ceil(data?.orders?.length / itemsPerPage);
  // Columns for the table
  let columns = [
    { title: "رقم الطلب" },
    { title: "المستلم" },
    { title: "تاريخ الطلب" },
    { title: "تاريخ الإستلام" },
    { title: "وسيلة الشحن" },
    { title: "مصدر الطلب" },
    { title: "حالة الطلب" },
    { title: "تكلفة الطلب" },
    { title: " " },
  ];
  return (
    <>
      {data?.orders?.length > 0 ? (
        <div>
          <div
            className="overflow-x-auto bg-lightGrayy rounded-lg shadow-sm px-5 py-8 min-h-[60vh] lg:min-h-[75vh]  "
            style={{ direction: "rtl" }}
          >
            <table className=" w-full text-start text-sm font-[400] text-surface dark:text-white ">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`text-center text-orange py-3 ${
                        index != columns.length - 1
                          ? "min-w-[120px]"
                          : "min-w-[60px]"
                      } `}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItemsPerPage &&
                  currentItemsPerPage.map((order, index) => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10 bg-white "
                      key={index}
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        {order.order_id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        {data.user.name ? data.user.name : "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        {order.order_date ? order.order_date : "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        {order.expected_delivery_date
                          ? order.expected_delivery_date
                          : order?.order_date}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        <Image
                          src={order.image}
                          width={80}
                          height={80}
                          className="m-auto"
                          alt="اسم شركة الشحن"
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        {order.from == "website"
                          ? "المتجر الإلكتروني"
                          : "المعرض"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        {order.status ? order.status : "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        {order.total_amount ? order.total_amount : "-"}
                      </td>
                      <td className="text-orange text-2xl cursor-pointer">
                        <HiDotsHorizontal
                          className="px-2 text-4xl"
                          onClick={() => {
                            setOrder(order);
                            setClose(false);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <OrderDetails
              close={close}
              setClose={setClose}
              order={order}
              user={data.user}
            />
          </div>

          <div
            className="flex justify-center mt-10"
            style={{ direction: "rtl" }}
          >
            <DashboardPagination
              data={data?.orders}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      ) : (
        <NoProduct text="لا توجد طلبات" />
      )}
    </>
  );
}

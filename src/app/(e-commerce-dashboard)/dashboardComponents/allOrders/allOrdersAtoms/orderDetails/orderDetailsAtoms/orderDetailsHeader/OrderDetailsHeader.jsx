import { AiFillCloseCircle } from "react-icons/ai";
export default function OrderDetailsHeader({ setClose, order }) {
  return (
    <div className="flex justify-between my-3 pb-3 min-w-[730px] border-b-[1px] border-solid border-b-black_opacity">
      <div className="flex flex-col gap-2">
        <h1 className="text-darkGray text-xl">
          رقم الطلب <span>{order.order_id}</span>
        </h1>
        <p>
          <span className="font-bold">تاريخ الطلب : </span>
          <span>{order.order_date}</span>
        </p>
        <p>
          <span className="font-bold">حالة الطلب : </span>
          <span className="text-orange">مكتمل</span>
        </p>
      </div>
      <div>
        <AiFillCloseCircle
          className="text-orange text-3xl cursor-pointer  "
          onClick={() => {
            setClose(true);
          }}
        />
      </div>
    </div>
  );
}

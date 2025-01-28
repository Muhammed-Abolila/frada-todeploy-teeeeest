import OrderaDetailsHeader from "./orderDetailsAtoms/orderDetailsHeader/OrderDetailsHeader";
import OrderData from "./orderDetailsAtoms/orderData/OrderData";
import PayementRow from "./orderDetailsAtoms/paymentRow/PayementRow";
import OrderTable from "../allOrdersTable/allOrdersTableAtoms/orderProductsTable/OrderProductsTable";

export default function OrderDetails({ close, setClose, order, user }) {
  let client = [
    {
      key: "الإسم",

      value: user?.name,
    },
    {
      key: "البريد الإلكتروني",

      value: user.Email,
    },
    {
      key: "رقم الهاتف",
      value: user?.phone,
    },
  ];
  let shipping = [
    {
      key: "حالة الشحن",
      value: "تم التوصيل",
    },
    {
      key: "شركة الشحن",
      value: "اراميكس",
    },
    {
      key: "العنوان",
      value: user?.Address,
    },
  ];
  let payment = [
    {
      key: "وسيلة الدفع",
      value: order.payment_method,
    },
    {
      key: "تاريخ الدفع",
      value: order?.order_date,
    },
    {
      key: "تاريخ الإستلام",
      value: order?.expected_delivery_date
        ? order?.expected_delivery_date
        : order?.order_date,
    },
  ];
  let firstColumnData = [
    {
      text: "إجمالي سعر الأصناف",
      price: order?.totals?.total_products,
    },
    {
      text: "ضريبة القيمة المضافة ",
      price: order?.totals?.tax_amount,
    },
  ];
  let secondColumnData = [
    {
      text: "إجمالي الخصومات",
      price: order?.totals?.discounts,
    },

    {
      text: "قيمة الشحن",
      price: order?.totals?.shipping_fees,
    },
  ];
  let thirdColumnData = [
    {
      text: "الإجمالي بعد الخصم",
      price: order?.totals?.total_amount_plusTax,
    },
    {
      text: "الإجمالي شامل الضريبة",
      price: order?.totals?.total_products_plusTax,
    },
  ];

  return (
    <div
      className={`flex justify-center items-center ${
        close ? "scale-[0]" : " scale-[1]"
      }  w-[100%] h-[100%] fixed top-0 left-0 bg-black_opacity p-5 lg:px-20  z-10`}
    >
      <div className="bg-white p-5 rounded-lg  w-[1200px]    overflow-x-auto">
        <OrderaDetailsHeader setClose={setClose} order={order} />
        <div className="flex justify-between  min-w-[730px]">
          <OrderData details={client} title="العميل" />
          <OrderData details={shipping} title="الشحن" />
          <OrderData details={payment} title="الدفع" />
        </div>
        {/* products table */}
        <OrderTable order={order} />
        <div className="payment">
          <table className="min-w-[730px] m-auto my-5 overflow-hidden ">
            <tbody>
              <PayementRow columns={firstColumnData} />
              <PayementRow columns={secondColumnData} />
              <PayementRow columns={thirdColumnData} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

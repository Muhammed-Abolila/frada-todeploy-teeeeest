import Image from "next/image";
import "./style.css";
export default function OrderProductsTable({ order }) {
  const imageSrc = process.env.NEXT_PUBLIC_IMAGE_SRC;
  let columns = [
    {
      title: "اسم المنتج",
    },
    {
      title: "السعر",
    },
    {
      title: "تباين A",
    },
    {
      title: "تباين B",
    },
    {
      title: "الكمية",
    },
    {
      title: "الإجمالي",
    },
  ];
  return (
    <>
      <div
        className="order-table shadow-sm px-5 py-2  my-5  min-w-[730px]  "
        style={{
          direction: "rtl",
          borderTop: "1px solid #707070",
          borderBottom: "1px solid #707070",
        }}
      >
        <table className="w-full overflow-x-auto  text-start text-sm rounded-lg  ">
          <thead>
            <tr>
              {columns.map((column, index) => {
                return (
                  <th
                    key={index}
                    className={`${
                      index != 0
                        ? "text-center"
                        : "text-right pr-6 transform -translate-x-[16%]"
                    } py-3`}
                  >
                    {column.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {order?.orderItems &&
              order?.orderItems?.map((product, index) => {
                return (
                  <tr key={index}>
                    <td
                      className={`whitespace-nowrap px-6 py-2 inline-flex items-center gap-2`}
                    >
                      <Image
                        src={`${imageSrc}/${product?.ProductID}/${
                          product?.color_id ? product?.color_id : "/"
                        }/${product?.main_photo}`}
                        alt={product.product_name}
                        width={48}
                        height={48}
                      />
                      <span>
                        {product.product_name ? product.product_name : "-"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {product.price ? product.price : "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {product.Size ? product.Size : "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {product.color_name ? product.color_name : "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {product.quantity ? product.quantity : "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {product.quantity * Number(product.price)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

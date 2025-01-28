import Image from "next/image";
export default function OrderProductsDetails({ orderItems, totalAmount }) {
  const imageSrc = process.env.NEXT_PUBLIC_IMAGE_SRC;
  return (
    <div className="flex-1 pl-8 my-5 ">
      <h2
        className="text-darkGray pb-2 lg:text-2xl  my-4"
        style={{ borderBottom: "1px solid #E6E6E6" }}
      >
        تفاصيل الطلب
      </h2>
      <div className="products flex justify-end flex-wrap gap-10 md:min-h-[200px] ">
        {orderItems?.map((product, index) => {
          return (
            <div key={index} className="product flex flex-row-reverse gap-4">
              <div className="product-image">
                <Image
                  width={60.86}
                  height={58.12}
                  alt={product.product_name}
                  className="rounded-lg shadow-md"
                  src={`${imageSrc}/${product?.ProductID}/${
                    product?.color_id ? product?.color_id : "/"
                  }/${product?.main_photo}`}
                />
              </div>
              <div className="image-variants">
                <h1 className="text-sm md:text-md lg:text-lg">
                  {product.product_name}
                </h1>
                {product.color_name && (
                  <p className="text-sm md:text-md lg:text-lg">
                    <span>{product.color_name}</span> <span> : اللون</span>
                  </p>
                )}

                {product.Size && (
                  <p className="text-sm md:text-md lg:text-lg">
                    <span>{product.Size}</span> <span> : المقاس</span>
                  </p>
                )}
                {product.thickness_name && (
                  <p className="text-sm md:text-md lg:text-lg">
                    <span>{product.thickness_name}</span> <span> : السُمك</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="bg-orange text-white rounded py-1 px-5  text-[12px] md:text-md lg:text-lg mt-3 float-end">
        <span>إجمالي الطلب</span> <span>{totalAmount}</span> <span>ر.س</span>
      </button>
    </div>
  );
}

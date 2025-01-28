import imgTest from "../../../../public/Images/test.png";
export default function HomeCategoriesCard({item}) {

const item_copy={
      img: imgTest,
      p1: "تشكيلات النعال من فرادا",
      p2: "...تالقك يعني لنا الكثير",
    }


const baseImageUrl=process.env.NEXT_PUBLIC_BANNER_IMG_SRC

  return (
    <div
      className="card relative cursor-pointer h-[300px] flex flex-col justify-end
     bg-white cards pt-6 pb-3  lg:pt-[90px] lg:pb-1 transition duration-300
      hover:shadow-md  rounded-lg "
    >
      <div
        className={`flex flex-col gap-2 items-center justify-center  py-2 px-3 w-full`}
      >
        <div className="flex w-full h-full flex-col">
          <div className="flex flex-col justify-center h-full  ">
            <img
               src={`${baseImageUrl}/${item.banner_image}`}
              //  src={item_copy.img.src}
              alt={item_copy.p1}
              className="w-[190px] z-20 -left-7 -bottom-[1rem] absolute lg:top-[0px] lg:left-[50%] lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2"
            />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <div className="flex flex-col justify-between ">
              <p className="text-right xs:text-white md:w-full lg:text-black lg:text-center">{item.description}</p>
            </div>

            <div className="btn-container w-full flex justify-center">
              <button className="rounded text-white bg-black text-lg text-center  px-2 py-1  hover:shadow-lg shopping ">
              {item.button_text}   
              </button>
            </div>
          </div>
        </div>

        <p className="text-white text-xl text-center">{item_copy.title}</p>
     
      </div>
    </div>
  );
}
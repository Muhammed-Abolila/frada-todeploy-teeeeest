import Link from "next/link";
export default function HeroCard({ item }) {
  // console.log("item", encodeURIComponent(item.banner_image));

  let bannerImageKey = process.env.NEXT_PUBLIC_BANNER_IMG_SRC;
  return (
    <div
      className="relative flex flex-col items-start justify-end pb-40 "
      style={{
        backgroundImage: `url(${bannerImageKey}/${item?.banner_image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        backgroundSize: "cover",
        height: "60vh",
      }}
    >
      <div className="w-[50%] flex flex-col gap-2 items-center justify-center">
        <p className="text-white text-xl w-[65%] text-center">
          {item.description}
        </p>
        <button
          className={`rounded text-white w-[130px] p-2 m-auto`}
          style={{ backgroundColor: item.color_button }}
        >
          <Link
            href={`/${item?.category_slug}${
              item?.subcategory_slug ? "/" + item?.subcategory_slug : ""
            }`}
            style={{ color: "unset", textDecoration: "none" }}
          >
            {item.button_text}
          </Link>
        </button>
      </div>
    </div>
  );
}

"use client";
import ReactStars from "react-rating-stars-component";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import TabbyPromo from "../../Tabby/TabbyPromo/TabbyPromo";
import "../../SingleProduct/SingleProductAtoms/SingleProductCard/SingleProductCard";
import "./ProductDetailsMenu.css";
// import ItemDetailsHook from "../../../src/customHooks/ItemDetailsHook/ItemDetailsHook";
// import ItemReviewsHook from "../../../src/customHooks/ItemDetailsHook/ItemReviewsHook";
import EmailPopup from "../../SingleProduct/SingleProductAtoms/SingleProductCard/EmailPopup/EmailPopup";
import ImagesHolder from "../../SingleProduct/SingleProductAtoms/SingleProductCard/ImagesHolder/ImagesHolder";
import NotifyComp from "../NotifyComp/NotifyComp";
import ItemReviewsHook from "@/app/customHooks/ItemDetailsHook/ItemReviewsHook";
import ItemDetailsHook from "@/app/customHooks/ItemDetailsHook/ItemDetailsHook";
import { useShowProductDetailsAside } from "@/context/showProductDetailsAside";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

const ProductDetailsMenu = () => {
  const {
    showProductDetailsAside,
    setShowProductDetailsAside,
    productId,
    setProductId,
  } = useShowProductDetailsAside();
  const [
    loading,
    singleproduct,
    handleChooseColor,
    productData,
    Size,
    showSizes,
    showStock,
    stockQty,
    handleSizeClick,
    addToCart,
    addProductToWishList,
    onDeleteItem,
    favProduct,
    globalIndex,
    handleChoosedThick,
    handleChoosedThickSize,
    thickIndex,
    thickSizeIndex,
    thicknessSizeChoosed,
    tabbyPrice,
    scriptLoading,
    isInfull,
    showEmailLayout,
    setShowEmailLayout,
  ] = ItemDetailsHook(productId);
  const [AllReviews, reload, setReload] = ItemReviewsHook(productId);





  
  useEffect(() => {
    const closeAside = (e) => {
      if (!e.target.closest(".product-details-menu")) {
        setShowProductDetailsAside(false);
      }
    };
    document.addEventListener("mousedown", closeAside);
    document.addEventListener("keydown", closeAside);
  }, [showProductDetailsAside]);
  return (
    <>
      <div
        className="product-details-menu"
        style={{ right: showProductDetailsAside ? "0px" : "-500%" }}
      >
        <div className="top">
          <IoCloseSharp
            className="icon-close cursor-pointer text-xl"
            onClick={() => setShowProductDetailsAside(false)}
          />

          <p>إلقاء نظرة سريعة</p>
        </div>
        {!loading ? (
          <>
            {singleproduct && (
              <div className="image-holder-content">
                <ImagesHolder
                  id={productData.ProductID}
                  colorid={singleproduct.ColorID ? singleproduct.ColorID : ""}
                  images={
                    singleproduct.Images ? singleproduct.Images : singleproduct
                  }
                />
              </div>
            )}
            <Card className="detail-content">
              <Card.Body>
                <Card.Title>
                  <h5>{productData.Name}</h5>
                </Card.Title>
                <div className="code-rate-holder">
                  <span className="code">{productData.Barcode}</span>
                  <div className="rate">
                    {AllReviews ? (
                      <>
                        <div className="number-evaluators">
                          &#41;
                          <span>{AllReviews.reviews.length}</span>
                          <span>تقييم</span>
                          &#40;
                        </div>
                        <ReactStars
                          value={AllReviews.averageRating}
                          size={30}
                          edit={false}
                          isHalf={true}
                          color="#c1c1c1"
                          activeColor="#ffd700"
                        />
                      </>
                    ) : null}
                  </div>
                </div>
                {productData.trademark &&
                productData.trademark.TrademarkName ? (
                  <div className="trademark-container">
                    <h6>:العلامة التجارية</h6>
                    <span>{productData.trademark.TrademarkName}</span>
                  </div>
                ) : null}

                <div className="price-container">
                  <h6>:السعر</h6>
                  {productData.Discount > 0 ? (
                    <>
                      <div className="price-after-disc">
                        <span>رس</span>
                        <span>{productData.Price}</span>
                      </div>
                      <div className="price-before-disc">
                        <span>رس</span>
                        <span>{productData.SellPricePlusTax}</span>
                      </div>
                    </>
                  ) : (
                    <div className="price-after-disc">
                      <span>رس</span>
                      <span>{productData.Price}</span>
                    </div>
                  )}
                </div>
                {!scriptLoading ? <TabbyPromo price={tabbyPrice} /> : null}

                {productData.productQuantityInventory != null && (
                  <>
                    {productData.productQuantityInventory == 0 ? (
                      <div className="quatity-container outstock">
                        <p style={{ color: "#bf1029" }}>غير متوفر في المخزن</p>
                        <p
                          role="button"
                          onClick={() => setShowEmailLayout(true)}
                        >
                          ! إخباري عندما يكون متاحاً
                        </p>
                      </div>
                    ) : (
                      <>
                        {isInfull ? (
                          <div className="notify-container">
                            <NotifyComp
                              notify={{
                                msg: "غير متوفر في المخزن",
                                state: "error",
                              }}
                            />
                            <p
                              role="button"
                              onClick={() => setShowEmailLayout(true)}
                            >
                              ! إخباري عندما يكون متاحاً
                            </p>
                          </div>
                        ) : (
                          <div
                            className="quatity-container"
                            style={{ color: "green" }}
                          >
                            <p> متوفر في المخزن</p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {singleproduct && singleproduct.Images ? (
                  <>
                    <div className="color-product-holder">
                      <div>
                        <h6>إختر لون</h6>
                        <div className="color-image-holder">
                          {productData.Colors
                            ? productData.Colors.map((color, index) => (
                                <div
                                  className="image-color-container"
                                  key={index}
                                >
                                  <div
                                    className="image-color"
                                    style={{
                                      cursor: "pointer",
                                      border: `${
                                        index == globalIndex
                                          ? "1px solid #000"
                                          : "1px solid #ddd"
                                      }`,
                                    }}
                                    onClick={() =>
                                      handleChooseColor(color, index)
                                    }
                                  >
                                    <Image
                                      loading="lazy"
                                      key={index}
                                      src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${
                                        productData.ProductID
                                      }/${color != null ? color.ColorID : ""}/${
                                        color != null ? color.Images[0] : ""
                                      }`}
                                      width={50}
                                      height={50}
                                      className="ml-2"
                                      alt={productData.Name}
                                    />
                                  </div>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                    {singleproduct.Sizes != null && showSizes == true ? (
                      <div className="size-product-holder mt-2">
                        <div className="size-product-container">
                          <h6>إختر مقاس</h6>
                          <div className="size-holder">
                            {singleproduct.Sizes &&
                              singleproduct.Sizes.map((size, index) => (
                                <div
                                  key={index}
                                  className="single-sizes"
                                  style={{
                                    backgroundColor: `${
                                      index == Size ? "#000" : "#fff"
                                    }`,
                                    color: `${index == Size ? "#fff" : "#000"}`,
                                  }}
                                  onClick={() => {
                                    handleSizeClick(size, index);
                                  }}
                                >
                                  <div className="single-size">{size}</div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null}
                {productData.thickness && productData.thickness.length > 0 ? (
                  <div className="thickness-container mt-2">
                    <h6>إختر سٌمك</h6>
                    <div className="thickness-list mt-3">
                      {productData.thickness.length > 0 &&
                        productData.thickness.map((item, index) => (
                          <div
                            key={index}
                            className="thickness-item"
                            style={{
                              backgroundColor:
                                index == thickIndex ? "#000" : "#fff",
                              color: index == thickIndex ? "#fff" : "#000",
                            }}
                            onClick={() => handleChoosedThick(item, index)}
                          >
                            {item.ThicknessName}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}

                {thicknessSizeChoosed != [] &&
                thicknessSizeChoosed?.length >= 1 ? (
                  <div className="thickness-size-container mt-2">
                    <h6>إختر مقاس</h6>
                    <div className="thickness-size-list mt-3">
                      {thicknessSizeChoosed?.map((size, index) => (
                        <div
                          key={index}
                          className="thickness-size-item"
                          style={{
                            backgroundColor:
                              index == thickSizeIndex ? "#000" : "#fff",
                            color: index == thickSizeIndex ? "#fff" : "#000",
                          }}
                          onClick={() => handleChoosedThickSize(size, index)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {showStock &&
                  (stockQty > 0 ? (
                    <>
                      {isInfull ? (
                        <div className="notify-container">
                          <NotifyComp
                            notify={{
                              msg: "غير متوفر في المخزن",
                              state: "error",
                            }}
                          />
                          <p
                            role="button"
                            onClick={() => setShowEmailLayout(true)}
                          >
                            ! إخباري عندما يكون متاحاً
                          </p>
                        </div>
                      ) : (
                        <div
                          className="quatity-container"
                          style={{ color: "green" }}
                        >
                          <p> متوفر في المخزن</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="quatity-container outstock">
                      <p style={{ color: "#bf1029" }}>غير متوفر في المخزن</p>
                      <p role="button" onClick={() => setShowEmailLayout(true)}>
                        ! إخباري عندما يكون متاحاً
                      </p>
                    </div>
                  ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div className="buttons">
                    <button
                      onClick={() => {
                        setShowProductDetailsAside(false);
                      }}
                      className="border-[1px] border-solid border-black rounded-md px-1 py-2 hover:bg-black hover:text-white transition-all duration-75"
                    >
                      إغلاق
                    </button>
                    {stockQty > 0 ? (
                      <button
                        onClick={() => {
                          addToCart(), setShowProductDetailsAside(false);
                        }}
                        className="border-[1px] border-solid border-black rounded-md px-1 py-2 hover:bg-black hover:text-white transition-all duration-75"

                      >
                        أضف للسلة
                      </button>
                    ) : (
                      <button
                        onClick={() => Notify("إختر المنتج أولاُ", "error")}
                        className="disabled border-[1px] border-solid border-black rounded-md px-1 py-2 hover:bg-black hover:text-white transition-all duration-75"

                      >
                        أضف للسلة
                      </button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </>
        ) : (
          <div className="loading">
            <span className="loader"></span>
          </div>
        )}
      </div>
      {showEmailLayout && (
        <EmailPopup setShowEmailLayout={setShowEmailLayout} />
      )}
    </>
  );
};
export default ProductDetailsMenu;

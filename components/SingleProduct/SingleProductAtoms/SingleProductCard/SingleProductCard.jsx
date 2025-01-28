import "./SingleProductCard.css";
import ImagesHolder from "./ImagesHolder/ImagesHolder";
import ReactStars from "react-rating-stars-component";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import TabbyPromo from "./../../../Tabby/TabbyPromo/TabbyPromo";
import NotifyComp from "./../../../Utilities/NotifyComp/NotifyComp";
import LoadingPage from "./../../../Utilities/LoadingPage/LoadingPage";
import EmailPopup from './EmailPopup/EmailPopup';
import ItemDetailsHook from "@/app/customHooks/ItemDetailsHook/ItemDetailsHook";
export default function SingleProductCard({ AllReviews }) {
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
    cartReload
  ] = ItemDetailsHook();
  return (
    <section className="single-product-card">
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
              {productData.trademark && productData.trademark.TrademarkName ? (
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
                      <p role="button" onClick={() => setShowEmailLayout(true)}>
                        ! إخباري عندما يكون متاحاً
                      </p>
                    </div>
                  ) : (
                    <>
                      {isInfull ? (
                        <div className="notify-container">
                          <NotifyComp
                            notify={{
                              msg: "لقد وصلت للحد الأقصي",
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
                  {singleproduct?.Sizes != null && showSizes == true ? (
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
              {productData?.thickness && productData?.thickness?.length > 0 ? (
                <div className="thickness-container mt-2">
                  <h6>إختر سٌمك</h6>
                  <div className="thickness-list mt-3">
                    {productData?.thickness?.length > 0 &&
                      productData?.thickness.map((item, index) => (
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
                    {thicknessSizeChoosed.map((size, index) => (
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
                            msg: "لقد وصلت للحد الأقصي",
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
                  {favProduct == true ? (
                    <button
                    className="btn"
                      onClick={() => {
                        onDeleteItem(productData.ProductID);
                      }}
                    >
                      الحذف من الأمنيات
                    </button>
                  ) : (
                    <button
                    className="btn"
                      onClick={() => {
                        addProductToWishList(productData.ProductID);
                      }}
                    >
                      أضف للأمنيات
                    </button>
                  )}
                  {cartReload?(
                    <button
                    className="btn"
                    disabled
                    style={{ opacity:".3" }}
                  >
                    Loading
                    
                  </button>
                  ):(

                    <button
                    className="btn"
                    disabled={isInfull || stockQty <= 0}
                    style={{ opacity: isInfull || stockQty <= 0 ? ".3" : "1" }}
                    onClick={() => addToCart()}
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
        <LoadingPage />
      )}
      {showEmailLayout && (
        <EmailPopup setShowEmailLayout={setShowEmailLayout} />
      )}
    </section>
  );
}

export const revalidate = 120;

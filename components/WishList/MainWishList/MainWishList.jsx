"use client";
import "./MainWishList.css";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
// import WishListHook from "../../../src/customHooks/WishListHook/WishListHook";
import Link from "next/link";
import DiscAlert from "../../Utilities/DiscAlert/DiscAlert";
import NoProduct from "../../Utilities/NoProduct/NoProduct";
import LoadingPage from "../../Utilities/LoadingPage/LoadingPage";
import WishListHook from "@/app/customHooks/WishListHook/WishListHook";
const MainWishList = () => {
  const [wishData, onDeleteItem,addProductToWishList] = WishListHook();
  return (
    <section className="wish-list-container">
      {wishData ?(
        <>
          {wishData?.products.length > 0 ? (
            <>
              <ToastContainer />
              <Container>
                <div className="top">
                  <h2>قائمه الأمنيات</h2>
                </div>
                <div className="wish-content">
                  <Row>
                    {wishData.products.map(item => (
                      <Col
                        key={item.ProductID}
                        className="col-10 offset-1 col-sm-6 col-md-4 col-xl-3 offset-sm-0 mb-4"
                      >
                          <div className="wish-card">
                            <div className="img-container">
                              <Link
                                href={`/category/${item.CategoryID}/product/${item.ProductID}`}
                              >
                                <img
                                loading="lazy"
                                  src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${
                                    item.ProductID
                                  }/${
                                    item.Colors&&item.Colors[0].ColorID!=null?item.Colors[0].ColorID: ""
                                  }/${item.MainPhoto.Image}`}
                                  alt={item.Name}
                                />
                              </Link>
                            </div>
                            <div className="content">
                              <div className="details name">
                                <h6 className="subtitle">
                                  {item.Name}
                                </h6>
                              </div>
                              <div className="details price-container">
                                {item.Discount >0? (
                                  <div className="price">
                                    <h6 className="price-before">
                                      <span>رس</span>
                                      <span>
                                        {item.SellPricePlusTax}
                                      </span>
                                    </h6>
                                    <h6 className="price-after">
                                      <span>رس</span>
                                      <span>{item.Price}</span>
                                    </h6>
                                  </div>
                                ) : (
                                  <div className="price">
                                    <h6 className="price-after">
                                      <span>رس</span>
                                      <span>{item.Price}</span>
                                    </h6>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="button">
                              <button
                                onClick={() => onDeleteItem(item.ProductID)}
                              >
                                الإزاله من الأمنيات
                              </button>
                            </div>
                            {item.Discount > 0 ? (
                              <DiscAlert disc={item.Discount} />
                            ) : null}
                          </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Container>
            </>
          ) : (
            <NoProduct text="لا يوجد منتجات في الأمنيات" />
          )}
        </>
      ):(<LoadingPage/>)}
    </section>
  );
};

export default MainWishList;

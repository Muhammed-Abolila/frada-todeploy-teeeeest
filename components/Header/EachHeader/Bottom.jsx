"use client";
import Image from "next/image";
import Link from "next/link";
import { Row, Col, Container } from "react-bootstrap";
import SocilaLinks from "../../Utilities/SocialLinks/SocilaLinks";
// import cartIcon from "../../../public/Images/Icons/2nd Bar/new/Group 53.svg";
import CartAside from "../../Utilities/CartAside/CartAside";
import { IoCartOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Bottom({
  loading,
  categories,
  cartData,
  showDeleteItemPopup,
  handleDelete,
  setDeleteItemPopup,
  onDeleteItemPopup,
  ItemDelete,
}) {
  const [showCartAside, setShowCartAside] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  // cart-aside
  useEffect(() => {
    const handleCloseCartAside = (event) => {
      if (
        showCartAside &&
        !event.target.closest(".cart-aside") &&
        !isDeletePopupVisible
      ) {
        setShowCartAside(false);
      }
    };
    ["mousedown", "keydown"].forEach((userEvent) =>
      document.addEventListener(userEvent, handleCloseCartAside)
    );
    return () => {
      ["mousedown", "keydown"].forEach((userEvent) =>
        document.removeEventListener(userEvent, handleCloseCartAside)
      );
    };
  }, [showCartAside, isDeletePopupVisible]);
  console.log("showCartAside", showCartAside);

  return (
    <nav className="navigation-bar p-1.5">
      <Container>
        <Row>
          <Col md={{ span: 10 }}>
            <ul className="nav-list">
              <li className="listed">
                <Link
                  href="/collections"
                  as="/collections"
                  className="listed-desc"
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  <div className="category-name">
                    <p>العروض والخصومات</p>
                  </div>
                </Link>
              </li>
              {categories.length > 0 &&
                categories.map((category) => (
                  <li className="listed  " key={category.CategoryID}>
                    <Link
                      href={"category/" + category.CategoryID}
                      as={`/category/${category.CategoryID}`}
                      className="listed-desc"
                      style={{ textDecoration: "none", color: "unset" }}
                    >
                      <div className="category-name">
                        <p>{category.arabic_name}</p>
                      </div>
                    </Link>

                    {category.subcategories.length > 0 ? (
                      <div className="subcategory mt-1">
                        <Container fluid>
                          <Row>
                            <Col md={{ span: 6 }} className="p-0">
                              <div className="img-container">
                                <img
                                  loading="lazy"
                                  src={`https://www.fradaksa.net/back/Laravel/public/Attachment/Category/${category.photo}`}
                                  alt={category.arabic_name}
                                />
                                <div className="layer"></div>
                                <div className="content">
                                  <p>
                                    إكتشف أهم مستلزمات الرجال في العصر الحديث
                                  </p>
                                  <p>{category.Name}</p>
                                  <Link
                                    href={"category/" + category.CategoryID}
                                    as={`/category/${category.CategoryID}`}
                                    className="listed-desc"
                                    style={{
                                      textDecoration: "none",
                                      color: "unset",
                                    }}
                                  >
                                    <button className="btn">
                                      إكتشف المزيد
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </Col>
                            <Col md={{ span: 6 }} className="p-0 ">
                              <div className="subcategory-content">
                                <div className="subcategory-container">
                                  <ul className="group-list list-unstyled">
                                    <li>أبرز المجموعات</li>
                                    <li>مجموعات إيطاليه نادره</li>
                                    <li>مجموعات إيطاليه نادره</li>
                                  </ul>
                                  <ul className="subcategory-list list-unstyled">
                                    <li>
                                      <Link
                                        href={`/category/${category.CategoryID}`}
                                        className="listed-desc"
                                        style={{
                                          textDecoration: "none",
                                          color: "unset",
                                        }}
                                      >
                                        <p>إظهار الكل</p>
                                      </Link>
                                    </li>
                                    {category.subcategories.map(
                                      (subcategory, index) => (
                                        <li key={index}>
                                          <Link
                                            href={
                                              "category/" +
                                              category.CategoryID +
                                              "/subcategory/" +
                                              subcategory.SubcategoryID
                                            }
                                            className="listed-desc"
                                            style={{
                                              textDecoration: "none",
                                              color: "unset",
                                            }}
                                          >
                                            <p>{subcategory.arabic_name}</p>
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div className="social-links-container pb-4">
                                  <SocilaLinks text="تابعنا علي مواقع التواصل الإجتماعي" />
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    ) : null}
                  </li>
                ))}
            </ul>
          </Col>
          <Col md={{ span: 1, offset: 1 }}>
            {cartData && (
              <div
                className="nav-cart"
                id="nav-cart"
                onClick={() => {
                  setShowCartAside(!showCartAside);
                }}
              >
                <div className="price-container">
                  <div className="price">
                    <div>ر.س</div>
                    {cartData.cart?.priceAfterDiscount > 0 ? (
                      <div>
                        {Number(cartData.cart?.priceAfterDiscount) + 25}
                      </div>
                    ) : cartData.cart?.priceBeforeDiscount > 0 ? (
                      <div>
                        {Number(cartData.cart?.priceBeforeDiscount) + 25}
                      </div>
                    ) : (
                      <div>0</div>
                    )}
                  </div>
                  <div className="cart-icon">
                    <IoCartOutline className="text-3xl cart-icon-svg " />

                    {cartData.cartlengh >= 0 ? (
                      <motion.div
                        className="cart-circle"
                        key={cartData.cartlengh}
                        animate={{ scale: [1, 1.15, 1] }}
                      >
                        {cartData.cartlengh}
                      </motion.div>
                    ) : (
                      <div className="cart-circle">0</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
        <AnimatePresence>
          {showCartAside == true && (
            <CartAside
              setShowCartAside={setShowCartAside}
              cartData={cartData}
              showDeleteItemPopup={showDeleteItemPopup}
              handleDelete={handleDelete}
              setDeleteItemPopup={setDeleteItemPopup}
              onDeleteItemPopup={onDeleteItemPopup}
              ItemDelete={ItemDelete}
              setIsDeletePopupVisible={setIsDeletePopupVisible}
            />
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
}

import "./CartAside.css";
import Link from "next/link";
import DeletePopup from "../../Utilities/DeletePopup/DeletePopup";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
const CartAside = ({
  setShowCartAside,
  cartData,
  showDeleteItemPopup,
  handleDelete,
  setDeleteItemPopup,
  onDeleteItemPopup,
  ItemDelete,
  setIsDeletePopupVisible,
}) => {
  let asideRef = useRef(null);
  const [asideHeight, setAsideHeight] = useState(0);
  useEffect(() => {
    setAsideHeight(asideRef.current.offsetHeight);
  }, []);
  const sidebarVariants = {
    open: {
      clipPath: `circle(${asideHeight * 2 + 200}px at 345px -10px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
    closed: {
      clipPath: "circle(0px at 345px -10px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };
  const itemsVariants = {
    open: { y: 0, opacity: 1, transition: { duration: 1 } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.5 } },
  };
  return (
    <>
      <motion.aside
        className="cart-aside"
        ref={asideRef}
        variants={sidebarVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {cartData?.cartItems?.length > 0 ? (
          <>
            <motion.div
              className="products-container"
              style={{
                overflowY:
                  cartData?.cartItems?.length > 3 ? "scroll" : "hidden",
              }}
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.1,
                  },
                },
                closed: {},
              }}
            >
              {cartData?.cartItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="product-details-container"
                  variants={itemsVariants}
                >
                  <div className="image-container">
                    <img
                      loading="lazy"
                      src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${
                        item?.ProductID
                      }/${
                        item?.variant && item.variant?.ColorID
                          ? item.variant?.ColorID
                          : ""
                      }/${item?.product?.color_image?.main_photo[0]?.Image}`}
                      alt={item?.product?.Name}
                    />
                  </div>
                  <div className="product-details">
                    <h6>{item?.product?.Name}</h6>
                    {item?.ColorName && (
                      <div className="color">
                        <p>:اللـون</p>
                        <p>{item.ColorName}</p>
                      </div>
                    )}

                    {item?.size && (
                      <div className="size">
                        <p>:المقـاس</p>
                        <p>{item.size}</p>
                      </div>
                    )}
                    {item?.trademarkName && (
                      <div className="trademark">
                        <p>:العلامـة التجاريـة</p>
                        <p>{item.trademarkName}</p>
                      </div>
                    )}
                    <p className="price">
                      <p>السعـر</p>
                      <p>
                        <span>{item.price}</span>
                        <span>ر.س</span>
                      </p>
                    </p>
                  </div>
                  <div
                    className="delete"
                    onClick={() => {
                      onDeleteItemPopup(item, event),
                        setIsDeletePopupVisible(true);
                    }}
                  >
                    {/* <span className="icon-trash"></span> */}
                    <RiDeleteBinLine className="icon-trash cursor-pointer text-xl text-red-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="total">
              <span>سعر المنتجات + (20) مصاريف الشحن</span>
              <p className="total-price">
                {cartData.cart.priceAfterDiscount > 0 ? (
                  <span>{Number(cartData.cart.priceAfterDiscount) + 20}</span>
                ) : cartData.cart.priceBeforeDiscount > 0 ? (
                  <span>{Number(cartData.cart.priceBeforeDiscount) + 20}</span>
                ) : (
                  <span>0</span>
                )}
                <span>ر.س</span>
              </p>
            </div>
            <div className="btns">
              <button className="btn" onClick={() => setShowCartAside(false)}>
                متابعة التسوق
              </button>
              <button className="btn">
                <Link
                  style={{ color: "unset", textDecoration: "none" }}
                  href="/cart"
                  onClick={() => setShowCartAside(false)}
                >
                  سلتـي ({cartData.cartlengh})
                </Link>
              </button>
            </div>
          </>
        ) : (
          <div className="no-product-container">
            <div className="content">
              <h5>عربة التسوق فارغة</h5>
              <h6>إبدأ التسوق وإكتشف منتجاتنا الجديدة</h6>
            </div>
            <button className="btn" onClick={() => setShowCartAside(false)}>
              متابعة التسوق
            </button>
          </div>
        )}
      </motion.aside>
      {showDeleteItemPopup == true && (
        <DeletePopup
          title={ItemDelete?.product?.Name}
          onDelete={() => {
            handleDelete(ItemDelete?.CartItemID),
              setIsDeletePopupVisible(false);
          }}
          onClose={() => {
            setDeleteItemPopup(false), setIsDeletePopupVisible(false);
          }}
        />
      )}
    </>
  );
};

export default CartAside;

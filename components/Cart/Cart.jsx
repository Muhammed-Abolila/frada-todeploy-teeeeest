"use client";
import "./Cart.css";
import { Row, Col, Container } from "react-bootstrap";
import NoProduct from "../Utilities/NoProduct/NoProduct";
// import CartHook from "../../src/customHooks/CartHooks/CartHook";
import LoadingPage from "../Utilities/LoadingPage/LoadingPage";
import DeletePopup from "../Utilities/DeletePopup/DeletePopup";
import Payment from "./CartAtoms/Payment/Payment";
import Coupon from "./CartAtoms/Coupon/Coupon";
import CartLoginForm from "./CartAtoms/CartLoginForm/CartLoginForm";
import CartRegisterForm from "./CartAtoms/CartRegisterForm/CartRegisterForm";
import CartItems from "./CartAtoms/CartItems/CartItems";
import CartSteps from "./CartAtoms/CartSteps/CartSteps";
import Shipping from "./CartAtoms/Shipping/Shipping";
import NotifyComp from "../Utilities/NotifyComp/NotifyComp";
import CartHook from "@/app/customHooks/CartHooks/CartHook";
export default function Cart() {
  const [
    cartItems,
    cartSingleItems,
    cartCollctionItems,
    cartLength,
    cartReload,
    setCartReload,
    onDeleteItemPopup,
    showTabbyCard,
    setShowTabbyCard,
    handleQuantityChange,
    step,
    setStep,
    token,
    showForm,
    setShowForm,
    shippingCity,
    deliveryComment,
    setDeliveryComment,
    setShippingAddress,
    setShippingCity,
    addCoupon,
    couponName,
    onCouponChange,
    choosePaymentMethod,
    createOrder,
    regectedOrder,
    showDeleteItemPopup,
    ItemDelete,
    handleDelete,
    setDeleteItemPopup,
    notify,
    globalIndex,
  ] = CartHook();
  return (
    <>
      {cartItems ? (
        <div className="cart-page">
          <Container>
            {cartItems && cartItems?.cartItems?.length > 0 ? (
              <>
                <div className="cart-content">
                  <Row>
                    <Col className="col-12 col-lg-7">
                      <CartItems
                        cartItems={cartItems}
                        cartSingleItems={cartSingleItems}
                        cartCollctionItems={cartCollctionItems}
                        onDeleteItemPopup={onDeleteItemPopup}
                        setShowTabbyCard={setShowTabbyCard}
                        handleQuantityChange={handleQuantityChange}
                        globalIndex={globalIndex}
                      />
                    </Col>
                    <Col className="col-12 col-sm-8 offset-sm-2 col-lg-5 offset-lg-0">
                      <div className="right">
                        {/*steps */}
                        <CartSteps step={step} setStep={setStep} />
                        {/*form */}
                        {step == 1 && (
                          <div
                            className="login-register-cart"
                            style={{
                              display: token == undefined ? "block" : "block",
                            }}
                          >
                            {showForm == "login" ? (
                              <CartLoginForm setShowForm={setShowForm} />
                            ) : (
                              <CartRegisterForm setStep={setStep} />
                            )}
                          </div>
                        )}
                        {/*shipping */}
                        {step == 2 && (
                          <Shipping
                            cartItems={cartItems}
                            shippingCity={shippingCity}
                            setStep={setStep}
                            deliveryComment={deliveryComment}
                            setDeliveryComment={setDeliveryComment}
                            setShippingAddress={setShippingAddress}
                            setShippingCity={setShippingCity}
                          />
                        )}
                        {step == 3 && (
                          <div>
                            {notify.msg != "" && <NotifyComp notify={notify} />}
                            {/* Start Coupon */}
                            <Coupon
                              addCoupon={addCoupon}
                              setShowTabbyCard={setShowTabbyCard}
                              couponName={couponName}
                              onCouponChange={onCouponChange}
                            />
                            {/* End Coupon */}
                            {/* start pay */}
                            <Payment
                              choosePaymentMethod={choosePaymentMethod}
                              showTabbyCard={showTabbyCard}
                              setShowTabbyCard={setShowTabbyCard}
                              regectedOrder={regectedOrder}
                              cartItems={cartItems}
                              createOrder={createOrder}
                              setStep={setStep}
                            />
                            {/* end pay */}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              <NoProduct text="لا يوجد منتجات في السلة" />
            )}
          </Container>
          {showDeleteItemPopup == true && (
            <DeletePopup
              title={
                ItemDelete?.product
                  ? ItemDelete?.product?.Name
                  : ItemDelete.CollectionName
              }
              onDelete={() => handleDelete(ItemDelete?.CartItemID)}
              onClose={() => setDeleteItemPopup(false)}
            />
          )}
          {/* {TelrUrl != null && */}
          <div className="telr-frame">
            {/* <iframe src="https://secure.telr.com/gateway/process.html?o=F2B026BD53B7F9A91F4BB49B69D7ADD850C3C154F1E42B6E320A3CF48ECE637D" title="description"></iframe> */}
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

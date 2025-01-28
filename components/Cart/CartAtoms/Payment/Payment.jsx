import "./Payment.css";
import TabbyCheckout from "../../../Tabby/TabbyCheckout/TabbyCheckout";
import madaLogo from "../../../../public/Images/new/payment method/madaLogo.svg";
import masterCardLogo from "../../../../public/Images/new/payment method/masterCardLogo.svg";
import visaLogo from "../../../../public/Images/new/payment method/visaLogo.svg";
import applePayLogo from "../../../../public/Images/new/payment method/applePayLogo.svg";
import tabbyLogo from "../../../../public/Images/new/payment method/tabby-badge.svg";
import Image from "next/image";
const Payment = ({
  choosePaymentMethod,
  showTabbyCard,
  setShowTabbyCard,
  regectedOrder,
  cartItems,
  createOrder,
  setStep,
}) => {
  return (
    <div className="payment-methods-container">
      <h6>الدفع عن طريق</h6>
      <div className="cart-payment-methods">
        <div className="telr-container">
          <input
            style={{ cursor: "pointer" }}
            type="radio"
            id="telr"
            name="payment"
            value="telr"
            onClick={() => {
              choosePaymentMethod("telr"), setShowTabbyCard(false);
            }}
          />
          <label htmlFor="telr">
            <div className="payment-methods-telr-logos flex">
              <Image src={visaLogo} />
              <Image src={masterCardLogo} />
              <Image src={madaLogo} />
            </div>
          </label>
        </div>
        <div className="applePay-container">
          <input
            style={{ cursor: "pointer" }}
            type="radio"
            id="apple"
            name="payment"
            value="apple"
            onClick={() => {
              choosePaymentMethod("apple"), setShowTabbyCard(false);
            }}
          />
          <label htmlFor="apple">
            <div className="payment-method-apple-logo">
              <Image src={applePayLogo} />
            </div>
          </label>
        </div>
        <div className="tabby-container">
          <input
            style={{ cursor: "pointer" }}
            type="radio"
            id="tabby"
            name="payment"
            value="tabby"
            onClick={() => {
              choosePaymentMethod("tabby"), setShowTabbyCard(true);
            }}
            disabled={regectedOrder == null ? false : true}
          />
          <label htmlFor="tabby">
            <div className="payment-method-tabby-logo">
              <Image src={tabbyLogo} />
              <div className="tabby-text">
                .قسّمها على 4. بدون أي فوائد، أو رسوم
              </div>
            </div>
          </label>
        </div>
        {regectedOrder != null && (
          <p className="tabby-regected">{regectedOrder}</p>
        )}
        {showTabbyCard == true && (
          <div className="tabby-card-container">
            <TabbyCheckout
              price={
                cartItems.cart.priceAfterDiscount > 0
                  ? Number(cartItems.cart.priceAfterDiscount) + 25
                  : Number(cartItems.cart.priceBeforeDiscount) + 25
              }
            />
          </div>
        )}
      </div>
      <div className="confirm">
        <button className="btn" onClick={() => createOrder()}>
          إتمام الشراء
        </button>
        <span
          onClick={() => {
            setStep(2);
            choosePaymentMethod("");
          }}
        >
          الـرجــوع
        </span>
      </div>
    </div>
  );
};

export default Payment;

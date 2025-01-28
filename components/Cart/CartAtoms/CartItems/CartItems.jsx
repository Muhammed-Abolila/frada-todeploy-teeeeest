import "./CartItems.css";
import CartSingleItem from './CartItemsAtom/CartSingleItem/CartSingleItem';
import CartCollectionItem from './CartItemsAtom/CartCollectionItem/CartCollectionItem';
const CartItems = ({
  cartItems,
  cartSingleItems,
  cartCollctionItems,
  onDeleteItemPopup,
  setShowTabbyCard,
  handleQuantityChange,
  globalIndex,
}) => {
  return (
    <div className="cart-item">
      <div className="top">
        <h4>سلـــة المشتريـــات</h4>
        {cartItems?.firstOrder?.Type == "percentage" ? (
          <div className="disc">
            <span>لديك خصم</span>
            <span> {cartItems?.firstOrder?.Discount} </span>
            <span>لأول طلب</span>
          </div>
        ) : cartItems?.firstOrder?.Type == "Value" ? (
          <div className="disc">
            <span>لديك خصم</span>
            <span> {cartItems?.firstOrder?.Discount} ر.س </span>
            <span>لأول طلب</span>
          </div>
        ) : null}

        <div className="brdr"></div>
      </div>
      <CartSingleItem
        cartSingleItems={cartSingleItems}
        globalIndex={globalIndex}
        onDeleteItemPopup={onDeleteItemPopup}
        setShowTabbyCard={setShowTabbyCard}
        handleQuantityChange={handleQuantityChange}
      />
      <CartCollectionItem
      cartCollctionItems={cartCollctionItems}
      onDeleteItemPopup={onDeleteItemPopup}
      setShowTabbyCard={setShowTabbyCard}
      />
      <div className="cart-footer">
        <div className="tax">
          <h5>هذه الأسعار تشمل الضريبة</h5>
        </div>
        <div className="total">
          {cartItems?.firstOrder?.Type == "percentage" ? (
            <div className="disc">
              <span>لديك خصم</span>
              <span> {cartItems?.firstOrder?.Discount} </span>
              <span>لأول طلب</span>
            </div>
          ) : cartItems?.firstOrder?.Type == "Value" ? (
            <div className="disc">
              <span>لديك خصم</span>
              <span> {cartItems?.firstOrder?.Discount} ر.س </span>
              <span>لأول طلب</span>
            </div>
          ) : null}
          <div className="products-number">
            <h5>إجمالــي المنتجــات:</h5>(
            <span>{cartItems.cartItems.length}</span>
            <span>منتج</span>)
          </div>
          <div className="products-price">
            <h5>سعــر المنتجــات:</h5>(
            <span>{cartItems?.cart?.priceBeforeDiscount}</span>
            <span>ر.س</span>)
          </div>

          {cartItems.cart.priceAfterDiscount > 0 && (
            <>
              <div className="price-before">
                <h5>سعر المنتجات قبل الخصم:</h5>(
                <span>{cartItems.cart.priceBeforeDiscount}</span>
                <span>ر.س</span>)
              </div>

              <div className="discount">
                <h5>قسيمــة الشـــراء</h5>
                {cartItems.cart.Discount.includes("%") ? (
                  <>
                    (<span>{cartItems.cart.Discount}</span>)
                  </>
                ) : (
                  <>
                    (<span>{cartItems.cart.Discount}</span>
                    <span>رس</span>)
                  </>
                )}
              </div>
            </>
          )}
          <div className="shipping-fees">
            <h5>مصاريــف الشحــن:</h5>
            <span>( 25 رس )</span>
          </div>
          <div className="total-price">
            <h5>إجمالــي سعر المنتجــات:</h5>
            {cartItems?.cart?.priceAfterDiscount > 0 ? (
              <>
                (<span>{Number(cartItems.cart.priceAfterDiscount) + 25}</span>
                <span>ر.س</span>)
              </>
            ) : (
              <>
                (<span>{Number(cartItems.cart.priceBeforeDiscount) + 25}</span>
                <span>ر.س</span>)
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

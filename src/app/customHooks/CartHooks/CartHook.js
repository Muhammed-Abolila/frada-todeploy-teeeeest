import { useState, useEffect } from "react";
import { Bounce, toast } from "react-toastify";
import NotificationComp from "../NotificationComp/NotificationComp";
import { useDispatch, useSelector } from "react-redux";
import { ChangeItemQuantity, DeleteCartItem, GetCartData, GetVariantItemsStock, MakeOrder } from "../../Redux/Actions/CartActions";
import { GetCoupon } from "../../Redux/Actions/CouponActions"
import { token } from "../../Redux/Types";
import NotifyHook from '../NotifyHook/NotifyHook';
import { deleteCookie, getCookie, setCookie } from "cookies-next";
const CartHook = () => {
  let pathName = getCookie("pathName");
// progress bar steps
const [step, setStep] = useState(1);
const [notify, setNotify] = NotifyHook();
let [cartReload, setCartReload] = useState(false);
let cartItems, cartLength;
//get cart items products
const [showDeleteItemPopup, setDeleteItemPopup] = useState(false);
const [ItemDelete, setItemDelete] = useState();
const [deliveryComment, setDeliveryComment] = useState("");
const dispatch = useDispatch();
useEffect(() => {
  const getCartData = async() => {
    try{
      await dispatch(GetCartData());
      setGlobalIndex(null)
    }catch(e){
      console.log(e)
    }
  };
  getCartData();
}, [cartReload]);
// Start Delete functions
const onDeleteItemPopup = (cart, event) => {
  event.preventDefault();
  setItemDelete(cart);
  setDeleteItemPopup(true);
};
const handleDelete = async (id) => {
  try {
    setCartReload(true);
    await dispatch(DeleteCartItem(id));
    setCartReload(false);
    setDeleteItemPopup(false);
  } catch (error) {
    console.error("Error deleting item:", error.message);
  }
};
// End Delete functions
// store cart item quantity
const[globalIndex,setGlobalIndex]=useState(null)
const ChangeQuantity = async (updateType, cart,index) => {
  let formData = {
    productID: cart.ProductID,
    variantID: cart.VariantID ? cart.VariantID : "",
    size: cart.size,
  };
  setGlobalIndex(index)
  setCartReload(true);
  await dispatch(ChangeItemQuantity(updateType, formData));
  setCartReload(false);
};
const handleQuantityChange = async (updateType, cart,index) => {
  if(updateType=="addItem"){
    ChangeQuantity(updateType, cart,index)
  }else if(updateType=="decreaseItem"){
    ChangeQuantity(updateType, cart,index)
  }
};
// Coupon Logic
const [couponName, setCouponName] = useState("");
// Get Coupon If User Insert Coupon Before
useEffect(() => {
  try {
    if (cartItems) {
      if (cartItems.cart.coupon != null) {
        setCouponName(cartItems.cart.coupon);
      } else {
        setCouponName("");
      }
    }
  } catch (e) {
    console.log(e);
  }
}, [cartItems]);
// On Client Insert Coupon Name
const onCouponChange = (e) => {
  setCouponName(e.target.value);
};
//On Client Click Add Coupon Button
const addCoupon = async () => {
  if (couponName == "") {
    setNotify({msg:"أدخل قيمة الكوبون", state:"error"});
  } else {
    try {
      let formData = {
        coupon: couponName,
      };
      setCartReload(true);
      await dispatch(GetCoupon(formData));
      setCartReload(false);
    } catch (e) {
      console.log(e);
    }
  }
};
// Start Shipping Address
const [shippindAddress, setShippingAddress] = useState();
const [shippingCity, setShippingCity] = useState();
const [showTabbyCard, setShowTabbyCard] = useState(false);
const [choosedPaymentMethod, setChoosedPaymentMethod] = useState("");
const choosePaymentMethod = (paymentMethod) => {
  setChoosedPaymentMethod(paymentMethod);
};
// End Shipping Address
const createOrder = async () => {
  if (choosedPaymentMethod == "") {
    setNotify({msg:"من فضلك إختر طريقة الدفع", state:"error"});
  } else {
    let formData = {
      ShippingFees: 20,
      ShippingAddress: shippindAddress,
      ShippingCity: shippingCity,
      DeliveryComments: deliveryComment,
    };
    await dispatch(MakeOrder(formData, choosedPaymentMethod));
  }
};
let response = useSelector((state) => state.CartReducer);
let regectedOrder = null;
let cartCollctionItems,cartSingleItems;
try {
  if (response.CartData?.data) {
    cartItems = response.CartData.data;
    cartCollctionItems=response.CartData.data.cartItems.filter((item)=>item.CollectionID)
    cartSingleItems=response.CartData.data.cartItems.filter((item)=>!item.CollectionID)
    cartLength = response.CartData.data.cartlengh;
  }
  if (response?.RegectedOrder?.data) {
    if (response?.RegectedOrder?.data?.errors) {
      regectedOrder = response?.RegectedOrder?.data?.errors;
    }
  }
} catch (e) {
  console.log(e);
}
useEffect(() => {
  if (regectedOrder != null) {
    setShowTabbyCard(false);
  }
}, [regectedOrder]);
async function catchToken() {
  if (window?.location?.search) {
    const urlParams = new URLSearchParams(window.location.search);
    let tokenCode = urlParams.get("token_code");
    if (tokenCode != null) {
      setCookie("access_token",tokenCode);
      window.location.href = `${pathName}`;
      deleteCookie("pathName");
    }
  }
}
useEffect(() => {
  catchToken();
}, []);
const [showForm, setShowForm] = useState("login");
useEffect(() => {
  if (token != undefined) {
    setStep(2);
  }
}, []);
  return[
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
    globalIndex
  ]
};
export default CartHook;

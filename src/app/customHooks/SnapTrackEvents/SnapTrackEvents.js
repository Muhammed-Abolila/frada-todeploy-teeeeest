import { getCookie } from "cookies-next";
const SnapTrackEvents = (
  event,
  qty,
  currency,
  price,
  Barcode,
  paymentInfoState,
  email,
  phone,
  transactionId,
  numberItems,
  state,
  firstname,
  lastname,
  city
) => {
  const trackingData = {
    uuid_c1: getCookie("session_id"),
  };
  if (qty) {
    trackingData.number_items = qty;
  }
  if (currency) {
    trackingData.currency = currency;
  }
  if (price) {
    trackingData.price = price;
  }
  if (Barcode) {
    trackingData.item_ids = [Barcode];
  }
  if (paymentInfoState) {
    trackingData.payment_info_available = paymentInfoState;
  }
  if (email) {
    trackingData.user_email = email;
  }
  if (phone) {
    trackingData.user_phone_number = phone;
  }
  if (transactionId) {
    trackingData.transaction_id = transactionId;
  }
  if (numberItems) {
    trackingData.number_items = numberItems;
  }
  if (state) {
    trackingData.success = state;
  }
  if (firstname) {
    trackingData.firstname = firstname;
  }
  if (lastname) {
    trackingData.lastname = lastname;
  }
  if (city) {
    trackingData.geo_city = city;
  }

  `snaptr("track",${event}, ${trackingData});`;
};
export default SnapTrackEvents;

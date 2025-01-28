import { Form, InputGroup } from "react-bootstrap";
import "./Coupon.css"
const Coupon = ({addCoupon,setShowTabbyCard,couponName,onCouponChange}) => {
  return (
    <div className="coupon">
      <h6>هل لديك قسيمة شراء؟</h6>
      <InputGroup className="mb-3">
        <InputGroup.Text
          id="basic-addon1"
          className="btn"
          onClick={() => {
            addCoupon(), setShowTabbyCard(false);
          }}
        >
          تطبيق القسيمة
        </InputGroup.Text>
        <Form.Control
          value={couponName}
          onChange={onCouponChange}
          placeholder="أدخل قسيمة الشراء"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </div>
  );
};

export default Coupon;

import "./CartSteps.css"
const CartSteps = ({step,setStep}) => {
  return (
    <div className="steps">
    <div className="progress_container">
      <div
        className="progress"
        style={{
          width:
            step === 1
              ? "0%"
              : step === 2
              ? "50%"
              : step === 3 && "91.5%",
        }}
      ></div>
      <div
        className={`circle ${
          (step === 1 || step === 2 || step === 3) &&
          "active"
        }`}
      >
        <span></span>
        <p>التسجيل</p>
      </div>
      <div
        className={`circle ${
          (step === 2 || step === 3) && "active"
        }`}
      >
        <span></span>
        <p>الشحن</p>
      </div>
      <div
        className={`circle ${step === 3 && "active"}`}
      >
        <span></span>
        <p>الدفع</p>
      </div>
    </div>
  </div>
  )
}

export default CartSteps
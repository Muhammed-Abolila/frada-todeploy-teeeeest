import "./DiscAlert.css"
const DiscAlert = ({disc}) => {
  return (
    <div className="discount-comp">
        <p>خصم</p>
        <p className="disc-number">{disc}%</p>
      </div>
  )
}

export default DiscAlert

import "./SubmitButton.css"
export const SubmitButton = ({title,loading}) => {
  return (
    <button className="submit-button" type="submit" disabled={loading} style={{border:loading?"1px solid #e0e0e0":"",backgroundColor:loading? "#e0e0e0":""}}>
      <span className="title" style={{visibility:loading?"hidden":"visible"}}>{title}</span>
      <span className="loader"style={{visibility:loading?"visible":"hidden"}}>Loading...</span>
    </button>
  )
}

import "./VisionAndMessage.css"
import AboutUsTitles from "../AboutUsTitles/AboutUsTitles"
export default function VisionAndMessage({title,text}){
    return(
        <div className="vision-message">
        <AboutUsTitles text={title} />
        <div className="vision-message-caption">
          <p>{text}</p>
        </div>
    </div>
    )
}
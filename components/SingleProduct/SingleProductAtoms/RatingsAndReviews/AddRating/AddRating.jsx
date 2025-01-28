import {useState } from "react";
import "./AddRating.css";
import ReactStars from "react-rating-stars-component";
import { useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { MakeReview } from "@/app/Redux/Actions/Ratings&ReviewsActions";
import NotificationComp from "@/app/customHooks/NotificationComp/NotificationComp";
const AddRating = ({ setShowAddRate,setReload,thisUserReview }) => {
  const params=useParams();
  const [Notify]=NotificationComp()
  const dispatch = useDispatch();
  const [newRate, setNewRate] = useState(thisUserReview?thisUserReview.Rating:0);
  const [comment, setComment] = useState(thisUserReview?thisUserReview.Comment:"");
  const maxCommentLength=250;
  const ratingChanged = (newRating) => {
    setNewRate(newRating);
  };
  const AddReviewFunc=async()=>{
    console.log("newRate",newRate)
    console.log("comment",comment)
    if(!newRate){
        Notify("يرجي وضع تقييم","error")
    }else if(!comment){
        Notify("يرجي كتابة تعليق","error");
    }else{
        let formData={
            ProductID:params.ProductID,
            Rating:newRate,
            Comment:comment
        }
        setReload(true);
        await dispatch(MakeReview(formData));
        setReload(false);
        setShowAddRate(false)
    }
  }
  return (
    <div className="add-rate-container">
      <div className="add-rate">
        <div className="rate">
          <ReactStars
            value={newRate}
            onChange={ratingChanged}
            size={40}
            isHalf={true}
            color="#c1c1c1"
            activeColor="#ffd700"
          />
        </div>
        <div className="review">
          <h6>أضف تعليقك</h6>
          <div className="review-text-container">
            <textarea
              placeholder="أضف تعليقك هنا"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={250}
              style={{border:comment!=undefined?comment.length>=maxCommentLength&&"1px solid red":"1px solid black"}}
            />
            <span className="review-counter">({maxCommentLength}/{comment!=undefined?comment.length:0})</span>
          </div>
        </div>
        <div className="btns">
          <button className="back-btn" onClick={() => setShowAddRate(false)}>
            إلغاء
          </button>
          <button className="add-btn" onClick={AddReviewFunc}>إضافة</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};
export default AddRating;

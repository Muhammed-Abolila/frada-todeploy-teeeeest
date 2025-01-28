import { ToastContainer } from "react-toastify";
import "./DeletePopup.css"
const DeletePopup = ({title,onDelete,onClose}) => {    
  return (
    <div className="delete-container">
          <div className="delete-content">
            <h5>تأكيد الحذف</h5>
            <div className="content">
                <div>هل تريد حذف</div>
                <div className="title">{title}</div>
                <div>بالفعل ؟</div> 
            </div>
            <div className="btns">
              <button className="save" onClick={onDelete}>تأكيد</button>
              <button className="close" onClick={onClose}>
                إغلاق
              </button>
            </div>
          </div>
          <ToastContainer/>
        </div>
  )
};
export default DeletePopup

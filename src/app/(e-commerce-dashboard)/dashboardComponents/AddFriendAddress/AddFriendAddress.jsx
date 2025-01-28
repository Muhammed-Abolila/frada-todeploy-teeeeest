import "./AddFriendAddress.css";
import { ToastContainer } from "react-toastify";

const AddFriendAddress = ({ setShowOverLay }) => {
  return (
    <div className="add-friend-container">
      <div className="add-friend-content">
        <h5>إضافه عنوان صديق جديد</h5>
        <form className="form-section">
          <div className="friend-info">
            <label>إسم الصديق</label>
            <input type="text" className="input-field" />
          </div>
          <div className="friend-info">
            <label>رقم الهاتف</label>
            <input type="text" className="input-field" />
          </div>
          <div className="friend-info">
            <div className="input-dashboard">
              <label>المدينة</label>
              <select className="input-field">
                <option value="">إختر مدينة</option>
                <option value="1">الرياض</option>
                <option value="2">جدة</option>
                <option value="3">الدمام</option>
              </select>
            </div>
          </div>
          <div className="friend-info">
            <label>عنوان الصديق بالتفصيل</label>
            <input type="text" className="input-field" />
          </div>
          <div className="btns">
            <button className="save" type="button">
              حفظ العنوان
            </button>
            <button
              className="close"
              type="button"
              onClick={() => setShowOverLay(false)}
            >
              إغلاق
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddFriendAddress;

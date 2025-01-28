import { ToastContainer } from "react-toastify";
import "../AddFriendAddress/AddFriendAddress.css";
// import { DashboardInput } from "../../../Utilities/FormAtoms/DashboardInput/DashboardInput";
import DashboardInput from "../../utilities/dashboardInput/DashboardInput";
import { useForm } from "react-hook-form";
import { updateFriend } from "../friendApis";
// import EdditFriendHook from "../../../../src/customHooks/DashboardHooks/FriendInfoHooks/EdditFriendHook/EdditFriendHook";
const EdditFriendAddress = ({
  singleFriendData,
  setShowEditPopup,
  friendDataReload,
  setFriendDataReload,
  friend,
}) => {
  // const [
  //   saudiCities,
  //   responseError,
  //   setResponseError,
  //   register,
  //   isDirty,
  //   errors,
  //   handleSubmit,
  //   onUpdateFriendData,
  //   onCloseEditPopup,
  // ] = EdditFriendHook(singleFriendData, setShowEditPopup, friendDataReload,setFriendDataReload);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await updateFriend(friend.ID, data);
  };
  return (
    <div className="add-friend-container">
      <div className="add-friend-content">
        <h5>تعديل بيانات الصديق</h5>
        <form className="form-section" onSubmit={handleSubmit(onSubmit)}>
          <div className="friend-info">
            <label>إسم الصديق</label>

            <input
              type="text"
              defaultValue={friend.Name}
              {...register("Name", {
                required: {
                  value: true,
                  message: "هذا الحقل مطلوب",
                },
              })}
            />
          </div>
          <div className="friend-info">
            <label>رقم الهاتف</label>

            <input
              type="text"
              defaultValue={friend.Phone}
              {...register("Phone", {
                required: {
                  value: true,
                  message: "هذا الحقل مطلوب",
                },
              })}
            />
          </div>
          <div className="friend-info">
            <div className="input-dashboard">
              <label>المدينة</label>
              <select
                {...register("CityID", {
                  required: "هذا الحقل مطلوب",
                })}
                defaultValue={friend.City}
              >
                <option>إختر مدينة</option>
                <option value={3}>القاهرة</option>
                <option value={9}>أسوان</option>
              </select>
              {/* {errors?.FriendCityId && (
                <>
                  <span className="icon-notice"></span>
                  <span className="error-msg">
                    {errors.FriendCityId?.message}
                  </span>
                </>
              )} */}
            </div>
          </div>
          <div className="friend-info">
            <label>عنوان الصديق بالتفصيل</label>

            <input
              type="text"
              defaultValue={friend.Address}
              {...register("Address", {
                required: {
                  value: true,
                  message: "هذا الحقل مطلوب",
                },
              })}
            />
          </div>
          <div className="btns">
            <button className="save" type="submit">
              حفظ التعديلات
            </button>
            <button
              className="close"
              // onClick={onCloseEditPopup

              // }
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

export default EdditFriendAddress;

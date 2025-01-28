import axios from "axios";
import NotificationComp from "../../../NotificationComp/NotificationComp";
import { API_URL, config } from "../../../../Redux/Types";
const DeleteFriendHook = (
  userDeleteFriend,
  setShowDeletePopup,
  friendDataReload,
  setFriendDataReload
) => {
  const [Notify] = NotificationComp();
  const onDeleteFriend = async () => {
    try {
      let response = await axios.delete(
        `${API_URL}/deleteGift/${userDeleteFriend.GiftAddressID}`,
        config
      );
      if (response.data.status == 200) {
        Notify("تم حذف عنوان الصديق بنجاح", "success");
        setFriendDataReload(!friendDataReload);
        setTimeout(() => {
          setShowDeletePopup(false);
        }, 600);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onCloseDeletePopup = e => {
    e.preventDefault();
    setShowDeletePopup(false);
  };
  return [onDeleteFriend, onCloseDeletePopup];
};

export default DeleteFriendHook;

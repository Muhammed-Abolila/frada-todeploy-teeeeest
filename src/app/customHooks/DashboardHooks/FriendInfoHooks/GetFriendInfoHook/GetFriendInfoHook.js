import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserFriendData } from "../../../../Redux/Actions/AddressesAction";
import { getCookie } from "cookies-next";
const GetFriendInfoHook = () => {
  let name=getCookie("userName")
  const dispatch = useDispatch()
  const [friendDataReload, setFriendDataReload] = useState(false);
  const [singleFriendData, setSingleFriendData] = useState(0);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [userDeleteFriend, setUserDeleteFriend] = useState(0);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  // get user Data
  useEffect(() => {
    dispatch(GetUserFriendData())
  }, [friendDataReload]);
  const FriendDataResponse = useSelector(state => state.AddressesReducer.UserFriendData);
  let FriendData = {}, userDataLength = 0;
  try {
    if (FriendDataResponse.data) {
      FriendData = FriendDataResponse.data;
      userDataLength = FriendDataResponse.data.gift_addresses.length;
    }
  } catch (e) {
    console.log(e);
  }
  const onEditPopup = (addresses) => {
    setSingleFriendData(addresses);
    setShowEditPopup(true);
  };
  const onDeletePopup = (addresses) => {
    setUserDeleteFriend(addresses)
    setShowDeletePopup(true)
  }
  const onAddPopup = () => {
    setShowAddPopup(true);
  };
  return [
    FriendData,onEditPopup, onDeletePopup, userDataLength, onAddPopup, showEditPopup,
    singleFriendData, setShowEditPopup,friendDataReload, setFriendDataReload,showDeletePopup, userDeleteFriend,
    setShowDeletePopup, showAddPopup, setShowAddPopup]
}

export default GetFriendInfoHook

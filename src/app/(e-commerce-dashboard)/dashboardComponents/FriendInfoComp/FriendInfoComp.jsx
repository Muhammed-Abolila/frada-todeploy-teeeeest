"use client";
import { useState } from "react";
import FormComp from "./friendInfoCompAtoms/FetchAndUpdateForms/FetchAndUpdateFormsAtoms/FormComp/FormComp";
import AddFriendAddress from "./AddFriendAddress/AddFriendAddress";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";
import NoProduct from "../../../../../components/Utilities/NoProduct/NoProduct";
import { getAllFriends } from "../../ServerActionsMethods/UserInfoMethods";

export default function FriendInfoComp({
  friendsData,
  cookieUserName,
  cities,
}) {
  const [hideAddNewFriend, setHideAddNewFriend] = useState(true);
  const [deleteError, setDeleteError] = useState(null);
  const [allFriends, setAllFriends] = useState(
    friendsData.data.GiftAddresses || []
  );

  console.log("all friends ❌ => ", allFriends);

  return (
    <div className="friend-profile-container">
      <div className="friend-profile-content m-1 md:m-3">
        <div className="friend-profile-container">
          <div className="friend-profile-content m-1 md:m-3">
            {allFriends && allFriends.length !== 0 ? (
              allFriends?.map((friend, index) => (
                <FormComp
                  friend={friend}
                  key={friend.ID}
                  cities={cities}
                  allFriends={allFriends}
                  setAllFriends={setAllFriends}
                />
              ))
            ) : (
              <NoProduct text="لا يوجد اصدقاء" />
            )}

            {deleteError && <p className="error">{deleteError}</p>}
            <button
              type="button"
              className="add-new-friend mt-2 py-2 px-4 float-start "
              onClick={() => setHideAddNewFriend(false)}
            >
              + أضف صديق جديد
            </button>
          </div>
          <ToastContainer />
        </div>
        {!hideAddNewFriend && (
          <AddFriendAddress
            hideAddNewFriend={hideAddNewFriend}
            setHideAddNewFriend={setHideAddNewFriend}
            cities={cities}
            allFriends={allFriends}
            setAllFriends={setAllFriends}
          />
        )}
      </div>
    </div>
  );
}

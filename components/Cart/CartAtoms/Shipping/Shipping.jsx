import "./Shipping.css";
import { useEffect, useState } from "react";
import { InputComp } from "../../../Utilities/FormAtoms/InputComp/InputComp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import { API_URL, config } from "../../../../src/Redux/Types";
import { setCookie } from "cookies-next";
// import AddFriendHook from "../../../../src/customHooks/DashboardHooks/FriendInfoHooks/AddFriendHook/AddFriendHook";
// import GetAndUpdateUserInfoHook from "../../../../src/customHooks/DashboardHooks/UserInfoHooks/GetAndUpdateUserInfoHook";
import GetFriendInfoHook from "@/app/customHooks/DashboardHooks/FriendInfoHooks/GetFriendInfoHook/GetFriendInfoHook";
import SnapTrackEvents from "@/app/customHooks/SnapTrackEvents/SnapTrackEvents";
import NotifyHook from "@/app/customHooks/NotifyHook/NotifyHook";
import NotifyComp from "../../../Utilities/NotifyComp/NotifyComp";
import { userInfoCartSchema } from "@/app/customHooks/Forms/Schema/FormsSchema";
import { API_URL ,config } from "@/app/Redux/Types";
import EdditFriendHook from "@/app/customHooks/DashboardHooks/FriendInfoHooks/EdditFriendHook/EdditFriendHook";
import AddFriendHook from "@/app/customHooks/DashboardHooks/FriendInfoHooks/AddFriendHook/AddFriendHook";
import GetAndUpdateUserInfoHook from "@/app/customHooks/DashboardHooks/UserInfoHooks/GetAndUpdateUserInfoHook";
const Shipping = ({
  cartItems,
  shippingCity,
  setStep,
  deliveryComment,
  setDeliveryComment,
  setShippingAddress,
  setShippingCity,
}) => {
  const [notify, setNotify] = NotifyHook();
  // userData Hook
  const [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    userData,
    setReloadUserInfo,
    reloadUserInfo,
    saudiCities,
  ] = GetAndUpdateUserInfoHook();
  // friend data Hook
  const [
    FriendData,
    onEditPopup,
    onDeletePopup,
    userDataLength,
    onAddPopup,
    showEditPopup,
    singleFriendData,
    setShowEditPopup,
    friendDataReload,
    setFriendDataReload,
    showDeletePopup,
    userDeleteFriend,
    setShowDeletePopup,
    showAddPopup,
    ,
  ] = GetFriendInfoHook();
  const [userAddress, setUserAddress] = useState();
  const [choosenAddress, setChoosenAddress] = useState("myAddress");
  const [selectedFriendIndex, setSelectedFriendIndex] = useState(0);
  const [friendAddress, setFriendAddress] = useState();
  const [shippingCityId, setShippingCityId] = useState(0);
  const onChangeAddress = (e) => {
    setChoosenAddress(e.target.value);
  };
  useEffect(() => {
    setUserAddress(userData);
    if (choosenAddress === "myAddress") {
      setFriendAddress();
      setUserAddress(userData);
    } else if (choosenAddress === "friendAddress") {
      setUserAddress();
      setFriendAddress(
        FriendData?.gift_addresses && FriendData?.gift_addresses[0]
      );
    }
  }, [choosenAddress, userData, FriendData?.gift_addresses]);
  // Select Friend Address
  const onSelectFriendAddress = (e) => {
    setSelectedFriendIndex(e.target.value);
    setFriendAddress(FriendData?.gift_addresses[e.target.value]);
    setShippingAddress(FriendData?.gift_addresses[e.target.value].Address);
    setShippingCity(FriendData?.gift_addresses[e.target.value]?.city?.nameAr);
    setShippingCityId(FriendData?.gift_addresses[e.target.value]?.city?.id);
  };
  useEffect(() => {
    if (choosenAddress === "myAddress") {
      setShippingAddress(userAddress?.Address);
      if (userAddress?.city) {
        setShippingCity(userAddress?.city?.nameAr);
        setShippingCityId(userAddress?.city?.id);
      }
    } else if (choosenAddress === "friendAddress") {
      setShippingAddress(friendAddress?.Address);
      setShippingCity(friendAddress?.city?.nameAr);
      setShippingCityId(friendAddress?.city?.id);
    }
  }, [userAddress, friendAddress]);
  const getShippingInfo = () => {
    if (
      userData.Address == null ||
      userData.CityID == null ||
      userData.FirstName == null ||
      userData.LastName == null ||
      userData.Phone == null ||
      userData.Email == null
    ) {
      setNotify({ msg: "من فضلك أكمل ملفك الشخصي", state: "error" });
    } else if (shippingCity == "" || shippingCity == undefined) {
      setNotify({ msg: "من فضلك إختر عنوان الشحن", state: "error" });
    } else {
      setStep(3);
      SnapTrackEvents(
        "START_CHECKOUT",
        cartItems.cartlengh,
        "KSA",
        "cartItems?.cart?.priceBeforeDiscount",
        null,
        0,
        userData.Email,
        userData.Phone,
        null,
        null,
        null,
        null,
        null,
        null
      );
    }
  };
  const [edditUserInfo, setEdditUserInfo] = useState(false);
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(userInfoCartSchema),
    defaultValues: {
      LastName: userAddress?.LastName,
      FirstName: userAddress?.FirstName,
      Phone: userAddress?.Phone,
      Address: userAddress?.Address,
      CityId: userAddress?.CityID,
      Email: userAddress?.Email,
    },
  });
  let userEmail = watch("Email");
  const [responseError, setResponseError] = useState("");
  // useEffect to reset data in useForm defaultValues
  useEffect(() => {
    if (userAddress) {
      reset({
        LastName: userAddress?.LastName,
        FirstName: userAddress?.FirstName,
        Phone: userAddress?.Phone,
        Address: userAddress?.Address,
        CityId: userAddress?.CityID,
        Email: userAddress?.Email,
      });
    }
  }, [userAddress]);
  const userInfoSubmit = async (data) => {
    let formData = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data?.Email,
      CityID: data.CityId,
      Address: data.Address,
      Phone: data.Phone,
    };
    try {
      let response = await axios.post(
        `${API_URL}/updateUser`,
        formData,
        config
      );
      if (response.data?.status == 201) {
        setNotify({ msg: "تم تعديل البيانات بنجاح", state: "success" });
        setTimeout(() => {
          setNotify({ msg: "" });
        }, 1000);
        setEdditUserInfo(false);
        reset();
        setShippingCityId(data.CityId);
        setCookie("firstName", response.data.data.FirstName, {
          maxAge: 60 * 60 * 24 * 7,
        }); //7 days
        setCookie("lastName", response.data.data.LastName, {
          maxAge: 60 * 60 * 24 * 7,
        });
        setResponseError("");
        setUserAddress(response.data.data);
        setReloadUserInfo(!reloadUserInfo);
      }
    } catch (e) {
      setResponseError(e.response?.data?.errors);
    }
  };
  // Eddit Friend Address
  const [edditFriendInfo, setEdditFriendInfo] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  const [
    edditFriendSaudiCities,
    edditFriendResponseError,
    edditFriendsetResponseError,
    edditFriendRegister,
    edditFriendIsDirty,
    edditFriendErrors,
    edditFriendHandleSubmit,
    onUpdateFriendData,
    onCloseEditPopup,
  ] = EdditFriendHook(
    friendAddress && friendAddress,
    setEdditFriendInfo,
    friendDataReload,
    setFriendDataReload,
    setFriendAddress
  );
  const [
    addFriendSaudiCities,
    addFriendRegister,
    addFriendIsDirty,
    addFriendErrors,
    addFriendHandleSubmit,
    sendFriendData,
    addFriendResponseError,
    addFriendSetResponseError,
    onCloseAddPopup,
  ] = AddFriendHook(setAddFriend, friendDataReload, setFriendDataReload);
  return (
    <div className="shipping">
      {notify.msg != "" && <NotifyComp notify={notify} />}
      <div className="address">
        <div className="radio-input">
          <input
            type="radio"
            name="shippingAddress"
            id="useAddress"
            value="myAddress"
            checked={choosenAddress == "myAddress" && true}
            onChange={onChangeAddress}
          />
          <label htmlFor="useAddress">إشحن الطلب إلي عنواني</label>
        </div>
        <div className="address-info-container">
          {userAddress && (
            <>
              <div className="top">
                <h5>بيانات الشحن</h5>
              </div>
              {edditUserInfo == false ? (
                <div className="address-info">
                  {userAddress.city == null ||
                  userAddress.Address == null ||
                  userAddress.LastName == null ||
                  userAddress.Phone == null ||
                  userAddress.Email == null ? (
                    <div className="no-data">
                      <span>لا يوجد بيانات</span>
                      <span>يرجي إكمال ملفك الشخصي </span>
                      <p
                        onClick={() => {
                          setEdditUserInfo(true), setNotify({ msg: "" });
                        }}
                      >
                        إكمال الملف الشخصي
                      </p>
                    </div>
                  ) : (
                    <>
                      <div
                        className="eddit-address"
                        onClick={() => setEdditUserInfo(!edditUserInfo)}
                      >
                        {edditUserInfo == false && <span>تعديل العنوان</span>}
                      </div>
                      <div className="info">
                        <div> الدولة</div>
                        <div>المملكة العربية السعودية</div>
                      </div>
                      <div className="info">
                        <div> الإسم</div>
                        <div>
                          {userAddress?.FirstName} {userAddress?.LastName}
                        </div>
                      </div>
                      <div className="info">
                        <div> المدينة</div>
                        <div>{userAddress?.city?.nameAr}</div>
                      </div>
                      <div className="info">
                        <div> العنوان</div>
                        <div>{userAddress.Address}</div>
                      </div>
                      <div className="info">
                        <div> الهاتف</div>
                        <div>{userAddress.Phone}</div>
                      </div>
                      <div className="alert-warnning">
                        <span>يصل خلال </span>
                        <span>{shippingCityId == 3 ? "1" : "4"}</span>
                        <span> أيام عمل</span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit(userInfoSubmit)}>
                  <div
                    className="eddit-address"
                    onClick={() => setEdditUserInfo(!edditUserInfo)}
                  >
                    {edditUserInfo == true && <span>إلغاء التعديل</span>}
                  </div>
                  <div className="input-container">
                    <label>:البريد الإلكتروني</label>
                    <InputComp
                      register={register}
                      registerValue={"Email"}
                      placeholder={"البريد الإلكتروني"}
                      inputType="text"
                      readOnly={userAddress?.Email !== null}
                      errors={errors.Email}
                      responseError={responseError?.Email}
                    />
                  </div>
                  <div className="input-container">
                    <label>:الإسم الأول</label>
                    <InputComp
                      register={register}
                      registerValue={"FirstName"}
                      placeholder={"الإسم الأول"}
                      inputType="text"
                      errors={errors.FirstName}
                      responseError={responseError?.FirstName}
                    />
                  </div>
                  <div className="input-container">
                    <label>:إسم العائلة</label>
                    <InputComp
                      register={register}
                      registerValue={"LastName"}
                      placeholder={"إسم العائلة"}
                      inputType="text"
                      errors={errors.LastName}
                      responseError={responseError?.LastName}
                    />
                  </div>
                  <div className="input-container">
                    <label>:رقم الهاتف</label>
                    <InputComp
                      register={register}
                      registerValue={"Phone"}
                      placeholder={"رقم الهاتف"}
                      inputType="text"
                      readOnly={userAddress?.Phone !== null}
                      errors={errors.Phone}
                      responseError={responseError?.Phone}
                    />
                   
                  </div>
                  <div className="input-container city-container">
                    <label>:المدينة</label>
                    <select
                      {...register("CityId", { valueAsNumber: true })}
                      style={{
                        border: errors?.CityId
                          ? "0.0625rem solid #b00020"
                          : "0.0625rem solid #e0e0e0",
                      }}
                    >
                      <option value="">إختر مدينة</option>
                      {saudiCities &&
                        saudiCities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.nameAr}
                          </option>
                        ))}
                    </select>
                    {errors?.CityId && (
                      <>
                        <span className="icon-notice"></span>
                        <span className="error-msg">
                          {errors?.CityId?.message}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="input-container">
                    <label>:العنوان</label>
                    <InputComp
                      register={register}
                      registerValue={"Address"}
                      placeholder={"العنوان بالتفصيل"}
                      inputType="text"
                      errors={errors.Address}
                      responseError={responseError?.Address}
                    />
                  </div>
                  <div className="btn-container">
                    <button
                      type="submit"
                      disabled={!isDirty}
                      style={{
                        pointerEvents: isDirty ? "all" : "none",
                        opacity: isDirty ? "1" : ".4",
                      }}
                    >
                      حفظ التعديلات
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      <div className="address">
        <div className="friend-address-inputs">
          <div className="radio-input">
            <input
              type="radio"
              name="shippingAddress"
              id="friendAddress"
              value="friendAddress"
              checked={choosenAddress == "friendAddress" && true}
              onChange={onChangeAddress}
            />
            <label htmlFor="friendAddress">إشحن الطلب إلي عنوان صديق</label>
          </div>
        </div>

        {choosenAddress == "friendAddress" && (
          <div className="address-info-container">
            {FriendData?.gift_addresses?.length > 0 ? (
              <>
                {edditFriendInfo == false ? (
                  <>
                    {friendAddress && addFriend == false && (
                      <>
                        <div className="top">
                          <h5>بيانات مستلم الشحنة</h5>
                        </div>

                        <div className="address-info">
                          <div
                            className="eddit-address"
                            onClick={() => setEdditFriendInfo(!edditFriendInfo)}
                          >
                            {edditFriendInfo == false && (
                              <span>تعديل عنوان الصديق</span>
                            )}
                          </div>
                          <div className="info">
                            <div> الدولة</div>
                            <div>المملكة العربية السعودية</div>
                          </div>
                          <div className="info">
                            <div> الإسم</div>
                            <div>{friendAddress.Name}</div>
                          </div>
                          <div className="info">
                            <div> المدينة</div>
                            <div>{friendAddress?.city?.nameAr}</div>
                          </div>
                          <div className="info">
                            <div> العنوان</div>
                            <div>{friendAddress.Address}</div>
                          </div>
                          <div className="info">
                            <div> الهاتف</div>
                            <div>{friendAddress.Phone}</div>
                          </div>
                          <div className="alert-warnning">
                            <span>يصل خلال </span>
                            <span>{friendAddress.CityID == 3 ? "1" : "4"}</span>
                            <span> أيام عمل</span>
                          </div>
                          <div className="address-info-footer">
                            {FriendData?.gift_addresses.length < 4 ? (
                              <button onClick={() => setAddFriend(true)}>
                                إضافة صديق
                              </button>
                            ) : (
                              <div></div>
                            )}
                            {FriendData?.gift_addresses.length > 0 && (
                              <select
                                className="addresses"
                                value={selectedFriendIndex}
                                onChange={onSelectFriendAddress}
                              >
                                {FriendData?.gift_addresses.map(
                                  (friend, index) => (
                                    <option key={index} value={index}>
                                      {friend.Name}
                                    </option>
                                  )
                                )}
                              </select>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <form onSubmit={edditFriendHandleSubmit(onUpdateFriendData)}>
                    <div
                      className="eddit-address"
                      onClick={() => setEdditFriendInfo(!edditFriendInfo)}
                    >
                      {edditFriendInfo == true && <span>إلغاء التعديل</span>}
                    </div>
                    <div className="input-container">
                      <label>:إسم الصديق</label>
                      <InputComp
                        register={edditFriendRegister}
                        registerValue={"friendName"}
                        placeholder={"أدخل إسم الصديق"}
                        inputType="text"
                        errors={edditFriendErrors.friendName}
                        responseError={
                          edditFriendResponseError?.errors?.friendName
                        }
                      />
                    </div>
                    <div className="input-container">
                      <label>:رقم الهاتف</label>
                      <InputComp
                        register={edditFriendRegister}
                        registerValue={"friendPhone"}
                        placeholder={"أدخل رقم الهاتف"}
                        inputType="text"
                        errors={edditFriendErrors.friendPhone}
                        responseError={
                          edditFriendResponseError?.errors?.friendPhone
                        }
                      />
                    </div>
                    <div className="input-container city-container">
                      <label>:المدينة</label>
                      <select
                        {...edditFriendRegister("FriendCityId", {
                          valueAsNumber: true,
                        })}
                        style={{
                          border: edditFriendErrors?.FriendCityId
                            ? "0.0625rem solid #b00020"
                            : "0.0625rem solid #e0e0e0",
                        }}
                      >
                        <option value="">إختر مدينة</option>
                        {saudiCities &&
                          saudiCities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.nameAr}
                            </option>
                          ))}
                      </select>
                      {edditFriendErrors?.FriendCityId && (
                        <>
                          <span className="icon-notice"></span>
                          <span className="error-msg">
                            {edditFriendErrors?.FriendCityId?.message}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="input-container">
                      <label>:العنوان</label>
                      <InputComp
                        register={edditFriendRegister}
                        registerValue={"friendAddress"}
                        placeholder={"العنوان بالتفصيل"}
                        inputType="text"
                        errors={edditFriendErrors?.friendAddress}
                        responseError={
                          edditFriendResponseError?.errors?.friendAddress
                        }
                      />
                    </div>
                    <div className="btn-container">
                      <button
                        disabled={!edditFriendIsDirty}
                        style={{
                          pointerEvents: edditFriendIsDirty ? "all" : "none",
                          opacity: edditFriendIsDirty ? "1" : ".4",
                        }}
                      >
                        حفظ التعديلات
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <>
                {addFriend == false && (
                  <div className="address-info">
                    <div className="no-data">
                      <span>لايوجد عناوين لأصدقائك</span>
                      <p onClick={() => setAddFriend(true)}>قم بإضافة صديق</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {addFriend == true && (
              <div className="add-friend">
                <form onSubmit={addFriendHandleSubmit(sendFriendData)}>
                  <div className="input-container">
                    <label>:إسم الصديق</label>
                    <InputComp
                      register={addFriendRegister}
                      registerValue={"friendName"}
                      placeholder={"أدخل إسم الصديق"}
                      inputType="text"
                      errors={addFriendErrors.friendName}
                      responseError={
                        edditFriendResponseError?.errors?.friendName
                      }
                    />
                  </div>
                  <div className="input-container">
                    <label>:رقم الهاتف</label>
                    <InputComp
                      register={addFriendRegister}
                      registerValue={"friendPhone"}
                      placeholder={"أدخل رقم الهاتف"}
                      inputType="text"
                      errors={addFriendErrors.friendPhone}
                      responseError={
                        edditFriendResponseError?.errors?.friendPhone
                      }
                    />
                  </div>
                  <div className="input-container city-container">
                    <label>:المدينة</label>
                    <select
                      {...addFriendRegister("FriendCityId", {
                        valueAsNumber: true,
                      })}
                      style={{
                        border: addFriendErrors?.FriendCityId
                          ? "0.0625rem solid #b00020"
                          : "0.0625rem solid #e0e0e0",
                      }}
                    >
                      <option value="">إختر مدينة</option>
                      {saudiCities &&
                        saudiCities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.nameAr}
                          </option>
                        ))}
                    </select>
                    {addFriendErrors?.FriendCityId && (
                      <>
                        <span className="icon-notice"></span>
                        <span className="error-msg">
                          {addFriendErrors?.FriendCityId?.message}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="input-container">
                    <label>:العنوان</label>
                    <InputComp
                      register={addFriendRegister}
                      registerValue={"friendAddress"}
                      placeholder={"العنوان بالتفصيل"}
                      inputType="text"
                      errors={addFriendErrors?.friendAddress}
                      responseError={
                        edditFriendResponseError?.errors?.friendAddress
                      }
                    />
                  </div>
                  <div className="btn-container">
                    <button
                      disabled={!addFriendIsDirty}
                      style={{
                        pointerEvents: addFriendIsDirty ? "all" : "none",
                        opacity: addFriendIsDirty ? "1" : ".4",
                      }}
                    >
                      الإضافة
                    </button>
                    <p className="btn" onClick={() => setAddFriend(false)}>
                      الرجوع
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      <textarea
        placeholder="إترك رسالة للمندوب"
        value={deliveryComment}
        onChange={(e) => setDeliveryComment(e.target.value)}
      ></textarea>

      <div className="btn-container">
        <button className="btn" onClick={() => getShippingInfo()}>
          التقدم للدفع
        </button>
      </div>
    </div>
  );
};

export default Shipping;

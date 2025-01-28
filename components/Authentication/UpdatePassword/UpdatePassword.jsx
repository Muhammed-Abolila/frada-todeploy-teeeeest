"use client";
import axios from "axios";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./updatePassword.css";
import { API_URL ,token } from "@/app/Redux/Types";


const UpdatePassword = () => {
  // new Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmCurrentPassword, setconfirmCurrentPassword] = useState("");
  const [ErrMsg, setErrMsg] = useState([]);
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/updatePassword?current_password=${currentPassword}&new_password=${newPassword}&confirm_password=${confirmCurrentPassword}&token=${token}`
      );
      if (response.status === 200) {
        toast.success("تم تغيير كلمة السر بنجاح", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        // empty inputs fields & errMsg
        setCurrentPassword("");
        setNewPassword("");
        setconfirmCurrentPassword("");
        setErrMsg("");
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setErrMsg(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleUpdatePassword}
        style={{
          width: "100%",
          height: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="update">
          <h2>قم بإنشاء كلمة سر جديدة</h2>
          <div className="form-input">
            <div className="input-content">
              <label>كلمة السر الحالية</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              {ErrMsg?.current_password ? (
                <p className="danger">{ErrMsg.current_password[0]}</p>
              ) : (
                ""
              )}
            </div>
            <div className="input-content">
              <label>كلمة السر الجديدة</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {ErrMsg?.new_password ? (
                <p className="danger">{ErrMsg.new_password[0]}</p>
              ) : (
                ""
              )}
            </div>
            <div className="input-content">
              <label>تأكيد كلمة السر الجديدة</label>
              <input
                type="password"
                value={confirmCurrentPassword}
                onChange={(e) => setconfirmCurrentPassword(e.target.value)}
              />
              {ErrMsg?.confirm_password ? (
                <p className="danger">{ErrMsg.confirm_password[0]}</p>
              ) : (
                ""
              )}
            </div>
            <div className="strong-password"></div>
            <div className="submit">
              <button>حفظ</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdatePassword;

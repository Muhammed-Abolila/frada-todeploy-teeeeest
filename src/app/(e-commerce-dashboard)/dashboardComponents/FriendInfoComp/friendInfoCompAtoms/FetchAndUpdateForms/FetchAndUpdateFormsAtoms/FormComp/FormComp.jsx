"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import SelectCity from "../SelectCity/SelectCity";
import { freindDataSchema } from "@/app/(e-commerce-dashboard)/schemas";
import { DashboardInput } from "@/app/(e-commerce-dashboard)/dashboardComponents/utilities/DashboardInput/DashboardInput";
import {
  deleteFriend,
  updateFriend,
} from "@/app/(e-commerce-dashboard)/ServerActionsMethods/UserInfoMethods";
import { getCookie } from "cookies-next";

const token = getCookie("access_token");
export let config;
try {
  if (token) {
    config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }
} catch (e) {
  console.log(e);
}

export default function FormComp({
  friend,
  cities,
  allFriends,
  setAllFriends,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(freindDataSchema),
    defaultValues: {
      Name: friend.Name,
      Phone: friend.Phone,
      CityID: friend.CityID,
      Address: friend.Address,
    },
  });
  const [editingFriendId, setEditingFriendId] = useState(null);
  const onSubmit = async (formData) => {
    try {
      const response = await updateFriend(editingFriendId, formData, config);
    } catch (error) {
      console.error("خطأ في الاتصال بالخادم:", error);
    }
  };

  async function callDeleteFriend() {
    const updatedFriends = [...allFriends];

    await deleteFriend(friend.ID, config);

    const test = updatedFriends.filter((item) => {
      return item.ID != friend.ID;
    });

    setAllFriends(test);
  }

  return (
    <form
      className="w-full lg:w-[1000px] xl:w-[1200px] m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="wraper-form-container shadow-md flex my-[30px] lg:pr-[40px]">
        <div className="add-delete-friend-btns">
          {editingFriendId === friend.ID ? (
            <>
              <button
                className="save text-sm md:text-md"
                onClick={() => {
                  setEditingFriendId(null);
                }}
              >
                حفظ التعديلات
              </button>
              <div
                className="button close text-sm md:text-md"
                onClick={() => setEditingFriendId(null)}
              >
                إغلاق
              </div>
            </>
          ) : (
            <>
              <div
                className="button delete-friend hover:bg-orange hover:text-white transition duration-300 text-sm md:text-md"
                onClick={() => callDeleteFriend()}
              >
                حذف 
              </div>
              <div
                className="button  hover:bg-orange hover:text-white transition duration-300 text-sm md:text-md"
                onClick={() => setEditingFriendId(friend.ID)}
              >
                تعديل العنوان
              </div>
            </>
          )}
        </div>
        <div className="form-container">
          <div className="customer-info">
            <label className="text-sm md:text-md">إسم الصديق</label>
            <DashboardInput
              type={"text"}
              Name="Name"
              register={register}
              errors={errors}
              isReadOnly={
                editingFriendId == null && editingFriendId !== friend?.ID
              }
            />
          </div>
          <div className="customer-info">
            <label className="text-sm md:text-md">رقم الهاتف</label>
            <DashboardInput
              type={"number"}
              Name="Phone"
              register={register}
              errors={errors}
              isReadOnly={
                editingFriendId == null && editingFriendId !== friend?.ID
              }
            />
          </div>
          <div className="customer-info">
            <label className="text-sm md:text-md">المدينة</label>
            {editingFriendId === friend.ID ? (
              <SelectCity
                Name="CityID"
                register={register}
                errors={errors}
                cities={cities}
              />
            ) : (
              <input
                type="text"
                value={friend.City}
                readOnly
                className="mt-[0.3rem]"
              />
            )}
          </div>
          <div className="customer-info">
            <label className="text-sm md:text-md">عنوان الصديق بالتفصيل</label>
            <DashboardInput
              type={"text"}
              Name="Address"
              register={register}
              errors={errors}
              isReadOnly={
                editingFriendId == null && editingFriendId !== friend?.ID
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
}

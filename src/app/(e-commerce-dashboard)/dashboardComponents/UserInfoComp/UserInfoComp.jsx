"use client";
import "./UserInfoComp.css";
import { ToastContainer } from "react-toastify";
import { DashboardInput } from "../utilities/DashboardInput/DashboardInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import {getCities_serverMethods ,
//         GetUserData_serverMethods,
//         UpdateUserData_serverMethods  } from "@/app/ServerActionsMethods/UserInfoMethods";
//  I maked changes in this file and DashboardInput file onley
//  I create some files :
//    1- NotificationComp
//    2- LoadingPage
//    3- convirt all methods to server methods
//    4- remove axios and use fetch

const userInfoSchema = z.object({
  FirstName: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل الإسم الأول" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  LastName: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل إسم العائلة" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  Phone: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل رقم الهاتف" })
    .regex(/^05\d{8}$/, {
      message: "يجب أن يكون رقم الهاتف سعودي",
    }),
  Address: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل العنوان" })
    .regex(/^[a-zA-Z\u0600-\u06FF0-9\s-]+$/, {
      message: "أدخل قيمة صالحة",
    }),
  CityID: z.number({ message: "إختر المدينة" }),
});

import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import LoadingPage from "../utilities/LoadingPage/LoadingPage";
import NotificationComp from "@/app/customHooks/NotificationComp/NotificationComp";
import {
  getCities_serverMethods,
  GetUserData_serverMethods,
  UpdateUserData_serverMethods,
} from "../../ServerActionsMethods/UserInfoMethods";

const token = getCookie("access_token");
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export default function UserInfoComp() {
  const responseError = {};
  const setResponseError = () => {};
  const [userName, setUserName] = useState();
  const [saudiCities, setSaudiCities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Notify] = NotificationComp();
  const [userData, setUserData] = useState();

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      FirstName: userData?.FirstName,
      LastName: userData?.LastName,
      Phone: userData?.Phone,
      Address: userData?.Address,
      CityID: userData?.CityID,
      Email: userData?.Email,
    },
  });

  const UpdateUserData = async (data) => {
    let formData = {
      FirstName: data?.FirstName,
      LastName: data?.LastName,
      Email: data?.Email,
      CityID: data?.CityID,
      Address: data?.Address,
      Phone: data?.Phone,
    };

    try {
      const result = await UpdateUserData_serverMethods(
        API_URL,
        formData,
        config
      );
      console.log("response => ", result);

      if (result.status == 201) {
        Notify("تم تعديل البيانات بنجاح", "success");

        setCookie("firstName", formData.FirstName, {
          maxAge: 60 * 60 * 24 * 7,
        }); // 7 days
        setCookie("lastName", formData.LastName, {
          maxAge: 60 * 60 * 24 * 7,
        });

        setUserName(`${formData.FirstName} ${formData.LastName}`);
        setResponseError("");
        setUserData(data);

        reset(data);
      }
    } catch (e) {
      console.log(e);
      setResponseError(e.response?.data);
    }
  };

  const GetUserData = async () => {
    setLoading(true);
    let response;
    try {
      const result = await GetUserData_serverMethods(API_URL, config);
      if (result.data) {
        const data = result.data;
        setUserData(data);
        reset({
          FirstName: data?.FirstName,
          LastName: data?.LastName,
          Email: data?.Email,
          CityID: data?.CityID,
          Address: data?.Address,
          Phone: data?.Phone,
        });
        setUserName(`${data.FirstName} ${data.LastName} `);
      }
    } catch (error) {
      console.log("خطأ في تحميل البيانات", error);
    } finally {
      setLoading(false);
    }
  };

  const getCities = async () => {
    try {
      setLoading(true);
      const result = await getCities_serverMethods(API_URL);

      if (result.status) {
        setSaudiCities(result.data);
      }
    } catch (e) {
      console.log(" all ceties error ==> ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetUserData();
    getCities();
  }, []);

  useEffect(() => {
    reset();
  }, [userData]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="wraper-personal-profile-container">
      <section className="personal-profile-container">
        <div className="personal-profile-content">
          <form
            className="personal-profile-form"
            onSubmit={handleSubmit(UpdateUserData)}
          >
            {/* <h2 className="welcome-mobile-case"> {userName} مرحبا</h2> */}

            <div className="top">
              <button
                type="submit"
                disabled={!isDirty}
                style={{
                  pointerEvents: isDirty ? "all" : "none",
                  opacity: isDirty ? "1" : ".4",
                }}
                className="py-1.5 px-3"
              >
                تحديث البيانات
              </button>
              {/* <h2 className="welcome-desctop-case">مرحبا {userName}</h2> */}
            </div>
            <div className="form-container">
              <div className="customer-info">
                <label>الاسم الاول</label>
                <DashboardInput
                  register={register}
                  Name="FirstName"
                  errors={errors?.FirstName}
                  type={"text"}
                />
              </div>
              <div className="customer-info">
                <label htmlFor="">الاسم الاخير</label>
                <DashboardInput
                  register={register}
                  Name="LastName"
                  errors={errors?.LastName}
                  type={"text"}
                />
              </div>
              <div className="customer-info">
                <label>البريد الإلكتروني</label>
                <DashboardInput
                  register={register}
                  Name="Email"
                  errors={errors?.Email}
                  responseError={responseError?.errors?.Email}
                  isReadOnly={true}
                  type={"email"}
                />
              </div>
              <div className="customer-info">
                <label>رقم الهاتف</label>
                <DashboardInput
                  register={register}
                  Name="Phone"
                  errors={errors?.Phone}
                  responseError={responseError?.errors?.Phone}
                  type={"number"}
                />
              </div>

              <div className="customer-info">
                <label>الدولة</label>

                <input type="text" value="المملكة العربية السعودية" readOnly />
              </div>
              <div className="customer-info">
                <label>المدينة</label>
                <select
                  {...register("CityID", { valueAsNumber: true })}
                  style={{
                    borderBottom: errors?.CityID
                      ? "1px solid #b00020"
                      : "1px solid #05060538",
                  }}
                >
                  <option value="" disabled>
                    إختر مدينة
                  </option>

                  {saudiCities &&
                    saudiCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.nameAr}
                      </option>
                    ))}
                </select>
                {errors?.CityID && (
                  <>
                    <span className="icon-notice"></span>
                    <span className="error-msg">{errors.CityID?.message}</span>
                  </>
                )}
              </div>
              <div className="customer-info last-chield-customer-info ">
                <label>العنوان بالتفصيل</label>
                <DashboardInput
                  register={register}
                  Name="Address"
                  errors={errors?.Address}
                  type={"text"}
                />
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
}

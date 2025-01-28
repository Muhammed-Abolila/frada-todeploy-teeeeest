import "./AddFriendAddress.css";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { freindDataSchema } from "@/app/schemas";

import SelectCity from "../friendInfoCompAtoms/FetchAndUpdateForms/FetchAndUpdateFormsAtoms/SelectCity/SelectCity";
import { freindDataSchema } from "@/app/(e-commerce-dashboard)/schemas";
import { addFriend } from "@/app/(e-commerce-dashboard)/ServerActionsMethods/UserInfoMethods";
import { getCookie } from "cookies-next";
import { DashboardInput } from "../../utilities/DashboardInput/DashboardInput";

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

const AddFriendAddress = ({
  hideAddNewFriend,
  setHideAddNewFriend,
  cities,
  allFriends,
  setAllFriends,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(freindDataSchema),
  });

  const onSubmit = async (formData) => {
    try {
      await addFriend(formData, config);
      setAllFriends([...allFriends, formData]);
      setHideAddNewFriend(true);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <>
      {hideAddNewFriend == false && (
        <div className="friend-profile-container">
          <div className="friend-profile-content ">
            <h5 className="m-3 text-right">إضافة عنوان صديق جديد</h5>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:w-[1000px] xl:w-[1200px]"
            >
              <div className="wraper-form-container shadow-md flex my-[30px] lg:pr-[40px] m-3">
                <div className="add-delete-friend-btns">
                  <button className="save" type="submit">
                    إضافة الصديق
                  </button>
                  <button
                    className="close"
                    type="button"
                    onClick={() => setHideAddNewFriend(true)}
                  >
                    إلغاء
                  </button>
                </div>
                <div className="form-container">
                  <div className="customer-info">
                    <label className="text-sm md:text-md">إسم الصديق</label>
                    <DashboardInput
                      type={"text"}
                      Name="Name"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="customer-info">
                    <label className="text-sm md:text-md">رقم الهاتف</label>
                    <DashboardInput
                      type={"number"}
                      Name="Phone"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="customer-info">
                    <label className="text-sm md:text-md">المدينة</label>

                    <SelectCity
                      Name="CityID"
                      register={register}
                      errors={errors}
                      cities={cities}
                    />
                  </div>
                  <div className="customer-info">
                    <label className="text-sm md:text-md">
                      عنوان الصديق بالتفصيل
                    </label>
                    <DashboardInput
                      type={"text"}
                      Name="Address"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default AddFriendAddress;

// "use server";
// import { getCookie } from "cookies-next";

// let apiKey = process.env.NEXT_PUBLIC_API_URL;
// export const getAllFriends = async () => {


//   try {
//     const response = await fetch(`${apiKey}/getGift`, {
//       cache: "no-store",
//      headers: config.headers ,
//     });
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     } else {
//       console.error("حدث خطأ ما");
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
// export const getCities = async () => {
//   try {
//     const response = await fetch(`${apiKey}/getCities`, {
//       cache: "no-store",
//       headers: config.headers ,
//     });
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     } else {
//       console.error("حدث خطأ ما");
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const deleteFriend = async (id) => {
//   console.log("friend id to delete", id);

//   try {
//     const response = await fetch(`${apiKey}/deleteGift/${id}`, {
//       method: "DELETE",
//       headers: config.headers ,
//     });
//     console.log("response aftre delete friend", response);

//     if (response.ok) {
//       console.error("تم حذف الصديق");
//       return await response.json();
//     } else {
//       console.error("خطأ في حذف الصديق:");
//     }
//   } catch (error) {
//     console.error("خطأ في الاتصال بالخادم:", error);
//   }
// };

// export const addFriend = async (formData) => {
//   try {
//     const response = await fetch(`${apiKey}/addGiftAddress`, {
//       method: "POST",
//       headers: config.headers ,
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       console.log("تمت الإضافة بنجاح:");
//       getAllFriends();
//     } else {
//       console.error("خطأ في إضافة الصديق:");
//     }
//   } catch (error) {
//     console.error("خطأ في الاتصال بالخادم:", error);
//   }
// };

// export const updateFriend = async (id, formData) => {
//   try {
//     const response = await fetch(`${apiKey}/updateGiftAddress/${id}`, {
//       method: "PUT",
//       headers: config.headers ,
//       body: JSON.stringify(formData),
//     });
//     if (response.ok) {
//       console.log("تمت التعديل بنجاح:");
//     } else {
//       console.error("خطأ في تعديل الصديق:");
//     }
//   } catch (error) {
//     console.error("خطأ في الاتصال بالخادم:", error);
//   }
// };

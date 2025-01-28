"use server";

let apiKey = process.env.NEXT_PUBLIC_API_URL;
export async function getCities_serverMethods(API_URL) {
  let response = await fetch(`${API_URL}/getCities`);
  const result = await response.json();
  console.log("server action result => ", result);

  return result;
}
export async function GetUserData_serverMethods(API_URL, config) {
  const response = await fetch(`${API_URL}/userProfile`, {
    method: "GET",
    headers: config.headers,
  });
  const result = await response.json();
  return result;
}
export async function UpdateUserData_serverMethods(API_URL, formData, config) {
  const responsee = await fetch(`${API_URL}/updateUser`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: config.headers,
  });

  const result = await responsee.json();
  return result;
}

export const getAllFriends = async (config) => {
  console.log("config", config);

  try {
    const response = await fetch(`${apiKey}/getGift`, {
      cache: "no-store",
      headers: config.headers,
    });
    const data = await response.json();

    if (response.ok) {
      console.log("all friends => ✅✅", data);

      return data;
    } else {
      console.error("حدث خطأ ما");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getCities = async (config) => {
  try {
    const response = await fetch(`${apiKey}/getCities`, {
      cache: "no-store",
      headers: config.headers,
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error("حدث خطأ ما");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteFriend = async (id, config) => {
  console.log("friend id to delete", id);

  try {
    const response = await fetch(`${apiKey}/deleteGift/${id}`, {
      method: "DELETE",
      headers: config.headers,
    });
    console.log("response aftre delete friend", response);

    if (response.ok) {
      console.error("تم حذف الصديق");
      return await response.json();
    } else {
      console.error("خطأ في حذف الصديق:");
    }
  } catch (error) {
    console.error("خطأ في الاتصال بالخادم:", error);
  }
};

export const addFriend = async (formData, config) => {
  try {
    const response = await fetch(`${apiKey}/addGiftAddress`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("تمت الإضافة بنجاح:");
    } else {
      console.error("خطأ في إضافة الصديق:");
    }
  } catch (error) {
    console.error("خطأ في الاتصال بالخادم:", error);
  }
};

export const updateFriend = async (id, formData, config) => {
  try {
    const response = await fetch(`${apiKey}/updateGiftAddress/${id}`, {
      method: "PUT",
      headers: config.headers,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log("تمت التعديل بنجاح:");
    } else {
      console.error("خطأ في تعديل الصديق:");
    }
  } catch (error) {
    console.error("خطأ في الاتصال بالخادم:", error);
  }
};

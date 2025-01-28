"use server";

import { cookies } from "next/headers";

const cookieStore = await cookies();
const access_token = cookieStore.get("access_token");
const api_key = process.env.NEXT_PUBLIC_API_URL;

 function getConfig() {
  let config;
  try {
    if (access_token) {
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.value}`,
        },
      };
    }
  } catch (e) {
    console.log(e);
  } finally {
    return config;
  }
}

export  const getUserOrders = async () => {
  const config = getConfig();
  try {
    const response = await fetch(`${api_key}/getMyOrders`, {
      headers: config.headers,
    });
    if (!response.ok) {
      throw new Error("حدث خطأ ما");
    }
    const { data: responseData } = await response.json();
    console.log("response data from ✅", responseData);

    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};
export const cancelOrder = async (id) => {
  const config = getConfig();
  try {
    let response = await fetch(`${api_key}/cancelOrder/${id}`, {
      method: "POST",
      headers: config.headers,
    });
    if (response.ok) {
      getUserOrders();
      console.log("تم إالغاء الطلب بنجاح");
    }
  } catch (error) {
    console.log(error);
  }
};

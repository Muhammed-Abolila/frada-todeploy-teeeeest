import AllOrdersTable from "./allOrdersAtoms/allOrdersTable/AllOrdersTable";
import DashboardPageTitle from "../../dashboardComponents/utilities/dashboardPageTitle/DashboardPageTitle";
import { cookies } from 'next/headers'

const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const getConfig=(token)=>{
    let config;
    try {
     if (token) {
       config = {
         headers: {
           "Content-Type": "application/json",
           accept: "application/json",
           Authorization: `Bearer ${token}`,
         },
       };
     }
    } catch (e) {
     console.log(e);
    }
    
  return config  
  
  }
  
 

const getUserOrders = async () => {

  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')  
   const config= getConfig(token.value)


  try {
    const response = await fetch(`${apiKey}/getMyOrders`, {
      headers: config.headers ,
    });
    if (!response.ok) {
      throw new Error("حدث خطأ ما");
    }
    const { data: responseData } = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};
export default async function AllOrders() {
  const data = await getUserOrders();
  console.log("llllllllllllllllllll" , data)
  return (
    <div className="px-5 md:px-10 pb-8">
      <DashboardPageTitle title="جميع طلباتي" />
      <AllOrdersTable data={data} />
    </div>
  );
}

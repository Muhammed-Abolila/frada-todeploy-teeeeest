
// import FriendInfoComp from """
import FriendInfoComp from "@/app/(e-commerce-dashboard)/dashboardComponents/FriendInfoComp/FriendInfoComp";
import "../../../dashboardComponents/FriendInfoComp/friendInfoCompAtoms/FetchAndUpdateForms/FetchAndUpdateFormsAtoms/FormComp/FormComp.css";
import { getAllFriends, getCities } from "@/app/(e-commerce-dashboard)/ServerActionsMethods/UserInfoMethods";
import { cookies } from 'next/headers'


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



export default async function page() {

  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')  
   const config= getConfig(token.value)



  let friendsData = await getAllFriends(config);
  let cities = await getCities(config);


  
  return <>
  <FriendInfoComp friendsData={friendsData} cities={cities} />
  </> 
}

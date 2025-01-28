import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { token } from "../../Redux/Types";
const MiddleNavHook = () => {
    const [showLogin, setShowLogin] = useState(false);
    const router = useRouter();
    const navigateToRoute = param => {
        router.push(`/${param}`);
    };
    useEffect(() => {
      if (token) {
        setShowLogin(true);
      }else{
        setShowLogin(false);
      }
    }, [showLogin]);
    const logOut =() => {
      deleteCookie("access_token")
      deleteCookie("userName")
      setShowLogin(false);
      window.location.href="/login"
    };
    return [showLogin,setShowLogin,navigateToRoute,logOut]
}
export default MiddleNavHook

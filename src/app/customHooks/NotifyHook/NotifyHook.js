import { useState } from "react";
const NotifyHook = () => {
  const [notify, setNotify] = useState({msg:"", state: "" });
  return [notify, setNotify];
};
export default NotifyHook;

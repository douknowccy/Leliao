import React, { useState, useEffect } from "react";

const useOnlineServiceHooks = () => {
 const [onlineService] = useState("http://ayx.ltd/kefu/5fe0753addc8c");
 const onService = () => {
  let a = document.createElement("a");
  a.setAttribute("href", onlineService);
  a.setAttribute("target", "_blank");
  a.setAttribute("id", "online");
  // 防止反复添加
  if (!document.getElementById('online')) {
   document.body.appendChild(a);
  }
  a.click();
 }
 return { onService, onlineService };
}
export default useOnlineServiceHooks;
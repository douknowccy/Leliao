import React from "react"
import { chatDateTimeFormate } from "@utils/dataTime"
const ChatTime = (props: any) => {
 const { time } = props;
 return (
  <div className="chat-time">
   <span>{chatDateTimeFormate(time)}</span>
  </div>
 )
}
export default ChatTime;
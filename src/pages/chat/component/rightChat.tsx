import React from "react";
import { observer, inject } from "mobx-react";
import defaultAvatar from "@pages/my/assets/avatar.png";
const RightChat = (props: any) => {
  const { data, userState } = props;
  let url;
  // 朋友聊天
  if (userState.user.avatar)
    url = userState.user.imgUrl + userState.user.avatar;
  // 群聊天
  else url = userState.user.imgUrl + userState.user.avatar;
  return (
    <p className="right-chat">
      <span
        className="text"
        dangerouslySetInnerHTML={{ __html: data.msgContent }}
      ></span>
      <a>
        <img
          src={url}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = defaultAvatar;
          }}
        />
      </a>
    </p>
  );
};

export default inject("userState")(observer(RightChat));

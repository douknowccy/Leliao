import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import defaultAvatar from "@pages/my/assets/avatar.png";
const LeftChat = (props: any) => {
  const { data, userState } = props;
  const { user } = userState;
  let url = "";
  // 朋友聊天
  if (data.user) {
    url = user.imgUrl + data.user.avatar;
  } else {
    url = user.imgUrl + data.avatar;
  }
  return (
    <p className="left-chat">
      <a>
        <img
          src={url}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = defaultAvatar;
          }}
        />
      </a>
      <span
        className="text"
        dangerouslySetInnerHTML={{ __html: data.msgContent }}
      ></span>
    </p>
  );
};

export default inject("userState")(observer(LeftChat));

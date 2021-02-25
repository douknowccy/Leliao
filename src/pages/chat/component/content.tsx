import React, { useEffect, useRef, useState } from "react";
import LeftChat from "./leftChat";
import RightChat from "./rightChat";
import ChatTime from "./chatTime";
import { observer, inject } from "mobx-react";
import dayjs from "dayjs";
const Content = (props: any) => {
  const { userState, datas, setPage, page, isLastPage } = props;
  const { user } = userState;
  const chatBody = useRef<any>();
  const displayTime = (a: any, b: any) => {
    if (!a) return true;

    const date1 = dayjs(Date.parse(a.createTime));
    const date2 = dayjs(Date.parse(b.createTime));

    const diffMinute = date2.diff(date1, "minute");
    return diffMinute > 2 ? true : false;
  };

  return (
    <div className={"chat-content reverse"} ref={chatBody}>
      <div className="chat-main">
        <div className="hide-child">hidee</div>
        {datas.map((item: any, index: number) => {
          let html = item.msgContent.replace(
            /:emoji\[([^\s\[\]]+?)\]/g,
            function (emoji: any) {
              var emojiId = emoji.replace(/^:emoji/g, "");
              emojiId = emojiId.slice(1, emojiId.length - 1);
              return `<i class="emoji-icon emoji-${emojiId}"></i>`;
            }
          );
          item.msgContent = html;
          return (
            <div key={index}>
              {displayTime(datas[index - 1], datas[index]) && (
                <ChatTime time={item.createTime} />
              )}
              {user.uid === item.senderUid ? (
                <RightChat data={item} />
              ) : (
                <LeftChat data={item} />
              )}
            </div>
          );
        })}
        {!isLastPage && (
          <span className="more-data" onClick={() => setPage(page + 1)}>
            点击加载更多
          </span>
        )}
      </div>
    </div>
  );
};

export default inject("userState", "msgState")(observer(Content));

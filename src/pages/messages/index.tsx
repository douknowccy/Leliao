import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import Header from "@components/header";
import NavBar from "@components/navBar";
import { sendGroupMsg } from "../groups/request";
import { sendMessage } from "../friends/request";
import Chat from "../chat";
import defaultAvatar from "@pages/my/assets/avatar.png";
import DownLoad from "@components/download";
import {
  userList,
  groupList,
  clearMsgByFriend,
  clearMsgByGroup,
} from "./request";
import "./style.scss";

function Messages(props: any) {
  const { msgState, userState, groupsState, friendsState } = props;
  const {
    isLastPage: groupStateLastPage,
    messagesHistory: groupHisitory,
    setCurrentChat,
    groupHisotrys,
    clearGroupHisotry,
    myselfMsg: groupSelfMsg,
  } = groupsState;
  const [sentUserUid, setSentUserUid] = useState<number>();
  const [page, setPage] = useState(1);
  const {
    setCurrentChat: setFriendsCurrentChat,
    getMessageHistory,
    messagesHistory: friendHisitory,
    clearFriendHisotry,
    myselfMsg: friendSelfMsg,
    isLastPage: friendsStateLastPage,
  } = friendsState;
  const {
    msgHisotry,
    addHistoryItem,
    init,
    initMessags,
    setCurrentChatByMsgStore,
  } = msgState as any;
  const [check, setCheck] = useState<any>({});
  let { user } = userState;
  const [display, setDisplay] = useState(false);
  const toChat = (data: any) => {
    const { type, id } = data;
    setDisplay(true);
    setCheck(data);

    if (type === 1) {
      //  朋友消息
      setSentUserUid(data.id);
      clearFriend({ receiverUid: id });
      setCurrentChatByMsgStore({ id: id });
      setFriendsCurrentChat(id);
      getMessageHistory(data.id);
    } else {
      clearGroup({ groupId: id });
      groupHisotrys(id);
      setCurrentChat(id);
      setCurrentChatByMsgStore({ groupId: id });
    }
    data.unMsgCount = 0;
  };
  const sendMsg = (msg: string) => {
    //  消息类型（0：普通文字消息，1：图片消息，2：文件消息，3：语音消息，4：视频消息）
    let groupdData = {
      groupId: check.id,
      msgType: 0,
      msgContent: msg,
    };

    let friendData = {
      receiverUid: sentUserUid,
      msgType: 0,
      msgContent: msg,
    };
    if (check.type === 1) {
      friendSelfMsg({ receiveId: sentUserUid, msgContent: msg, msgType: 0 });
      sendMessage(friendData).then((res) => {});
    } else {
      groupSelfMsg(groupdData);
      sendGroupMsg(groupdData).then((res) => {});
    }
  };
  const initUserList = () => {
    userList().then((res) => {
      const { data } = res;
      data.map((item: any) => {
        if (item.lastMsgContent) {
          const data: MessageStore.MsgHisotry = {
            id: item.user.uid,
            type: 1,
            name: item.remark || item.user.name,
            remark: item.user.remark,
            avatar: item.user.avatar,
            lastMsgContent: item.lastMsgContent,
            unMsgCount: item.unMsgCount,
            modifiedTime: item.modifiedTime,
            dataTime: item.modifiedTime,
          };
          addHistoryItem(data);
        }
      });
    });
  };
  const initGroupList = () => {
    groupList().then((res) => {
      const { data } = res;
      data.map((item: any) => {
        if (item.lastMsgContent) {
          const data: MessageStore.MsgHisotry = {
            id: item.groupId,
            type: 2,
            name: item.remark || item.group.name,
            remark: item.group.remark,
            avatar: item.group.avatar,
            lastMsgContent: item.lastMsgContent,
            unMsgCount: item.unMsgCount,
            modifiedTime: item.lastMsgTime,
            dataTime: item.lastMsgTime,
          };
          addHistoryItem(data);
        }
      });
    });
  };
  const clearFriend = (data: any) => {
    clearMsgByFriend(data).then(() => {});
  };
  const clearGroup = (data: any) => {
    clearMsgByGroup(data).then(() => {});
  };

  const objToArray = (obj: any) => {
    let array: any[] = [];
    Object.keys(obj).map((key) => {
      array.push(obj[key]);
    });
    array.sort((a: any, b: any) => {
      let t1 = new Date(a.dataTime);
      let t2 = new Date(b.dataTime);
      return t2.getTime() - t1.getTime();
    });
    return array;
  };

  useEffect(() => {
    if (user.isLogin && init) return;
    initGroupList();
    initUserList();
    initMessags();
  }, []);
  useEffect(() => {
    if (!display && check.type) {
      if (check.type === 2) {
        clearGroup({ groupId: check.id });
      } else {
        clearFriend({ receiverUid: check.id });
      }
      setCurrentChat({ groupId: 0, id: 0 });
      setCurrentChatByMsgStore({ groupId: 0, id: 0 });
    }
  }, [display]);
  const emojiTranslate = (msgContent: string) => {
    let html = msgContent
      .replace(/:emoji\[([^\s\[\]]+?)\]/g, function (emoji: any) {
        var emojiId = emoji.replace(/^:emoji/g, "");
        emojiId = emojiId.slice(1, emojiId.length - 1);
        return `<i class="emoji-icon emoji-${emojiId}"></i>`;
      })
      .replace(/\n/g, "<br>");
    return html;
  };

  return (
    <>
      <Header title="消息" />
      <div className="chat_container">
        {objToArray(msgHisotry).map((item, index) => {
          let url;
          if (item.groupAvatar) {
            url = userState.user.imgUrl + item.groupAvatar;
          } else {
            url = userState.user.imgUrl + item.avatar;
          }
          return (
            <div
              className="single_chat"
              onClick={() => toChat(item)}
              key={index}
            >
              <div className="avatar">
                {item.unMsgCount > 0 ? (
                  <p className="unread">{item.unMsgCount}</p>
                ) : null}

                <img
                  src={url}
                  alt=""
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                />
              </div>
              <div className="content_text">
                <div className="content_title">
                  <h4 className="content_title_name">{item.name}</h4>
                  <p className="content_title_time">{item.modifiedTime}</p>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: emojiTranslate(item.lastMsgContent),
                  }}
                ></p>
              </div>
            </div>
          );
        })}
      </div>
      <DownLoad />
      <NavBar />
      <Chat
        id={check ? check.id : 0}
        page={page}
        setPage={setPage}
        isLastPage={
          check.type === 1 ? friendsStateLastPage : groupStateLastPage
        }
        friendUid={sentUserUid}
        clearHisotry={check.type === 1 ? clearFriendHisotry : clearGroupHisotry}
        getHistory={check.type === 1 ? getMessageHistory : groupHisotrys}
        datas={check.type === 1 ? friendHisitory : groupHisitory}
        type={check.type}
        sendMsg={sendMsg}
        display={display}
        setDisplay={setDisplay}
        title={check?.name || ""}
      />
    </>
  );
}
export default inject(
  "userState",
  "msgState",
  "groupsState",
  "friendsState"
)(observer(Messages));

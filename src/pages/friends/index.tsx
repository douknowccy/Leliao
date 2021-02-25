import React, { useState, useEffect } from "react";
import "./style.scss";
import Header from "@components/header";
import AddFriend from "./components/AddFriend";
import NavBar from "@components/navBar";
import unique from "@utils/getUniqueObjOfArray";
import { sendMessage, agreeOrDeclineFriend, friendsAdded } from "./request";
import { observer, inject } from "mobx-react";
import Chat from "../chat";
import defaultAvatar from "@pages/my/assets/avatar.png";
import { Toast } from "antd-mobile";
function Friends(props: any) {
  const { friendsState, userState, msgState } = props;
  const {
    updateFriendsAdded,
    friendsAddedData,
    getUpdateFriendsAddedList,
    init,
    messagesHistory,
    setCurrentChat,
    friendsData,
    getMessageHistory,
    getFriendList,

    isLastPage,
    clearFriendHisotry,
    myselfMsg,
  } = friendsState;
  const { setCurrentChatByMsgStore } = msgState;
  const [page, setPage] = useState(1);
  const [display, setDisplay] = useState(false);
  const [displayChat, setDisplayChat] = useState(false);
  const [check, setCheck] = useState<any>();
  const [sentUserUid, setSentUserUid] = useState<number>();
  const add = () => {
    return <li className="add-cion" onClick={() => setDisplay(true)}></li>;
  };

  const agreeOrDecline = async (status: number, id: number) => {
    //filter
    // friendUid: 81;

    updateFriendsAdded(friendsAddedData.filter((item: any) => item.id !== id));

    agreeOrDeclineFriend(status, id).then(() => {
      getFriendList();
    });
    // 重新取得新朋友名单
  };

  const sendMsg = (msg: string, id: number) => {
    //  消息类型（0：普通文字消息，1：图片消息，2：文件消息，3：语音消息，4：视频消息）
    let postData = {
      receiverUid: check.friendUid,
      msgType: 0,
      msgContent: msg,
      reqNo: "",
      timeStamp: 0,
    };
    myselfMsg(postData);
    sendMessage(postData).then((res) => {
      // updateMessages({
      //   msgContent: msg,
      //   senderUid: userState.user.uid,
      //   createTime: new Date(),
      // });
    });
  };

  const checkFriend = (item: any) => {
    setCheck(item);
    setCurrentChat(item.friendUid);
    setSentUserUid(item.friendUid);
    setCurrentChatByMsgStore({ groupId: 0, id: item.friendUid });
    getMessageHistory(item.friendUid);
    setDisplayChat(true);
  };

  useEffect(() => {
    //  只有第一次request friendList/friendAdded 并存到mobx
    if (init) return;
    //  朋友名单
    getFriendList();
    //  加我好友名单
    getUpdateFriendsAddedList();
  }, []);

  useEffect(() => {
    if (!displayChat && check) {
      setCurrentChat({ groupId: 0, id: 0 });
      setCurrentChatByMsgStore({ groupId: 0, id: 0 });
    }
  }, [displayChat]);

  return (
    <>
      <Header title="朋友" rightIcon={add} />
      <div className="friends_container">
        {/* 加好友请求 */}
        {friendsAddedData.length > 0 &&
          friendsAddedData.map((item: any, index: number) => {
            const { id, user } = item;
            const { name, avatar } = user;
            const url = userState.user.imgUrl + avatar;

            return (
              <div className="single_friend" key={index}>
                <div className="avatar">
                  <img
                    src={url}
                    alt=""
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
                <div className="single_friend_content">
                  <p className="friend_name">{name}</p>
                  <button
                    className="agree_button"
                    onClick={() => agreeOrDecline(1, id)}
                  >
                    添加
                  </button>
                  <button
                    className="decline_button"
                    onClick={() => agreeOrDecline(2, id)}
                  >
                    拒绝
                  </button>
                </div>
              </div>
            );
          })}
        {/* 已是好友列表 */}
        {friendsData.length > 0 &&
          friendsData.map((item: any, index: number) => {
            const { user } = item;
            const { name, avatar } = user;
            const url = userState.user.imgUrl + avatar;
            return (
              <div
                className="single_friend"
                key={index}
                onClick={() => checkFriend(item)}
              >
                <div className="avatar">
                  <img
                    src={url}
                    alt=""
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
                <div className="single_friend_content">
                  <p className="friend_name">{name}</p>
                </div>
              </div>
            );
          })}
      </div>
      <NavBar />
      <AddFriend display={display} setDisplay={setDisplay} />
      <Chat
        id={check ? check.friendUid : 0}
        page={page}
        setPage={setPage}
        isLastPage={isLastPage}
        friendUid={sentUserUid}
        clearHisotry={clearFriendHisotry}
        datas={messagesHistory}
        sendMsg={sendMsg}
        display={displayChat}
        setDisplay={() => setDisplayChat(false)}
        getHistory={getMessageHistory}
        title={check?.user.name || ""}
      />
    </>
  );
}

export default inject(
  "friendsState",
  "msgState",
  "userState"
)(observer(Friends));

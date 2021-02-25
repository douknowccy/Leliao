import React, { useEffect, useState } from "react";
import Header from "@components/header";
import NavBar from "@components/navBar";
import CreateGroup from "./components/CreateGroup";
import { sendGroupMsg } from "./request";
import { clearMsgByGroup } from "@pages/messages/request";
import { observer, inject } from "mobx-react";
import Chat from "../chat";
import "./style.scss";
import defaultAvatar from "@pages/my/assets/avatar.png";
function Groups(props: any) {
  const [display, setDisplay] = useState(false);
  const [displayChat, setDisplayChat] = useState(false);
  const [page, setPage] = useState(1);
  const [check, setCheck] = useState<GroupInterface.Group>();
  const { groupsState, msgState, userState } = props;
  const { setCurrentChatByMsgStore } = msgState;
  const {
    getGroupList,
    groupHisotrys,
    groupsData,
    init,
    messagesHistory,
    setCurrentChat,
    clearGroupHisotry,
    isLastPage,
    myselfMsg,
  } = groupsState;
  const add = () => {
    return <li className="add-cion" onClick={() => setDisplay(true)}></li>;
  };

  const sendMsg = (msg: string) => {
    //  消息类型（0：普通文字消息，1：图片消息，2：文件消息，3：语音消息，4：视频消息）
    let postData = {
      groupId: check?.group.groupId,
      msgType: 0,
      msgContent: msg,
    };
    myselfMsg(postData);
    sendGroupMsg(postData).then((res) => {});
  };

  const checkGroup = (item: GroupInterface.Group) => {
    setCheck(item);

    setCurrentChat(item.groupId);
    setCurrentChatByMsgStore(item);
    // groupHisotrys(item.group.groupId);
    setDisplayChat(true);
  };

  useEffect(() => {
    if (init) return;
    getGroupList();
  }, []);

  useEffect(() => {
    if (!displayChat && check) {
      clearMsgByGroup({ groupId: check?.groupId });
      setCurrentChat({ groupId: 0, id: 0 });
      setCurrentChatByMsgStore({ groupId: 0, id: 0 });
    }
  }, [displayChat]);

  return (
    <>
      <Header title="群组" rightIcon={add} />
      <div className="groups_container">
        {groupsData.map((item: GroupInterface.Group) => {
          const url = userState.user.imgUrl + item.group.avatar;
          return (
            <div
              className="single_group"
              key={item.groupId}
              onClick={() => checkGroup(item)}
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
              <div className="single_group_content">
                <p className="group_name">{item.group.name}</p>
                <p className="group_remark">{item.group.remark}</p>
              </div>
            </div>
          );
        })}
      </div>
      <NavBar />
      <CreateGroup
        display={display}
        refreshData={getGroupList}
        setDisplay={setDisplay}
      />
      <Chat
        display={displayChat}
        clearHisotry={clearGroupHisotry}
        sendMsg={sendMsg}
        datas={messagesHistory}
        getHistory={groupHisotrys}
        id={check ? check!.group.groupId : 0}
        page={page}
        setPage={setPage}
        isLastPage={isLastPage}
        setDisplay={() => setDisplayChat(false)}
        title={check?.group.name || ""}
        type={2}
      />
    </>
  );
}

export default inject("groupsState", "msgState", "userState")(observer(Groups));

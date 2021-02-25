import React, { useState, useEffect } from "react";
import Header from "@components/header";
import ChatContent from "./component/content";
import Inputer from "./component/inputer";
import "./styles.scss";
import GroupMore from "@pages/groups/components/GroupMore";
import { observer, inject } from "mobx-react";
type ChatProps = {
  display: boolean;
  setDisplay: Function;
  title: string;
  sendMsg: Function;
  datas: any[];
  friendUid?: any;
  getHistory: any;
  id: number;
  page: number;
  setPage: Function;
  clearHisotry: Function;
  isLastPage: boolean;
  type?: any;
  groupsState?: any;
  userState?: any;
  friendsState?: any;
};
const Chat = (props: ChatProps) => {
  const {
    display,
    setDisplay,
    title,
    sendMsg,
    datas,
    friendUid,
    type,
    groupsState,
    getHistory,
    clearHisotry,
    id,
    page,
    setPage,
    isLastPage,
    friendsState,
  } = props;

  const [groupMoreDisplay, setGroupMoreDisplay] = useState(false);
  const { getGroupMembers } = groupsState;
  const { setCurrentChat } = friendsState;
  useEffect(() => {
    if (display) {
      getHistory(id, page);
    }
  }, [display]);

  useEffect(() => {
    if (display && page >= 1) {
      getHistory(id, page);
    }
  }, [page]);

  // type===2 群聊天 type===5群消息
  const groupExpand = () => {
    return (
      <li
        className="more-icon"
        onClick={() => {
          setGroupMoreDisplay(true);
          // 取群組人員
          getGroupMembers(groupsState.currentChat.groupId);
        }}
      ></li>
    );
  };
  return (
    <div className={display ? "chat display" : "chat"}>
      <Header
        goback={() => {
          setPage(1);
          clearHisotry();
          setDisplay(false);
          setCurrentChat({ id: 0 });
        }}
        title={title}
        rightIcon={type === 2 || type === 5 ? groupExpand : null}
      />
      <GroupMore
        display={groupMoreDisplay}
        setDisplay={setGroupMoreDisplay}
        title={title}
      />
      {!groupMoreDisplay && (
        <>
          <ChatContent
            datas={datas}
            friendUid={friendUid}
            getHistory={getHistory}
            page={page}
            setPage={setPage}
            isLastPage={isLastPage}
          />
          <Inputer sendMsg={sendMsg} friendUid={friendUid} />
        </>
      )}
    </div>
  );
};

export default inject(
  "groupsState",
  "userState",
  "friendsState"
)(observer(Chat));

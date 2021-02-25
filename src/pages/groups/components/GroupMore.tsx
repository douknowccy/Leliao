import React, { useState, useEffect } from "react";
import Header from "@components/header";
import { observer, inject } from "mobx-react";
import "./GroupMore.scss";
import add_member from "../assets/addMember.png";
import delete_member from "../assets/deleteMember.png";
import DeleteMember from "./DeleteMember";
import AddMember from "./AddMember";
import defaultAvatar from "@pages/my/assets/avatar.png";
function GroupMore(props: any) {
  const {
    display,
    setDisplay,
    groupsState,
    userState,
    friendsState,
    title,
  } = props;
  const { groupMembers } = groupsState;
  const { friendsData } = friendsState;
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [addDisplay, setAddDisplay] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [addDeltitle, setAddDelTitle] = useState("");
  useEffect(() => {
    groupMembers.find((item: any) => {
      if (item.user.uid === userState.user.uid && item.rank !== 0) {
        setIsAuth(true);
      }
    });
  }, [groupMembers]);

  const addMember = () => {
    setAddDisplay(true);
  };
  const delMember = () => {
    setDeleteDisplay(true);
  };

  // 去重朋友名單與群組成員

  return (
    <div
      className={
        display ? "create_group_container addGroup" : "create_group_container"
      }
    >
      <Header
        title={`${title}(${groupMembers?.length})`}
        goback={() => {
          setDisplay(false);
        }}
      />
      <div className="groupMoreContainer">
        {groupMembers.map((item: any) => {
          let url = userState.user.imgUrl + item.user.avatar;

          return (
            <div className="group_member" key={item.user.uid}>
              <img
                src={url}
                alt=""
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = defaultAvatar;
                }}
              />
              <p>{item.user.account || item.user.name}</p>
            </div>
          );
        })}

        {isAuth && (
          <>
            {/* 加人 */}
            <div
              className="group_member"
              onClick={() => {
                addMember();
                setAddDelTitle("添加成員");
              }}
            >
              <img src={add_member} alt="N/A" />
            </div>
            {/* 刪人 */}
            <div
              className="group_member"
              onClick={() => {
                delMember();
                setAddDelTitle("刪除成員");
              }}
            >
              <img src={delete_member} alt="N/A" />
            </div>
          </>
        )}
        <DeleteMember
          title={addDeltitle}
          display={deleteDisplay}
          setDisplay={setDeleteDisplay}
          datas={groupMembers}
        />
        <AddMember
          title={addDeltitle}
          display={addDisplay}
          setDisplay={setAddDisplay}
          datas={friendsData}
        />
      </div>
    </div>
  );
}

export default inject(
  "groupsState",
  "userState",
  "friendsState"
)(observer(GroupMore));

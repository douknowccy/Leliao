import React, { useState, useEffect } from "react";
import Header from "@components/header";
import choosen from "../assets/choosen.png";
import { observer, inject } from "mobx-react";
import defaultAvatar from "@pages/my/assets/avatar.png";
function AddDeleteMember(props: any) {
  const { display, setDisplay, title, datas, userState, groupsState } = props;
  const [isChoose, setisChoose] = useState<any>({});
  const { getDeleteGroupMembers, currentChat } = groupsState;
  const [ids, setIds] = useState("");
  const chooseFriends = (id: number) => {
    let obj = isChoose;
    if (isChoose[id]) {
      delete obj[id];
      setisChoose({ ...obj });
    } else setisChoose({ ...isChoose, [id]: id });
  };
  const objectKeys = (obj: any) => {
    let allMemberIds = "";
    Object.keys(obj).map(function (key, index) {
      allMemberIds += `${key},`;
    });
    setIds(allMemberIds);
  };
  useEffect(() => {
    objectKeys(isChoose);
  }, [isChoose]);

  const deleteMember = () => {
    return (
      <button
        className="agree_button"
        onClick={() => {
          getDeleteGroupMembers(ids, currentChat.groupId);
          // 恢復初始
          setDisplay(false);
          setisChoose({});
        }}
      >
        完成
      </button>
    );
  };

  return (
    <div
      className={
        display ? "create_group_container addGroup" : "create_group_container"
      }
    >
      <Header
        title={title}
        goback={() => setDisplay(false)}
        rightIcon={Object.keys(isChoose).length ? deleteMember : null}
      />
      <div className="newgroups_container">
        {datas.map((item: any) => {
          let url = userState.user.imgUrl + item.user.avatar;

          return (
            <div
              className="single_newgroup"
              key={item.user.uid}
              onClick={() => chooseFriends(item.user.uid)}
            >
              <div
                className={`${
                  isChoose[item.user.uid] ? "friendsChoosen" : "option"
                }`}
              >
                {isChoose[item.user.uid] && <img src={choosen} alt="choosen" />}
              </div>
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
              <div className="single_newgroup_content">
                <p className="newgroup_name">{item.user.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default inject("userState", "groupsState")(observer(AddDeleteMember));

import React, { useState, useEffect } from "react";
import Header from "@components/header";
import {
  friendsAdded,
  requestAddFriend,
  searchFriendByAccount,
} from "../request";
import { observer, inject } from "mobx-react";
import defaultAvatar from "@pages/my/assets/avatar.png";
import "./AddFriend.scss";
import { Toast } from "antd-mobile";
import AddFriendHeader from "./AddFriendHeader";
import searchImg from "../assets/search2.png";
type AddFriendProps = {
  display: boolean;
  setDisplay: Function;
  userState?: any;
};
function AddFriend(props: AddFriendProps) {
  const { userState } = props;
  const { display, setDisplay } = props;
  const [friendResult, setFriendResult] = useState<[]>([]);
  const [friendAccount, setFriendAccount] = useState<string>("");
  const {
    user: { imgUrl },
  } = userState;
  const addFriendByUid = async (uid: number) => {
    Toast.loading("添加中");

    requestAddFriend(uid.toString()).then((res) => {
      Toast.success("添加成功");
      setFriendResult([]);
      setDisplay(false);
    });
  };
  const searchFriend = async (account: string) => {
    //request account
    if (account) {
      Toast.loading(`搜寻${account}`, 0.7);
      setFriendAccount("");
      const res = await searchFriendByAccount(account);
      const data = await res.data;
      setFriendResult(data);
      if (data.length === 0) Toast.info("无结果", 0.7);
    }
    return;
  };

  return (
    <div
      className={
        display ? "create_group_container addGroup" : "create_group_container"
      }
    >
      <AddFriendHeader
        searchFriend={searchFriend}
        friendAccount={friendAccount}
        setFriendAccount={setFriendAccount}
        friendResult={friendResult}
        setFriendResult={setFriendResult}
        search
        title="添加朋友"
        goback={() => setDisplay(false)}
      />
      <div className="add_friend_content">
        {friendAccount && (
          <div
            className="single_friend"
            onClick={() => searchFriend(friendAccount)}
          >
            <div className="avatar_search">
              <img src={searchImg} alt="searchImg" />
            </div>
            <div className="single_friend_content">
              <p className="search_friend_name">
                搜索:{" "}
                <span className="search_friend_text"> {friendAccount}</span>
              </p>
            </div>
          </div>
        )}

        {friendResult.length > 0 &&
          friendResult.map((item) => {
            const { account, name, uid, avatar } = item;

            return (
              <div className="single_friend" key={uid}>
                <div className="avatar">
                  <img
                    src={`${imgUrl}${avatar}`}
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
                    onClick={() => addFriendByUid(uid)}
                  >
                    添加
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default inject("userState")(observer(AddFriend));

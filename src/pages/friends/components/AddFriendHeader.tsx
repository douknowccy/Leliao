import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import useServiceHooks from "@hooks/useServiceHooks";
import { observer, inject } from "mobx-react";

import { Toast } from "antd-mobile";
import searchImg from "../assets/search.png";
import cancelImg from "../assets/cancel.png";
export type HeaderBarProps = {
  goback?: string | (() => void);
  title: string;
  service?: string;
  rightIcon?: Function;
  search?: boolean;
  userState?: any;
  friendResult?: any;
  setFriendResult?: any;
  friendAccount?: any;
  setFriendAccount?: any;
  searchFriend?: any;
};
const HeaderBar = (props: HeaderBarProps) => {
  const {
    userState,
    friendResult,
    setFriendResult,
    friendAccount,
    setFriendAccount,
    searchFriend,
  } = props;

  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  let history = useHistory();
  let { onService } = useServiceHooks();
  const { goback, title, service, rightIcon, search } = props;
  const to = () => {
    setFriendAccount("");
    setIsOnFocus(false);
    if (typeof goback === "function") {
      goback();
    } else {
      if (goback) {
        history.replace(goback);
      }
    }
  };

  return (
    <header className="add_friend_header">
      <ul className="add_friend_container ">
        {goback && <li className="add_friend_goback" onClick={to}></li>}
        <li className="add_friend_title">{title}</li>
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchFriend(friendAccount);
        }}
        className="search_form"
      >
        <input
          type="text"
          className="add_friend_input"
          onFocus={() => setIsOnFocus(true)}
          value={isOnFocus ? friendAccount : ""}
          onChange={(e) => setFriendAccount(e.target.value)}
        />
        <button
          className={`${isOnFocus ? "search_button_focus" : "search_button"}`}
          type="submit"
        >
          <img
            src={searchImg}
            alt="searchImg"
            className="searchImg"
            style={{ zIndex: -1 }}
          />
        </button>
        {isOnFocus && (
          <button
            className="cancel_button_focus"
            onClick={() => setFriendAccount("")}
          >
            <img src={cancelImg} alt={cancelImg} className="searchImg" />
          </button>
        )}
        {isOnFocus && (
          <p
            className="cancel_text_focus"
            onClick={() => {
              setIsOnFocus(false);
              setFriendAccount("");
            }}
          >
            取消
          </p>
        )}
      </form>

      <p className="add_friend_account">我的账号: {userState.user.account}</p>
    </header>
  );
};

export default inject("userState")(observer(HeaderBar));

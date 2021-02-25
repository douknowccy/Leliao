import React, { useState, useEffect, useRef } from "react";
import { Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { login } from "./request";
import { observer, inject } from "mobx-react";
import { addListenr } from "@utils/observerListen";
import DownLoad from "@components/download";
import "./style.scss";
// @ts-ignore
// const isWebview = require("js-is-webview");
// const is_webview = new isWebview();
const Login = (props: any) => {
  const inputRef: React.MutableRefObject<any> = useRef(null);

  const { push } = useHistory();
  const history = useHistory();
  const { userState } = props;
  const [nickname, setNickname] = useState<string>();
  const [password, setPassword] = useState<string>();
  let { updateUser, setShowDownLoadLink } = userState as UserState;
  const toLogin = () => {
    if (!nickname || !password) {
      Toast.fail("请输入账号或密码");
      return;
    }
    Toast.loading("Loading...", 0);
    login({ account: nickname, pwd: password })
      .then((res: any) => {
        if (res.code == 0) {
          updateUser({ ...res.data, isLogin: true });
          Toast.hide();
          Toast.success("登录成功!");
          addListenr();
          history.replace("/");
        }
      })
      .catch((err) => {
        Toast.fail(err.message);
      });
  };

  return (
    <div className="login">
      <div className="main">
        <p className="title">登陆后发现更精彩</p>

        <div className="username">
          <input
            ref={inputRef}
            autoFocus
            type="text"
            placeholder="请输入账号或手机号"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="pwd">
          <input
            type="password"
            placeholder="请输入密码"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-btn" onClick={toLogin}>
          登录
        </div>
        <div
          className="reg-btn"
          onClick={() => {
            push("/r");
          }}
        >
          <span className="icon"></span>
          <span className="text">切换到快速注册</span>
        </div>
      </div>
      <DownLoad loginPage />
    </div>
  );
};
export default inject("userState")(observer(Login));

import React, { useState, useEffect } from "react";
import NavBar from "@components/navBar";
import avatar from "./assets/avatar.png";
import pencil from "./assets/pencil.png";
import headset from "./assets/headset.png";
import link from "./assets/link.png";
import { uploadImg } from "../groups/request";
import { changeName } from "./request";
import ChangePwd from "./components/ChangePassword";
import lock from "./assets/lock.png";
import { observer, inject } from "mobx-react";
import "./style.scss";
import { Toast } from "antd-mobile";
import { CopyToClipboard } from "react-copy-to-clipboard";
import fuzhi from "./assets/fuzhi.png";

const host = window.location.hostname;
const My = (props: any) => {
  const { userState } = props;
  const { updateUser, user } = userState as any;
  const [display, setDisplay] = useState(false);
  const [displayPwd, setDisplayPwd] = useState(false);
  const [name, setName] = useState("");
  const onChange = (e: any) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    let data = new FormData();
    data.append("file", file, file.name);
    Toast.loading("正在上传中...", 0);
    uploadImg(data).then((res) => {
      const { data } = res.data;
      updateUser({ ...user, avatar: data.url });
      avatarEdit(data.url);
      Toast.success("更新头像成功");
    });
  };
  const inputName = () => {
    setDisplay(!display);
  };
  const avatarEdit = (avatar: string) => {
    changeName({ avatar }).then((res) => {
      Toast.success("修改头像成功");
    });
  };
  const nameEdit = () => {
    Toast.loading("请求中...");
    changeName({ name }).then((res) => {
      Toast.success("修改昵称成功");
      updateUser({ ...user, name });
      setDisplay(false);
    });
  };

  return (
    <>
      <div className="my_header">
        <div className="my_avatar">
          {userState.user.avatar ? (
            <img
              src={user.imgUrl + user.avatar}
              alt=""
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = avatar;
              }}
            />
          ) : (
            <img src={avatar} alt="avatar" />
          )}
          {!user.avatar && <p>更换</p>}
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            multiple={false}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div className="my_info">
          <div className="my_name">
            {!display && (
              <h4>
                {user.name}
                <img src={pencil} alt="pencil" onClick={inputName} />
              </h4>
            )}
            {display && (
              <form action="" id="formid" onSubmit={nameEdit}>
                <input
                  type="text"
                  value={name}
                  autoFocus
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onBlur={nameEdit}
                />
                <input type="submit" style={{ display: "none" }} />
              </form>
            )}

            <p>
              乐聊号: {user.account}
              <CopyToClipboard
                text={user.account}
                onCopy={() => Toast.info("复制成功")}
              >
                <img src={fuzhi} alt="复制" className="copy-img" />
              </CopyToClipboard>
            </p>
          </div>
        </div>
      </div>
      <div className="my_content">
        <div className="my_content_option">
          <img src={headset} alt="headset" />

          <div className="my_content_title" onClick={() => setDisplayPwd(true)}>
            <p>修改密码</p>
          </div>
        </div>
        {/* <div className="my_content_option">
          <img src={lock} alt="lock" />

          <div className="my_content_title">
            <a target="_blank" href={user.customer}>
              联系客服
            </a>
          </div>
        </div> */}
        <div className="my_content_option">
          <img src={link} alt="link" />

          <div className="friends_link">
            <div>
              <p>好友链接</p>
              <CopyToClipboard
                text={`${host}/#/r?${userState.user.account}`}
                onCopy={() => Toast.info("复制成功")}
              >
                <button>复制连接</button>
              </CopyToClipboard>
            </div>
            <span>{`${host}/#/r?${userState.user.account}`}</span>
          </div>
        </div>
        <button
          className="my_logout"
          onClick={() => {
            userState.logout();
            window.location.reload();
          }}
        >
          退出登录
        </button>
      </div>
      <ChangePwd display={displayPwd} setDisplayPwd={setDisplayPwd} />
      <NavBar />
    </>
  );
};

export default inject("userState")(observer(My));

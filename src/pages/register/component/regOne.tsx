import React from "react";
import { observer, inject } from "mobx-react";
import { Modal, Toast } from "antd-mobile";

import "../style.scss";
import { title } from "process";
const RegOne = (props: any) => {
  let { registerState } = props;
  let {
    phoneNumber,
    register,
    changePhoneNum,
    changeStep,
  } = registerState as RegisterStore;
  const sendMsg = () => {
    register().then((res) => {
      if (res.code === 0) {
        Toast.success("发送成功", 1.5);
        changeStep(2);
      }
    });
  };
  const click = () => {
    if (phoneNumber.length !== 11) {
      Toast.fail("请输入正确的手机号");
      return;
    }
    sendMsg();
  };
  return (
    <div className="main">
      <p className="reg-title">注册</p>
      <p className="reg-remark">未注册手机验证后完成注册</p>
      <p className="reg-mobile">
        <span className="area">+86</span>
        <input
          type="tel"
          pattern="\d*"
          autoFocus
          onChange={(e) => {
            changePhoneNum(e.target.value);
          }}
          placeholder="1个手机号只能注册1个账号"
        />
      </p>
      <p
        className={
          phoneNumber.length !== 11 ? "reg-btn no-activity" : "reg-btn"
        }
        onClick={click}
      >
        获取验证码
      </p>
    </div>
  );
};
export default inject("registerState")(observer(RegOne));

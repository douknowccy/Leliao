import React, { useState, useEffect } from "react";
import { save } from "../request";
import { Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { login } from "@pages/login/request";
import { addListenr } from "@utils/observerListen";
import visibleImg from "../../../assets/img/visible.png";
import invisibleImg from "../../../assets/img/invisible.png";
import "../style.scss";
const RegThree = (props: any) => {
  const { registerState, userState }: any = props;
  const [pwd, setPwd] = useState<any>("");
  const [verifyPwd, setVerifyPwd] = useState<any>("");
  const history = useHistory();
  const [recommend, setRecommend] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [
    isConfirmPasswordVisible,
    setIsConfirmPasswordVisible,
  ] = useState<boolean>(false);
  let { updateUser } = userState as UserState;
  // 拿主播推荐注册码
  useEffect(() => {
    let str = window.location.href;
    let index = str.lastIndexOf("?");
    let recommend = str.substring(index + 1, str.length);
    // 如果没有推荐码则不存
    if (recommend !== str) {
      setRecommend(recommend);
    }
  }, []);
  let {
    phoneNumber,
    changeStep,
    changePhoneNum,
  } = registerState as RegisterStore;
  const saveUser = () => {
    if (pwd !== verifyPwd) {
      Toast.fail("密码不一致,请重新输入", 1.5);
      return;
    }

    Toast.loading("Loading...");
    save({ name: phoneNumber, pwd: pwd, phone: phoneNumber, recommend })
      .then((res: any) => {
        if (res.code === 0) {
          changePhoneNum("");
          login({ account: phoneNumber, pwd: pwd })
            .then((res) => {
              changeStep(1);
              updateUser({ ...res.data, isLogin: true });
              // 注册socket
              addListenr();
              history.replace("/");
              Toast.success("恭喜您,注册成功!");
            })
            .catch((err) => {
              Toast.fail(err.message);
            });
        }
      })
      .catch((err) => {
        Toast.fail(err.message);
      });
  };

  return (
    <div className="main reg-three">
      <p className="reg-title">设置密码</p>
      <p className="reg-mobile">
        <input
          type={isPasswordVisible ? "text" : "password"}
          autoFocus
          placeholder="6-12位数字+字母的组合"
          onChange={(e) => setPwd(e.target.value)}
        />
        {isPasswordVisible ? (
          <img
            className="passwordImg"
            src={visibleImg}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        ) : (
          <img
            className="checkpasswordImg"
            src={invisibleImg}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        )}
      </p>
      <p className="reg-mobile">
        <input
          type={isConfirmPasswordVisible ? "text" : "password"}
          placeholder="确认密码"
          onChange={(e) => setVerifyPwd(e.target.value)}
        />
        {isConfirmPasswordVisible ? (
          <img
            className="passwordImg"
            src={visibleImg}
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          />
        ) : (
          <img
            className="checkpasswordImg"
            src={invisibleImg}
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          />
        )}
      </p>
      <p
        className={
          pwd === "" || verifyPwd === "" ? "reg-btn no-activity" : "reg-btn"
        }
        onClick={() => saveUser()}
      >
        确认
      </p>
    </div>
  );
};
export default inject("registerState", "userState")(observer(RegThree));

import React, { useEffect, useState } from "react";
import Header from "@components/header";
import { changePwd } from "../request";
import { Toast } from "antd-mobile";
function ChangePassword(props: any) {
  const { display, setDisplayPwd } = props;
  const [done, setDone] = useState(false);
  const [pwd, setPwd] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  });
  const goBack = () => {
    setPwd({ oldPwd: "222", newPwd: "333", confirmPwd: "444" });

    debugger;
    setDisplayPwd(false);
  };
  const rightIcon = () => {
    return (
      <button
        className={
          done ? "right-icon right-icon-done" : "right-icon right-icon-no-done"
        }
        onClick={confirm}
        type="submit"
      >
        完成
      </button>
    );
  };
  const confirm = () => {
    const { newPwd, confirmPwd, oldPwd } = pwd;
    if (oldPwd.length < 6 || newPwd.length < 6 || confirmPwd.length < 6) return;
    if (newPwd === "" || confirmPwd === "" || oldPwd === "") return;
    if (newPwd !== confirmPwd) {
      Toast.fail("两次密码不一致");
      return;
    }
    changePwd({ pwd: pwd.confirmPwd }).then((res) => {
      Toast.success("修改成功!");

      goBack();
    });
  };

  useEffect(() => {
    if (
      pwd.oldPwd.length >= 6 &&
      pwd.newPwd.length >= 6 &&
      pwd.confirmPwd.length >= 6
    ) {
      setDone(true);
      return;
    }
    setDone(false);
  }, [pwd.oldPwd, pwd.newPwd, pwd.confirmPwd]);
  return (
    <div
      className={
        display
          ? "pwd-modal display-pwd-modal"
          : "pwd-modal undisplay-pwd-modal"
      }
    >
      <Header title="修改密码" goback={goBack} rightIcon={rightIcon} />
      <form>
        <p className="pwd old-pwd">
          <span>旧密码</span>
          <input
            type="password"
            placeholder="请填写旧密码"
            onChange={(e) => setPwd({ ...pwd, oldPwd: e.target.value })}
          />
        </p>
        <p className="pwd new-pwd">
          <span>新密码</span>
          <input
            type="password"
            placeholder="请填写新密码"
            onChange={(e) => setPwd({ ...pwd, newPwd: e.target.value })}
          />
        </p>
        <p className="pwd new-pwd">
          <span>确认密码</span>
          <input
            type="password"
            placeholder="请再次输入新密码"
            onChange={(e) => setPwd({ ...pwd, confirmPwd: e.target.value })}
          />
        </p>
      </form>
    </div>
  );
}

export default ChangePassword;
